import { PortfolioShell } from './components/layout/PortfolioShell';
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <PortfolioShell />
      <Analytics />
    </div>
  );
}