"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BuyerDashboard } from "@/components/screens/BuyerDashboard";
import { LotDetailModal, type DisplayLot } from "@/components/modals/LotDetailModal";
import { CartDrawer } from "@/components/modals/CartDrawer";

export default function CompradorPage() {
  const router = useRouter();
  const [lotOpen, setLotOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedLot, setSelectedLot] = useState<DisplayLot | null>(null);

  return (
    <>
      <BuyerDashboard
        onBack={() => router.push("/")}
        onOpenLot={(lot) => {
          setSelectedLot(lot ?? null);
          setLotOpen(true);
        }}
        onOpenCart={() => setCartOpen(true)}
      />
      <LotDetailModal open={lotOpen} lot={selectedLot} onClose={() => setLotOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
