import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  CircleAlert,
  ClipboardCheck,
  FileSearch,
  Files,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

const metrics = [
  { label: 'Documents analyzed', icon: Files, accent: 'bg-indigo-50 text-indigo-600' },
  { label: 'Claims verified', icon: BadgeCheck, accent: 'bg-emerald-50 text-emerald-700' },
  { label: 'Issues detected', icon: CircleAlert, accent: 'bg-amber-50 text-amber-700' },
  { label: 'Pending reviews', icon: ClipboardCheck, accent: 'bg-violet-50 text-violet-700' },
]

function PageHeading() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600">Workspace overview</p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-[30px]">Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Understand what your AI-generated documents claim—and what the evidence supports.
        </p>
      </div>
      <Link href="/upload" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <FileSearch size={16} aria-hidden="true" />
        Start a verification
      </Link>
    </div>
  )
}

export function DashboardScreen() {
  return (
    <div className="flex flex-col gap-7">
      <PageHeading />

      <section aria-labelledby="connect-heading" className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm">
        <div className="grid lg:grid-cols-[1fr_280px]">
          <div className="flex gap-4 p-5 sm:p-7">
            <div className="hidden size-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:flex">
              <ShieldCheck size={22} aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="size-2 rounded-full bg-amber-500" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-amber-700">Connection required</span>
              </div>
              <h2 id="connect-heading" className="text-lg font-semibold tracking-tight text-slate-900">Your verification workspace is ready</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Connect the existing TrustDoc API to load real documents, analysis results, and review activity. This frontend preview does not generate sample data.
              </p>
              <Link href="/settings" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                View connection settings <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="flex items-center border-t border-indigo-50 bg-indigo-50/40 px-5 py-5 lg:border-l lg:border-t-0 lg:px-7">
            <div>
              <p className="text-xs font-medium text-slate-500">Trust score overview</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-300" aria-label="Unavailable">—</p>
              <p className="mt-1 text-xs text-slate-500">Available when analysis data is connected</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Workspace metrics" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, icon: Icon, accent }) => (
          <article key={label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-slate-500">{label}</p>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-300" aria-label="Unavailable">—</p>
              </div>
              <span className={`flex size-9 items-center justify-center rounded-lg ${accent}`}><Icon size={17} aria-hidden="true" /></span>
            </div>
            <p className="mt-3 text-[11px] text-slate-400">Waiting for backend data</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <article className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Recent documents</h2>
              <p className="mt-1 text-xs text-slate-500">Your latest verification activity</p>
            </div>
            <Link href="/documents" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">View all</Link>
          </div>
          <div className="flex min-h-[220px] flex-col items-center justify-center px-5 py-8 text-center">
            <span className="flex size-11 items-center justify-center rounded-xl bg-slate-50 text-slate-400"><Files size={20} aria-hidden="true" /></span>
            <h3 className="mt-3 text-sm font-semibold text-slate-800">No document activity to show</h3>
            <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">Documents will appear here after the backend is connected and returns your workspace data.</p>
            <Link href="/upload" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700">Prepare a document <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-slate-900">Risk distribution</h2>
            <p className="mt-1 text-xs text-slate-500">Finding levels across analyzed documents</p>
          </div>
          <div className="flex min-h-[220px] flex-col items-center justify-center px-5 py-8 text-center">
            <span className="flex size-11 items-center justify-center rounded-xl bg-slate-50 text-slate-400"><Sparkles size={20} aria-hidden="true" /></span>
            <p className="mt-3 text-sm font-medium text-slate-700">Analysis data unavailable</p>
            <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">Risk categories and totals will display when returned by the API.</p>
          </div>
        </article>
      </section>
    </div>
  )
}
