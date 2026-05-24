"use client";

import { useRouter } from "next/navigation";
import { FinancialDashboard } from "@/components/screens/FinancialDashboard";

export default function FinancieroPage() {
  const router = useRouter();
  return <FinancialDashboard onBack={() => router.push("/")} />;
}
