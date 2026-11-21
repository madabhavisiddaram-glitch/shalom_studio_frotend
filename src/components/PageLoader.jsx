export default function PageLoader() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-live="polite">
      <img src="/brand/logo-mark.svg" alt="" className="h-12 w-auto animate-pulse" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
