'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import {
  ArrowUpRight,
  BookOpenCheck,
  ChevronDown,
  ClipboardCheck,
  FileClock,
  FileSearch,
  Files,
  GitCompareArrows,
  LayoutDashboard,
  Menu,
  Settings2,
  ShieldCheck,
  X,
} from 'lucide-react'

const navigation = [
  {
    label: 'Workspace',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Documents', href: '/documents', icon: Files },
      { label: 'New verification', href: '/upload', icon: FileSearch },
    ],
  },
  {
    label: 'Governance',
    items: [
      { label: 'Review queue', href: '/reviews', icon: ClipboardCheck },
      { label: 'Reports', href: '/reports', icon: BookOpenCheck },
      { label: 'Compare documents', href: '/compare', icon: GitCompareArrows },
      { label: 'Audit trail', href: '/audit', icon: FileClock },
    ],
  },
]

const pageTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  documents: 'Documents',
  upload: 'New verification',
  analysis: 'Analysis results',
  'review-workspace': 'Review workspace',
  reviews: 'Human review queue',
  reports: 'Reports',
  compare: 'Document comparison',
  audit: 'Audit trail',
  settings: 'Settings',
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <>
      <Link href="/dashboard" className="mb-9 flex items-center gap-3 px-3" onClick={onNavigate}>
        <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-950/20">
          <ShieldCheck size={22} strokeWidth={2.2} aria-hidden="true" />
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-bold tracking-[0.12em] text-white">TRUSTDOC</span>
          <span className="text-[10px] font-medium tracking-[0.18em] text-slate-400">AI VERIFICATION</span>
        </span>
      </Link>

      <nav aria-label="Main navigation" className="flex flex-col gap-7">
        {navigation.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              {group.label}
            </p>
            <div className="flex flex-col gap-1">
              {group.items.map(({ label, href, icon: Icon }) => {
                const active = pathname === href || (href === '/documents' && pathname.startsWith('/documents/'))
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={`flex min-h-10 items-center gap-3 rounded-lg px-3 text-[13px] font-medium transition-colors ${
                      active
                        ? 'bg-white/10 text-white shadow-sm'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                    <span>{label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-5 pt-8">
        <Link
          href="/settings"
          onClick={onNavigate}
          aria-current={pathname === '/settings' ? 'page' : undefined}
          className={`flex min-h-10 items-center gap-3 rounded-lg px-3 text-[13px] font-medium transition-colors ${
            pathname === '/settings' ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Settings2 size={17} strokeWidth={1.8} aria-hidden="true" />
          Settings
        </Link>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-200">
            <span className="size-2 rounded-full bg-amber-400" />
            Backend not connected
          </div>
          <p className="text-[11px] leading-5 text-slate-400">
            Connect your API to load document data and run verifications.
          </p>
          <Link href="/settings" onClick={onNavigate} className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-300 hover:text-white">
            Connection settings <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  )
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const section = pathname.split('/').filter(Boolean)[0] || 'dashboard'
  const title = pageTitles[section] ?? 'TrustDoc AI'
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[252px] flex-col bg-[#101828] px-4 py-6 md:flex">
        <Sidebar />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/50"
            aria-label="Close navigation menu"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex h-full w-[min(84vw,300px)] flex-col bg-[#101828] px-4 py-6 shadow-2xl">
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setMobileOpen(false)}
              className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-lg text-slate-300 hover:bg-white/10 hover:text-white"
            >
              <X size={18} aria-hidden="true" />
            </button>
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="min-h-screen md:pl-[252px]">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation menu"
              onClick={() => setMobileOpen(true)}
              className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 md:hidden"
            >
              <Menu size={18} aria-hidden="true" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>TrustDoc AI</span>
                <span aria-hidden="true">/</span>
                <span className="font-medium text-slate-600">{title}</span>
              </div>
              <p className="mt-1 hidden text-[11px] text-slate-400 sm:block">Document assurance workspace</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[11px] font-medium text-amber-800 sm:flex">
              <span className="size-1.5 rounded-full bg-amber-500" />
              API unavailable
            </div>
            <Link
              href="/settings"
              aria-label="Open settings"
              className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
            >
              <Settings2 size={18} strokeWidth={1.8} aria-hidden="true" />
            </Link>
            <div className="flex items-center gap-2 border-l border-slate-200 pl-3 sm:pl-4">
              <span className="flex size-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">TD</span>
              <div className="hidden leading-tight sm:block">
                <p className="text-xs font-semibold text-slate-800">Workspace</p>
                <p className="mt-1 text-[10px] text-slate-400">Frontend preview</p>
              </div>
              <ChevronDown size={14} className="hidden text-slate-400 sm:block" aria-hidden="true" />
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1500px] px-4 py-7 sm:px-6 lg:px-9 lg:py-9">{children}</main>
      </div>
    </div>
  )
}

