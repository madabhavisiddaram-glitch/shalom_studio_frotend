import Page from '../components/Page.jsx'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Placeholder from '../components/Placeholder.jsx'
import { site } from '../data/site.js'

export default function Privacy() {
  return (
    <Page>
      <Seo title="Privacy Policy" description={`Privacy policy for ${site.name}.`} />
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="container-site max-w-3xl pb-28 text-[15px] leading-relaxed text-stone-500 [&_h2]:mb-3 [&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-charcoal">
        <Placeholder label="Template — review before publishing">
          This is a starting template. Please review it with a legal adviser and update it to match how your business actually handles personal data.
        </Placeholder>
        <h2>Information we collect</h2>
        <p>When you submit an enquiry, we collect the details you provide: your name, phone number, email address, property type, configuration, location, approximate budget, services of interest and your message.</p>
        <h2>How we use it</h2>
        <p>We use these details only to respond to your enquiry, schedule a consultation and discuss your project. We do not sell your personal information.</p>
        <h2>How it is stored</h2>
        <p>Enquiries are received through our website hosting provider's secure form service and may be forwarded to our business email. Access is limited to people who need it to respond to you.</p>
        <h2>WhatsApp and phone</h2>
        <p>If you contact us through WhatsApp or by phone, those conversations are also subject to the privacy terms of those services.</p>
        <h2>Your choices</h2>
        <p>You can ask us to update or delete your details at any time by contacting us at {site.email}.</p>
        <h2>Contact</h2>
        <p>{site.name}, {site.address}. Email: {site.email}. Phone: {site.phone}.</p>
        <p className="mt-12 text-xs">Last updated: [DATE]</p>
      </section>
    </Page>
  )
}
