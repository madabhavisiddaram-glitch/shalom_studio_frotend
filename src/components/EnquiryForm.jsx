import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, Loader2, AlertCircle } from 'lucide-react'
import { budgets, propertyTypes, configurations } from '../data/content.js'
import { services } from '../data/services.js'
import { site, whatsappLink, telLink } from '../data/site.js'
import { WhatsApp } from './Icons.jsx'

const empty = {
  name: '', phone: '', email: '', propertyType: '', configuration: '',
  location: '', budget: '', services: [], message: '', website: '', // `website` is a honeypot
}

export function validate(v) {
  const e = {}
  if (!v.name.trim() || v.name.trim().length < 2) e.name = 'Please enter your full name.'
  const digits = v.phone.replace(/[^\d]/g, '')
  if (!digits) e.phone = 'Please enter your phone number.'
  else if (digits.length < 10 || digits.length > 13) e.phone = 'Please enter a valid phone number.'
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = 'Please enter a valid email address.'
  if (!v.propertyType) e.propertyType = 'Please choose a property type.'
  if (!v.configuration) e.configuration = 'Please choose a configuration.'
  if (!v.location.trim()) e.location = 'Please tell us where the property is.'
  if (v.message.length > 2000) e.message = 'Please keep your message under 2000 characters.'
  return e
}

