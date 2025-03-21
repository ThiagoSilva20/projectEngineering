import { PortfolioHeader } from "@/components/portfolio/portfolio-header"
import PortfolioGrid from "@/components/portfolio/portfolio-grid"
import { PortfolioFilter } from "@/components/portfolio/portfolio-filter"
import { PortfolioFeatured } from "@/components/portfolio/portfolio-featured"
import { PortfolioStats } from "@/components/portfolio/portfolio-stats"
import { PortfolioContact } from "@/components/portfolio/portfolio-contact"


export default async function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">    

      <PortfolioHeader />
      <PortfolioFeatured  />
      <PortfolioFilter />
      <PortfolioGrid />
      <PortfolioStats />
      <PortfolioContact />
    </div>
  )
}

