"use client";

import { useRouter } from "next/navigation";
import { TrainerDashboard } from "@/components/screens/TrainerDashboard";

export default function CapacitadorPage() {
  const router = useRouter();
  return <TrainerDashboard onBack={() => router.push("/")} />;
}
