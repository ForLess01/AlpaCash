"use client";

import { useRouter } from "next/navigation";
import { Marketplace } from "@/components/Marketplace";

export default function MarketplacePage() {
  const router = useRouter();
  return <Marketplace onBack={() => router.push("/")} />;
}
