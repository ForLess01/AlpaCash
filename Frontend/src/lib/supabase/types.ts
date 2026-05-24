export type Role =
  | "productor"
  | "comprador"
  | "administrador"
  | "capacitador"
  | "financiero";

export type UserProfile = {
  id: string;
  email: string;
  role: Role;
  full_name?: string;
};

export const ROLE_TO_ROUTE: Record<Role, string> = {
  productor: "/dashboard/productor",
  comprador: "/dashboard/comprador",
  administrador: "/dashboard/administrador",
  capacitador: "/dashboard/capacitador",
  financiero: "/dashboard/financiero",
};

export const ROLE_ID_TO_ROLE: Record<string, Role> = {
  producer: "productor",
  buyer: "comprador",
  trainer: "capacitador",
  admin: "administrador",
  financial: "financiero",
};
