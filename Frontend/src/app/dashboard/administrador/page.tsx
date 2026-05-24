"use client";

import { useRouter } from "next/navigation";
import { AdminDashboard } from "@/components/screens/AdminDashboard";

export default function AdministradorPage() {
  const router = useRouter();
  return <AdminDashboard onBack={() => router.push("/")} />;
}
