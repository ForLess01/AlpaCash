"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RoleSelector, type RoleId } from "@/components/auth/RoleSelector";
import { Register } from "@/components/auth/Register";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<"role" | "form">("role");
  const [role, setRole] = useState<RoleId | undefined>(undefined);

  if (step === "form") {
    return (
      <Register
        initialRole={role}
        onBack={() => setStep("role")}
        onLogin={() => router.push("/auth/login")}
      />
    );
  }

  return (
    <RoleSelector
      onBack={() => router.push("/")}
      onPick={(r) => {
        setRole(r);
        setStep("form");
      }}
    />
  );
}
