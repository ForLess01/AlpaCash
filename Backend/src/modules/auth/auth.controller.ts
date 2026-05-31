import { Response } from "express";
import { AuthenticatedRequest } from "../../middlewares/auth.middleware";
import { supabaseAdmin } from "../../config/supabase";

// Uses verifyToken (not authMiddleware) so Google OAuth users without a profile
// get { hasProfile: false } instead of a 403.
export async function getMe(req: AuthenticatedRequest, res: Response) {
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("id, email, nombre, rol, estado")
    .eq("id", req.user!.id)
    .maybeSingle();

  if (!profile) {
    return res.status(200).json({
      id: req.user!.id,
      email: req.user!.email,
      hasProfile: false,
    });
  }

  if (profile.estado === "suspendido" || profile.estado === "rechazado") {
    return res.status(403).json({ message: "Cuenta inactiva" });
  }

  return res.json({
    id: profile.id,
    email: profile.email,
    nombre: profile.nombre,
    rol: profile.rol,
    estado: profile.estado,
    hasProfile: true,
  });
}

export async function createProfile(req: AuthenticatedRequest, res: Response) {
  const { rol, nombre } = req.body;

  // Self-service role set — aligned with create_profile_with_role RPC contract.
  // "admin" is excluded: admin accounts are created by existing admins, not
  // through self-registration (matches the SQL RPC which also blocks admin).
  // "capacitador" is deprecated and MUST NOT be accepted.
  const validRoles = ["productor", "empresa", "financiera"];
  if (!rol || !validRoles.includes(rol)) {
    return res.status(403).json({
      message: "Rol inválido o no autorizado. Valores permitidos: productor, empresa, financiera",
    });
  }

  if (!nombre || typeof nombre !== "string" || nombre.trim().length === 0) {
    return res.status(400).json({ message: "El campo 'nombre' es requerido" });
  }

  const { data: existing } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("id", req.user!.id)
    .maybeSingle();

  if (existing) {
    return res.status(409).json({ message: "El perfil ya existe" });
  }

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .insert({
      id: req.user!.id,
      email: req.user!.email,
      nombre: nombre.trim(),
      rol,
      // estado defaults to 'pendiente' in DB — admin must activate
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "El perfil ya existe" });
    }
    return res.status(500).json({
      message: "Error al crear el perfil",
      error: error.message,
    });
  }

  return res.status(201).json(data);
}
