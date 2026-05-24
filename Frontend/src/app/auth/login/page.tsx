"use client";

import { Login } from "@/components/auth/Login";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  return (
    <Login
      onBack={() => router.push("/")}
      onRegister={() => router.push("/auth/register")}
    />
  );
}
