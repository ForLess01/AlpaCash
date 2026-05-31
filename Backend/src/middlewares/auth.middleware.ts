import { Request, Response, NextFunction } from "express";
import { supabaseAdmin, createSupabaseUserClient } from "../config/supabase";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
    rol?: string;
    nombre?: string;
    estado?: string;
  };
  supabaseUser?: ReturnType<typeof createSupabaseUserClient>;
}

// Validates token only — does NOT require a profile to exist.
// Use this for endpoints that run before the profile is created (e.g. POST /api/auth/profile).
export async function verifyToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token no enviado" });
    }

    const token = authHeader.replace("Bearer ", "");

    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }

    req.user = { id: user.id, email: user.email };
    req.supabaseUser = createSupabaseUserClient(token);

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ message: "Error de autenticación" });
  }
}

export async function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Token no enviado",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        message: "Token inválido o expirado",
      });
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("id, email, nombre, rol, estado")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return res.status(403).json({
        message: "Perfil no encontrado",
      });
    }

    if (profile.estado === "suspendido" || profile.estado === "rechazado") {
      return res.status(403).json({
        message: "Cuenta inactiva",
      });
    }

    req.user = {
      id: user.id,
      email: user.email,
      rol: profile.rol,
      nombre: profile.nombre,
      estado: profile.estado,
    };

    req.supabaseUser = createSupabaseUserClient(token);

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      message: "Error de autenticación",
    });
  }
}