"use client";

import { Login } from "@/components/auth/Login";
import { useRouter } from "next/navigation";

const ADMIN_EYEBROW = "Panel de administración";
const ADMIN_QUOTE = "Acceso restringido al equipo administrativo de AlpaCash.";
const ADMIN_IMAGE =
  "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400";

export function AdminClient() {
  const router = useRouter();
  return (
    <Login
      onBack={() => router.push("/")}
      onRegister={() => router.push("/auth/register")}
      adminEyebrow={ADMIN_EYEBROW}
      adminQuote={ADMIN_QUOTE}
      adminImage={ADMIN_IMAGE}
    />
  );
}