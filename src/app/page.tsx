import  Hero  from "@/components/sectionsPages/hero"
import  Portfolio  from "@/components/sectionsPages/portfolio"
import  Team  from "@/components/sectionsPages/team"
import  Testimonials  from "@/components/sectionsPages/testimonials"
import  Contact  from "@/components/sectionsPages/contact"
import  { Whatsappbutton }  from "@/components/sectionsPages/whatsappbutton"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import  ImageGallery  from "@/components/sectionsPages/imageGallery"

export default function Home() {
  return (
    <div className="h-screen bg-white">
      <Navbar/>
      <Hero />
      <Portfolio />
      <ImageGallery />
      <Team />  
      <Testimonials />
      <Contact />
      <Whatsappbutton />
      <Footer/>
    </div>
  )
}

