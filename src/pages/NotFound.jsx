import { Link } from 'react-router-dom'
import Page from '../components/Page.jsx'
import Seo from '../components/Seo.jsx'

export default function NotFound() {
  return (
    <Page>
      <Seo title="Page not found" description="The page you are looking for could not be found." noindex />
      <section className="container-site flex min-h-[80vh] flex-col items-start justify-center pt-28">
        <p className="font-serif text-[7rem] italic leading-none text-gold/70 sm:text-[10rem]">404</p>
        <h1 className="h-section mt-4">This room hasn’t been designed yet.</h1>
        <p className="lead mt-6 max-w-lg">The page you are looking for doesn’t exist or may have moved.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/" className="btn-dark">Back to home</Link>
          <Link to="/projects" className="btn-outline">View projects</Link>
        </div>
      </section>
    </Page>
  )
}
