import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  FileSearch,
  Fingerprint,
  ScanText,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

const capabilities = [
  {
    icon: ScanText,
    title: 'Extract claims',
    description: 'Bring statements, numbers, dates, and promises into focus.',
  },
  {
    icon: BookOpenCheck,
    title: 'Compare with evidence',
    description: 'Trace findings back to trusted source material.',
  },
  {
    icon: Fingerprint,
    title: 'Keep review accountable',
    description: 'Give reviewers a clear workspace for human decisions.',
  },
]

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fafc] text-slate-900">
      <header className="relative z-10 mx-auto flex max-w-[1280px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3" aria-label="TrustDoc AI home">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#101828] text-white"><ShieldCheck size={21} aria-hidden="true" /></span>
          <span className="flex flex-col">
            <span className="text-sm font-bold tracking-[0.12em] text-slate-900">TRUSTDOC</span>
            <span className="text-[10px] font-medium tracking-[0.16em] text-slate-500">AI VERIFICATION</span>
          </span>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-6" aria-label="Main navigation">
          <Link href="/dashboard" className="hidden text-sm font-medium text-slate-600 hover:text-slate-950 sm:block">Workspace</Link>
          <Link href="/dashboard" className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#4f46e5] px-3.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-700 sm:h-10 sm:px-4 sm:text-sm">
            Open workspace <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </nav>
      </header>

      <section className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-12 lg:pb-28 lg:pt-20">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-[11px] font-semibold text-indigo-700 shadow-sm">
            <Sparkles size={13} aria-hidden="true" /> DOCUMENT INTELLIGENCE
          </div>
          <h1 className="mt-6 max-w-[720px] text-[42px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#101828] sm:text-5xl lg:text-[62px]">
            Don&apos;t just trust AI-generated documents. <span className="text-[#4f46e5]">Verify them.</span>
          </h1>
          <p className="mt-6 max-w-[570px] text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            See what a document claims, what your sources support, and where a human should take a closer look.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/upload" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#4f46e5] px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Prepare a document <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/dashboard" className="inline-flex h-11 items-center justify-center rounded-lg px-4 text-sm font-semibold text-slate-600 transition-colors hover:bg-white hover:text-slate-900">Explore the workspace</Link>
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs text-slate-500"><span className="size-1.5 rounded-full bg-amber-500" /> Backend connection required for live verification</p>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] lg:ml-auto">
          <div aria-hidden="true" className="absolute -right-10 -top-12 size-48 rounded-full bg-indigo-100/60 blur-3xl" />
          <div className="relative rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_24px_70px_-28px_rgba(15,23,42,0.25)] sm:p-6">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><FileSearch size={19} aria-hidden="true" /></span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Document verification</p>
                  <p className="mt-1 text-[11px] text-slate-500">A human-centered review flow</p>
                </div>
              </div>
              <span className="rounded-full border border-slate-200 px-2.5 py-1 text-[10px] font-medium text-slate-500">Preview</span>
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700"><span className="flex size-6 items-center justify-center rounded-md bg-white text-slate-500 shadow-sm"><FileSearch size={13} aria-hidden="true" /></span> Review the evidence</div>
                <span className="text-[10px] text-slate-400">No sample results</span>
              </div>
              <div className="flex flex-col gap-3">
                {capabilities.map(({ icon: Icon, title, description }, index) => (
                  <div key={title} className="flex gap-3 rounded-lg border border-slate-200/80 bg-white p-3.5">
                    <span className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg ${index === 0 ? 'bg-indigo-50 text-indigo-600' : index === 1 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      <Icon size={14} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{title}</p>
                      <p className="mt-1 text-[11px] leading-4 text-slate-500">{description}</p>
                    </div>
                    <BadgeCheck className="ml-auto mt-1 shrink-0 text-slate-200" size={15} aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-lg bg-indigo-50/70 px-3.5 py-3 text-[11px] leading-5 text-indigo-800">
              <ShieldCheck size={15} className="shrink-0" aria-hidden="true" />
              Review decisions stay grounded in your actual sources and API results.
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white/70">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-9 sm:grid-cols-3 sm:gap-6 sm:px-8 sm:py-11 lg:px-12">
          {[
            { label: 'Claim-level clarity', value: 'Move beyond a single trust score' },
            { label: 'Evidence-first review', value: 'Keep sources close to findings' },
            { label: 'Human accountability', value: 'Make reviewer decisions visible' },
          ].map((item) => (
            <div key={item.label} className="sm:border-l sm:border-slate-200 sm:pl-6 first:sm:border-0 first:sm:pl-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-indigo-600">{item.label}</p>
              <p className="mt-2 text-sm font-medium text-slate-700">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1280px] flex-col gap-2 px-5 py-7 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>TrustDoc AI · Document verification workspace</p>
        <p>Connect the existing API to enable live analysis and review workflows.</p>
      </footer>
    </main>
  )
}
