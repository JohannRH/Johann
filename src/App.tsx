import { TNTScene } from './components/scene/TNTScene';
import { PortfolioShell } from './components/layout/PortfolioShell';
import { useCallback, useEffect, useState } from 'react';

const PHASES = {
  TNT: 'TNT',
  FUSE: 'FUSE',
  PORTFOLIO: 'PORTFOLIO',
} as const;

type Phase = (typeof PHASES)[keyof typeof PHASES];

export default function App() {
  const [phase, setPhase] = useState<Phase>(PHASES.TNT);

  // Handle the "fuse burn" phase and transition to portfolio
  useEffect(() => {
    if (phase !== PHASES.FUSE) return;

    const timer = setTimeout(() => {
      setPhase(PHASES.PORTFOLIO);
    }, 1500); // ~1.5s fuse

    return () => clearTimeout(timer);
  }, [phase]);

  const handleTntClick = useCallback(() => {
    setPhase((current) =>
      current === PHASES.TNT ? PHASES.FUSE : current,
    );
  }, []);

  const showCanvas = phase === PHASES.TNT || phase === PHASES.FUSE;

  return (
    <div className="relative min-h-screen bg-[#0c0a09] text-slate-100 overflow-hidden">
      {/* 3D TNT experience */}
      {showCanvas && (
        <div className="absolute inset-0">
          <TNTScene onTntClicked={handleTntClick} />
        </div>
      )}

      {/* Post-explosion portfolio shell */}
      {phase === PHASES.PORTFOLIO && <PortfolioShell />}
    </div>
  );
}