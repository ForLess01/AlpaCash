"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProducerDashboard } from "@/components/screens/ProducerDashboard";
import { LotDetailModal } from "@/components/modals/LotDetailModal";
import { NewLotModal } from "@/components/modals/NewLotModal";

export default function ProductorPage() {
  const router = useRouter();
  const [lotOpen, setLotOpen] = useState(false);
  const [newLotOpen, setNewLotOpen] = useState(false);

  return (
    <>
      <ProducerDashboard
        onBack={() => router.push("/")}
        onOpenLot={() => setLotOpen(true)}
        onNewLot={() => setNewLotOpen(true)}
      />
      <LotDetailModal open={lotOpen} onClose={() => setLotOpen(false)} />
      <NewLotModal open={newLotOpen} onClose={() => setNewLotOpen(false)} />
    </>
  );
}
