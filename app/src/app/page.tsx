import  Hero  from "@/components/sectionsPages/hero"
import  Portfolio  from "@/components/sectionsPages/portfolio"
import  Team  from "@/components/sectionsPages/team"
import  Testimonials  from "@/components/sectionsPages/testimonials"
import  Contact  from "@/components/sectionsPages/contact"
import  Whatsappbutton  from "@/components/sectionsPages/whatsappbutton"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Portfolio />
      <Team />
      <Testimonials />
      <Contact />
      <Whatsappbutton />
    </div>
  )
}

