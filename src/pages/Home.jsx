import Page from '../components/Page.jsx'
import Seo, { businessJsonLd } from '../components/Seo.jsx'
import Hero from '../components/home/Hero.jsx'
import Intro from '../components/home/Intro.jsx'
import AboutPreview from '../components/home/AboutPreview.jsx'
import ServicesShowcase from '../components/home/ServicesShowcase.jsx'
import FeaturedProjects from '../components/home/FeaturedProjects.jsx'
import Styles from '../components/home/Styles.jsx'
import Process from '../components/home/Process.jsx'
import WhyUs from '../components/home/WhyUs.jsx'
import Inspiration from '../components/home/Inspiration.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import FaqSection from '../components/home/FaqSection.jsx'
import FinalCta from '../components/FinalCta.jsx'
import { faqJsonLd } from '../components/Faq.jsx'

export default function Home() {
  return (
    <Page>
      <Seo
        description="Luxury interior designers in Bangalore for apartments, villas and commercial spaces. Turnkey interiors, modular kitchens, wardrobes, false ceilings and custom furniture. Book a free design consultation."
        jsonLd={[businessJsonLd(), faqJsonLd]}
      />
      <Hero />
      <Intro />
      <AboutPreview />
      <ServicesShowcase />
      <FeaturedProjects />
      <Styles />
      <Process />
      <WhyUs />
      <Inspiration />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </Page>
  )
}
