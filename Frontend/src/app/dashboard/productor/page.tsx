"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProducerDashboard } from "@/components/screens/ProducerDashboard";
import { LotDetailModal, type DisplayLot } from "@/components/modals/LotDetailModal";
import { NewLotModal } from "@/components/modals/NewLotModal";

export default function ProductorPage() {
  const router = useRouter();
  const [lotOpen, setLotOpen] = useState(false);
  const [newLotOpen, setNewLotOpen] = useState(false);
  const [selectedLot, setSelectedLot] = useState<DisplayLot | null>(null);

  return (
    <>
      <ProducerDashboard
        onBack={() => router.push("/")}
        onOpenLot={(lot) => { setSelectedLot(lot ?? null); setLotOpen(true); }}
        onNewLot={() => setNewLotOpen(true)}
      />
      <LotDetailModal open={lotOpen} lot={selectedLot} onClose={() => setLotOpen(false)} />
      <NewLotModal open={newLotOpen} onClose={() => setNewLotOpen(false)} />
    </>
  );
}
