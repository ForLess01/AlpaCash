import { Request, Response } from "express";
import { supabaseAdmin } from "../../config/supabase";

export async function getMarketplaceLots(req: Request, res: Response) {
  const { categoria, region, precioMin, precioMax } = req.query;

  if (precioMin !== undefined) {
    const parsed = parseFloat(String(precioMin));
    if (isNaN(parsed)) {
      return res.status(400).json({ message: "precioMin inválido" });
    }
  }

  if (precioMax !== undefined) {
    const parsed = parseFloat(String(precioMax));
    if (isNaN(parsed)) {
      return res.status(400).json({ message: "precioMax inválido" });
    }
  }

  if (categoria !== undefined && (typeof categoria !== "string" || categoria.trim() === "")) {
    return res.status(400).json({ message: "categoria inválida" });
  }

  let query = supabaseAdmin
    .from("marketplace_lotes_publicos")
    .select("*")
    .eq("estado", "disponible");

  if (categoria && typeof categoria === "string" && categoria.trim() !== "") {
    query = query.eq("categoria", categoria);
  }

  if (region) {
    query = query.eq("region", String(region));
  }

  if (precioMin !== undefined) {
    const parsed = parseFloat(String(precioMin));
    if (Number.isFinite(parsed)) {
      query = query.gte("precio_por_libra", parsed);
    }
  }

  if (precioMax !== undefined) {
    const parsed = parseFloat(String(precioMax));
    if (Number.isFinite(parsed)) {
      query = query.lte("precio_por_libra", parsed);
    }
  }

  const { data, error } = await query.order("precio_por_libra", {
    ascending: true,
  });

  if (error) {
    return res.status(500).json({
      message: "Error al obtener lotes del marketplace",
      error: error.message,
    });
  }

  return res.json(data);
}