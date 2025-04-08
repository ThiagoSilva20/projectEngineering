import { PortfolioHeader } from "@/components/portfolio/portfolio-header"
import PortfolioGrid from "@/components/portfolio/portfolio-grid"
import { PortfolioStats } from "@/components/portfolio/portfolio-stats"
import { PortfolioContact } from "@/components/portfolio/portfolio-contact"


export default async function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">    

      <PortfolioHeader />

      <PortfolioGrid />
      <PortfolioStats />
      <PortfolioContact />
    </div>
  )
}