function Field({ label, name, error, required, children }) {
  return (
    <div>
      <label htmlFor={`f-${name}`} className="field-label">
        {label} {required && <span className="text-gold-dark" aria-hidden>*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p id={`f-${name}-err`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-red-700" role="alert">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function EnquiryForm({ compact = false, dark = false }) {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [serverMsg, setServerMsg] = useState('')

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }
  const toggleService = (title) =>
    setValues((v) => ({ ...v, services: v.services.includes(title) ? v.services.filter((s) => s !== title) : [...v.services, title] }))

  const aria = (k) => ({ id: `f-${k}`, name: k, 'aria-invalid': Boolean(errors[k]), 'aria-describedby': errors[k] ? `f-${k}-err` : undefined })

  async function onSubmit(e) {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    setStatus('submitting')
    setServerMsg('')
    try {
      // Netlify Forms: the hidden form named "enquiry" in index.html registers these fields.
      const body = new URLSearchParams({
        'form-name': 'enquiry',
        name: values.name,
        phone: values.phone,
        email: values.email,
        location: values.location,
        propertyType: values.propertyType,
        configuration: values.configuration,
        budget: values.budget,
        services: values.services.join(', '),
        message: values.message,
        website: values.website,
      })
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (res.ok) {
        setStatus('success')
        setValues(empty)
      } else {
        setServerMsg('We could not send your enquiry right now. Please try again or message us on WhatsApp.')
        setStatus('error')
      }
    } catch {
      setServerMsg('We could not reach our server. Please check your connection and try again.')
      setStatus('error')
    }
  }

  const waText = () =>
    `Hello ${site.name}, I would like a design consultation.\n` +
    [
      values.name && `Name: ${values.name}`,
      values.propertyType && `Property: ${values.propertyType} ${values.configuration}`,
      values.location && `Location: ${values.location}`,
      values.budget && `Budget: ${values.budget}`,
      values.services.length && `Services: ${values.services.join(', ')}`,
      values.message && `Message: ${values.message}`,
    ].filter(Boolean).join('\n')

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-start gap-5 py-10" role="status">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-white"><Check strokeWidth={1.5} /></span>
        <h3 className="font-serif text-3xl">Thank you. Your enquiry has been received.</h3>
        <p className="lead max-w-md">Our team will review your details and get in touch with you to schedule your consultation.</p>
        <button type="button" className="link-line mt-2" onClick={() => setStatus('idle')}>Send another enquiry</button>
      </motion.div>
    )
  }

  const wa = whatsappLink(waText())
  const tel = telLink()
  const fieldCls = `field ${dark ? '!text-ivory !border-ivory/25 placeholder:!text-ivory/40 [&>option]:text-charcoal' : ''}`
  const grid = compact ? 'grid gap-x-8 gap-y-7 sm:grid-cols-2' : 'grid gap-x-10 gap-y-8 sm:grid-cols-2'

  return (
    <form onSubmit={onSubmit} noValidate className={dark ? '[&_.field-label]:text-ivory/60' : ''} aria-label="Consultation enquiry form">
      <div className={grid}>
        <Field label="Full Name" name="name" error={errors.name} required>
          <input {...aria('name')} className={fieldCls} autoComplete="name" value={values.name} onChange={set('name')} placeholder="Your name" />
        </Field>
        <Field label="Phone Number" name="phone" error={errors.phone} required>
          <input {...aria('phone')} className={fieldCls} type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={set('phone')} placeholder="+91" />
        </Field>
        <Field label="Email" name="email" error={errors.email}>
          <input {...aria('email')} className={fieldCls} type="email" autoComplete="email" value={values.email} onChange={set('email')} placeholder="you@example.com" />
        </Field>
        <Field label="Property Location" name="location" error={errors.location} required>
          <input {...aria('location')} className={fieldCls} value={values.location} onChange={set('location')} placeholder="Area / locality in Bangalore" />
        </Field>
        <Field label="Property Type" name="propertyType" error={errors.propertyType} required>
          <select {...aria('propertyType')} className={fieldCls} value={values.propertyType} onChange={set('propertyType')}>
            <option value="">Select</option>
            {propertyTypes.map((p) => <option key={p}>{p}</option>)}
          </select>
        </Field>
        <Field label="Configuration" name="configuration" error={errors.configuration} required>
          <select {...aria('configuration')} className={fieldCls} value={values.configuration} onChange={set('configuration')}>
            <option value="">Select</option>
            {configurations.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Approximate Budget" name="budget" error={errors.budget}>
          <select {...aria('budget')} className={fieldCls} value={values.budget} onChange={set('budget')}>
            <option value="">Select</option>
            {budgets.map((b) => <option key={b}>{b}</option>)}
          </select>
        </Field>
        <div className="hidden" aria-hidden>
          <label htmlFor="f-website">Website</label>
          <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
        </div>
        <fieldset className="sm:col-span-2">
          <legend className="field-label">Services Required</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {services.map((s) => {
              const on = values.services.includes(s.title)
              return (
                <button
                  type="button"
                  key={s.slug}
                  aria-pressed={on}
                  onClick={() => toggleService(s.title)}
                  className={`border px-3.5 py-2 text-[12px] transition-all duration-300 ${
                    on
                      ? 'border-gold bg-gold text-white'
                      : dark ? 'border-ivory/25 text-ivory/75 hover:border-ivory/60' : 'border-charcoal/15 text-charcoal/75 hover:border-charcoal/50'
                  }`}
                >
                  {s.title}
                </button>
              )
            })}
          </div>
        </fieldset>
        <div className="sm:col-span-2">
          <Field label="Message" name="message" error={errors.message}>
            <textarea {...aria('message')} rows={compact ? 3 : 4} className={`${fieldCls} resize-none`} value={values.message} onChange={set('message')} placeholder="Tell us about your space, timelines or ideas" />
          </Field>
        </div>
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-8 flex gap-3 border border-red-800/30 bg-red-50 p-4 text-sm text-red-900" role="alert">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <div>
              <p>{serverMsg} Your enquiry was <strong>not</strong> sent.</p>
              <p className="mt-1">
                Please try again{wa ? ', or send your details on WhatsApp' : ''}{tel ? <>, or call us at <a className="underline" href={tel}>{site.phone}</a></> : ''}.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className={dark ? 'btn-gold' : 'btn-dark'} disabled={status === 'submitting'}>
          {status === 'submitting' ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Book Your Free Design Consultation <ArrowRight size={16} /></>}
        </button>
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className={dark ? 'btn-outline-light' : 'btn-outline'}>
            <WhatsApp width={16} height={16} /> Send on WhatsApp
          </a>
        )}
      </div>
      <p className={`mt-5 text-xs ${dark ? 'text-ivory/45' : 'text-stone-400'}`}>
        By submitting, you agree to be contacted about your enquiry. See our <a href="/privacy-policy" className="underline">Privacy Policy</a>.
      </p>
    </form>
  )
}
