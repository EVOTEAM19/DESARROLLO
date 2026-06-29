import { Hero } from '@/components/Hero'
import { TechMarquee } from '@/components/sections/v2/TechMarquee'
import { ValuePillars } from '@/components/sections/v2/ValuePillars'
import { WhatWeBuild } from '@/components/sections/v2/WhatWeBuild'
import { SolutionsGrid } from '@/components/sections/v2/SolutionsGrid'
import { GrowthSection } from '@/components/sections/v2/GrowthSection'
import { DeviceMockups } from '@/components/sections/v2/DeviceMockups'
import { ProjectsShowcase } from '@/components/sections/v2/ProjectsShowcase'
import { ProcessSteps } from '@/components/sections/v2/ProcessSteps'
import { StatsBand } from '@/components/sections/v2/StatsBand'
import { NoFeesSection } from '@/components/sections/v2/NoFeesSection'
import { OfferSection } from '@/components/sections/v2/OfferSection'
import { FaqSection } from '@/components/sections/v2/FaqSection'
import { FinalCta } from '@/components/sections/v2/FinalCta'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <TechMarquee />
      <ValuePillars />
      <WhatWeBuild />
      <SolutionsGrid />
      <GrowthSection />
      <DeviceMockups />
      <ProjectsShowcase />
      <ProcessSteps />
      <StatsBand />
      <NoFeesSection />
      <OfferSection />
      <FaqSection />
      <FinalCta />
    </div>
  )
}
