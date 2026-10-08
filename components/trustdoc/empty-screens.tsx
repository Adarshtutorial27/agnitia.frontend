import Link from 'next/link'
import {
  ArrowRight,
  BookOpenCheck,
  ClipboardCheck,
  FileClock,
  FileSearch,
  Files,
  GitCompareArrows,
  ListChecks,
  Settings2,
  ShieldAlert,
} from 'lucide-react'

const sectionContent: Record<string, { description: string; message: string; detail: string; icon: typeof Files; action: string; href: string }> = {
  documents: {
    description: 'Browse and manage documents submitted for verification.',
    message: 'Your document library is empty',
    detail: 'Documents will appear here when the connected backend returns your workspace records.',
    icon: Files,
    action: 'Prepare a verification',
    href: '/upload',
  },
  analysis: {
    description: 'Review the claims, evidence, and risk findings from a document analysis.',
    message: 'No analysis selected',
    detail: 'Analysis findings can only be shown after a document has been processed by the backend.',
    icon: FileSearch,
    action: 'View documents',
    href: '/documents',
  },
  'review-workspace': {
    description: 'Inspect document passages alongside their evidence and findings.',
    message: 'Review workspace is waiting for a document',
    detail: 'Choose an analyzed document to see its text and any findings returned by the API. No review actions are enabled in this frontend-only preview.',
    icon: ShieldAlert,
    action: 'Open review queue',
    href: '/reviews',
  },
  reviews: {
    description: 'Triage findings that need a human decision.',
    message: 'Review queue is empty',
    detail: 'Queue items will appear when the backend provides pending reviews. Accept and dismiss actions are not connected here.',
    icon: ClipboardCheck,
    action: 'View documents',
    href: '/documents',
  },
  reports: {
    description: 'Explore verification outcomes and export reports for your team.',
    message: 'No reports available',
    detail: 'Reports require real analysis records from the connected backend. This page will not display placeholder metrics.',
    icon: BookOpenCheck,
    action: 'Go to dashboard',
    href: '/dashboard',
  },
  compare: {
    description: 'Compare document versions and identify changes in claims or evidence.',
    message: 'Select documents to compare',
    detail: 'Comparison requires documents and analysis data from the backend; no sample documents are loaded in this preview.',
    icon: GitCompareArrows,
    action: 'Browse documents',
    href: '/documents',
  },
  audit: {
    description: 'Review a traceable history of verification and reviewer activity.',
    message: 'No audit events to display',
    detail: 'Audit entries will be shown when returned by your API. Events are not fabricated in the frontend preview.',
    icon: FileClock,
    action: 'Go to dashboard',
    href: '/dashboard',
  },
  settings: {
    description: 'Manage your workspace connection and verification preferences.',
    message: 'Backend connection is not configured',
    detail: 'This frontend does not yet know your API base URL, authentication requirements, or supported request schemas. Those details are needed before connection settings can be wired safely.',
    icon: Settings2,
    action: 'Prepare a document',
    href: '/upload',
  },
}

export function EmptyScreen({ section, title }: { section: string; title?: string }) {
  const content = sectionContent[section]
  if (!content) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <ListChecks className="mx-auto text-slate-400" aria-hidden="true" />
        <h1 className="mt-3 text-lg font-semibold text-slate-900">Page unavailable</h1>
        <Link href="/dashboard" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">Return to dashboard <ArrowRight size={15} aria-hidden="true" /></Link>
      </div>
    )
  }

  const Icon = content.icon
  return (
    <div className="flex flex-col gap-7">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600">TrustDoc workspace</p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-[30px]">{title ?? section}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{content.description}</p>
      </div>

      {section === 'settings' && (
        <section className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5" aria-label="Backend integration status">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700"><Settings2 size={16} aria-hidden="true" /></span>
            <div>
              <h2 className="text-sm font-semibold text-amber-950">Integration details required</h2>
              <p className="mt-1 text-sm leading-6 text-amber-900/80">Provide the backend source or API documentation to connect this interface without guessing endpoints or authentication behavior.</p>
            </div>
          </div>
        </section>
      )}

      <section className="flex min-h-[340px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center shadow-sm sm:min-h-[410px]">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400"><Icon size={24} strokeWidth={1.7} aria-hidden="true" /></span>
        <h2 className="mt-5 text-base font-semibold text-slate-900">{content.message}</h2>
        <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">{content.detail}</p>
        <Link href={content.href} className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          {content.action}<ArrowRight size={15} aria-hidden="true" />
        </Link>
      </section>
    </div>
  )
}
