import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };
const base = (size?: number) => ({ width: size || 24, height: size || 24, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const });

export const AlpacaHead = ({ size, ...p }: P) => (
  <svg viewBox="0 0 64 64" {...base(size)} {...p}>
    <path d="M22 12c-2 4-2 8 0 12-4 1-7 5-7 10v18c0 4 3 7 7 7h20c4 0 7-3 7-7V34c0-5-3-9-7-10 2-4 2-8 0-12-2-3-5-3-7 0-2-2-4-2-6 0-2-3-5-3-7 0z" stroke="currentColor" strokeWidth="2.4"/>
    <circle cx="26" cy="34" r="1.6" fill="currentColor"/>
    <circle cx="38" cy="34" r="1.6" fill="currentColor"/>
    <path d="M30 42c1 1 3 1 4 0" stroke="currentColor" strokeWidth="2"/>
    <path d="M22 18c-1-3 0-6 2-6M42 18c1-3 0-6-2-6" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 30c-2 0-4 1-4 4M48 30c2 0 4 1 4 4" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const FiberBall = ({ size, ...p }: P) => (
  <svg viewBox="0 0 48 48" {...base(size)} {...p}>
    <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 22c5-4 12-6 18-4M10 30c5-5 12-7 20-6M12 36c5-4 12-6 20-6M14 16c5-4 12-4 18-2M18 10c4-1 9-1 14 1" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="36" cy="14" r="1.5" fill="currentColor"/>
  </svg>
);

export const LotTag = ({ size, ...p }: P) => (
  <svg viewBox="0 0 48 48" {...base(size)} {...p}>
    <path d="M6 18l12-12h22c2 0 4 2 4 4v22L32 44c-2 2-5 2-7 0L6 25c-2-2-2-5 0-7z" stroke="currentColor" strokeWidth="2.2"/>
    <circle cx="32" cy="16" r="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M14 26l8 8M18 22l8 8" stroke="currentColor" strokeWidth="1.8" opacity="0.6"/>
  </svg>
);

export const MountainPath = ({ size, ...p }: P) => (
  <svg viewBox="0 0 48 36" {...base(size)} {...p}>
    <path d="M2 32l10-16 8 10 8-18 10 16 8-8" stroke="currentColor" strokeWidth="2.2"/>
    <circle cx="20" cy="8" r="2.5" fill="currentColor"/>
    <path d="M2 34h44" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3"/>
  </svg>
);

export const ScaleBalance = ({ size, ...p }: P) => (
  <svg viewBox="0 0 48 48" {...base(size)} {...p}>
    <path d="M24 6v36M10 42h28" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M10 16h28M6 16l-4 8a8 8 0 0016 0l-4-8M42 16l-4 8a8 8 0 0016 0l-4-8" stroke="currentColor" strokeWidth="2"/>
    <circle cx="24" cy="6" r="2.5" fill="currentColor"/>
  </svg>
);

export const StampSeal = ({ size, ...p }: P) => (
  <svg viewBox="0 0 48 48" {...base(size)} {...p}>
    <path d="M24 4l4 5 6-2 1 6 6 2-2 6 4 5-4 5 2 6-6 2-1 6-6-2-4 5-4-5-6 2-1-6-6-2 2-6-4-5 4-5-2-6 6-2 1-6 6 2z" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2"/>
    <path d="M20 24l3 3 6-6" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const ScissorsShear = ({ size, ...p }: P) => (
  <svg viewBox="0 0 48 48" {...base(size)} {...p}>
    <circle cx="12" cy="36" r="6" stroke="currentColor" strokeWidth="2"/>
    <circle cx="36" cy="36" r="6" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 32L40 8M32 32L8 8" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M24 24l8-8" stroke="currentColor" strokeWidth="2.2"/>
  </svg>
);

export const HandHold = ({ size, ...p }: P) => (
  <svg viewBox="0 0 48 48" {...base(size)} {...p}>
    <path d="M8 28v10c0 3 2 5 5 5h22c3 0 5-2 5-5v-6" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M8 28l4-12c1-2 3-3 5-2l3 1M40 32l-4-10M16 28c2-4 6-6 10-6h6c3 0 5 2 5 5l1 7" stroke="currentColor" strokeWidth="2"/>
    <circle cx="28" cy="14" r="6" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const ShieldWeave = ({ size, ...p }: P) => (
  <svg viewBox="0 0 48 48" {...base(size)} {...p}>
    <path d="M24 4l16 6v14c0 10-7 17-16 20-9-3-16-10-16-20V10z" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M14 18h20M14 24h20M14 30h20M18 14v22M24 14v22M30 14v22" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
  </svg>
);

export const ChartSparkle = ({ size, ...p }: P) => (
  <svg viewBox="0 0 48 48" {...base(size)} {...p}>
    <path d="M4 36l10-12 8 6 12-18 10 14" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M38 8l1.5 3 3 1.5-3 1.5L38 17l-1.5-3-3-1.5 3-1.5z" fill="currentColor"/>
    <circle cx="14" cy="24" r="2" fill="currentColor"/>
    <circle cx="22" cy="30" r="2" fill="currentColor"/>
  </svg>
);

export const ReceiptPaper = ({ size, ...p }: P) => (
  <svg viewBox="0 0 36 48" {...base(size)} {...p}>
    <path d="M4 4h28v40l-4-3-4 3-4-3-4 3-4-3-4 3-4-3V4z" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M10 14h16M10 20h16M10 26h10" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M22 30l2 2 4-4" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const FactorySimple = ({ size, ...p }: P) => (
  <svg viewBox="0 0 48 48" {...base(size)} {...p}>
    <path d="M4 42V20l12 6V20l12 6V14l16 8v20z" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M10 32h4M22 32h4M34 32h4M10 38h4M22 38h4M34 38h4" stroke="currentColor" strokeWidth="2"/>
    <circle cx="38" cy="8" r="1.5" fill="currentColor"/>
    <path d="M34 12c0-3 2-4 4-4M30 14c0-2 1-3 3-3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const ClipboardCheckArt = ({ size, ...p }: P) => (
  <svg viewBox="0 0 40 48" {...base(size)} {...p}>
    <path d="M8 8h24v34c0 2-2 4-4 4H12c-2 0-4-2-4-4z" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M14 4h12v8H14z" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M14 26l4 4 8-10" stroke="currentColor" strokeWidth="2.4"/>
    <path d="M14 38h16" stroke="currentColor" strokeWidth="1.8"/>
  </svg>
);

export const Vault = ({ size, ...p }: P) => (
  <svg viewBox="0 0 48 48" {...base(size)} {...p}>
    <rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="2.2"/>
    <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2"/>
    <path d="M24 16v2M24 30v2M16 24h2M30 24h2M18 18l1.5 1.5M28.5 28.5L30 30M18 30l1.5-1.5M28.5 19.5L30 18" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M8 40v4M40 40v4" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const Compass = ({ size, ...p }: P) => (
  <svg viewBox="0 0 48 48" {...base(size)} {...p}>
    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M16 32l6-16 10 8z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="24" cy="24" r="2" fill="currentColor"/>
    <path d="M24 4v3M24 41v3M4 24h3M41 24h3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const SeedLeaf = ({ size, ...p }: P) => (
  <svg viewBox="0 0 48 48" {...base(size)} {...p}>
    <path d="M24 44V24M24 24C24 12 32 4 44 4c0 12-8 20-20 20zM24 24C24 16 18 10 8 10c0 8 6 14 16 14z" stroke="currentColor" strokeWidth="2.2"/>
  </svg>
);
