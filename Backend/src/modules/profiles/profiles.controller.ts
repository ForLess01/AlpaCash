import { Response } from "express";
import { AuthenticatedRequest } from "../../middlewares/auth.middleware";
import { supabaseAdmin } from "../../config/supabase";

export async function getMyProfile(req: AuthenticatedRequest, res: Response) {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", req.user!.id)
    .single();

  if (error || !data) {
    return res.status(404).json({ message: "Perfil no encontrado" });
  }

  return res.json(data);
}

export async function updateMyProfile(req: AuthenticatedRequest, res: Response) {
  const allowedFields = ["nombre", "telefono", "avatar_url"];
  const updates: Record<string, unknown> = {};

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "No hay campos válidos para actualizar" });
  }

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .update(updates)
    .eq("id", req.user!.id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({
      message: "Error al actualizar el perfil",
      error: error.message,
    });
  }

  return res.json(data);
}
