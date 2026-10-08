'use client'

import { useState, type ChangeEvent, type DragEvent } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  AlertCircle,
  ArrowLeft,
  Check,
  FileText,
  FolderUp,
  Info,
  LockKeyhole,
  ArrowUpRight,
  ShieldCheck,
  Trash2,
  Upload,
} from 'lucide-react'

type UploadKind = 'document' | 'source'
type SelectedFiles = Record<UploadKind, File[]>

const allowedExtensions = new Set(['pdf', 'doc', 'docx', 'txt', 'md', 'csv'])
const accept = '.pdf,.doc,.docx,.txt,.md,.csv'

function getExtension(name: string) {
  return name.split('.').pop()?.toLowerCase() ?? ''
}

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function UploadCard({
  kind,
  title,
  description,
  files,
  onAdd,
  onRemove,
  error,
}: {
  kind: UploadKind
  title: string
  description: string
  files: File[]
  onAdd: (kind: UploadKind, files: File[]) => void
  onRemove: (kind: UploadKind, index: number) => void
  error: string | null
}) {
  const inputId = `files-${kind}`
  const [dragActive, setDragActive] = useState(false)

  function handleFiles(fileList: FileList | null) {
    if (fileList) onAdd(kind, Array.from(fileList))
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    setDragActive(false)
    handleFiles(event.dataTransfer.files)
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby={`${kind}-heading`}>
      <div className="mb-5 flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {kind === 'document' ? <FileText size={19} aria-hidden="true" /> : <ShieldCheck size={19} aria-hidden="true" />}
        </span>
        <div>
          <h2 id={`${kind}-heading`} className="text-sm font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
        </div>
      </div>

      <label
        htmlFor={inputId}
        onDragOver={(event) => { event.preventDefault(); setDragActive(true) }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`group flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 py-6 text-center transition-colors ${dragActive ? 'border-indigo-400 bg-indigo-50/70' : 'border-slate-300 bg-slate-50/50 hover:border-indigo-300 hover:bg-indigo-50/40'}`}
      >
        <input
          id={inputId}
          type="file"
          multiple
          accept={accept}
          className="sr-only"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleFiles(event.target.files)
            event.target.value = ''
          }}
        />
        <span className="flex size-10 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200 group-hover:ring-indigo-200"><FolderUp size={19} aria-hidden="true" /></span>
        <span className="mt-3 text-sm font-semibold text-slate-800">Drop files here or <span className="text-indigo-600">browse</span></span>
        <span className="mt-1.5 text-[11px] text-slate-500">PDF, DOC, DOCX, TXT, MD, CSV</span>
      </label>

      {error && (
        <p role="alert" className="mt-3 flex items-start gap-2 text-xs leading-5 text-rose-700">
          <AlertCircle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />{error}
        </p>
      )}

      {files.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2" aria-label={`${title} selected files`}>
          {files.map((file, index) => (
            <li key={`${file.name}-${file.lastModified}-${index}`} className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500"><FileText size={15} aria-hidden="true" /></span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-medium text-slate-800">{file.name}</span>
                <span className="mt-0.5 block text-[10px] text-slate-500">{formatSize(file.size)}</span>
              </span>
              <span className="flex size-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-700"><Check size={13} aria-hidden="true" /></span>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                onClick={() => onRemove(kind, index)}
                className="flex size-7 items-center justify-center rounded-md text-slate-400 hover:bg-rose-50 hover:text-rose-600"
              ><Trash2 size={14} aria-hidden="true" /></button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export function UploadScreen() {
  const [files, setFiles] = useState<SelectedFiles>({ document: [], source: [] })
  const [errors, setErrors] = useState<Record<UploadKind, string | null>>({ document: null, source: null })

  function addFiles(kind: UploadKind, incoming: File[]) {
    const unsupported = incoming.filter((file) => !allowedExtensions.has(getExtension(file.name)))
    if (unsupported.length > 0) {
      setErrors((current) => ({
        ...current,
        [kind]: `Unsupported file type: ${unsupported.map((file) => file.name).join(', ')}. Choose PDF, DOC, DOCX, TXT, MD, or CSV files.`,
      }))
    } else {
      setErrors((current) => ({ ...current, [kind]: null }))
    }

    const valid = incoming.filter((file) => allowedExtensions.has(getExtension(file.name)))
    if (valid.length > 0) {
      setFiles((current) => ({ ...current, [kind]: [...current[kind], ...valid] }))
    }
  }

  function removeFile(kind: UploadKind, index: number) {
    setFiles((current) => ({ ...current, [kind]: current[kind].filter((_, fileIndex) => fileIndex !== index) }))
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/dashboard" className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600"><ArrowLeft size={14} aria-hidden="true" /> Back to dashboard</Link>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600">Verification setup</p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-[30px]">Prepare your documents</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Choose an AI-generated document and any trusted material you want to use as supporting sources.</p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-600 sm:self-auto">
          <LockKeyhole size={13} aria-hidden="true" /> Files stay in this preview
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <UploadCard
          kind="document"
          title="AI-generated document"
          description="The document whose claims you want to verify."
          files={files.document}
          onAdd={addFiles}
          onRemove={removeFile}
          error={errors.document}
        />
        <UploadCard
          kind="source"
          title="Trusted source material"
          description="Optional references to compare against the generated document."
          files={files.source}
          onAdd={addFiles}
          onRemove={removeFile}
          error={errors.source}
        />
      </div>

      <section className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5" aria-label="Verification unavailable">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700"><Info size={16} aria-hidden="true" /></span>
            <div>
              <h2 className="text-sm font-semibold text-amber-950">Verification is not connected yet</h2>
              <p className="mt-1 max-w-2xl text-xs leading-5 text-amber-900/80">Selected files are held only in this page and have not been uploaded. Connect the backend before verification can start.</p>
            </div>
          </div>
          <Button disabled aria-describedby="verification-help" className="shrink-0 bg-indigo-600 text-white">
            <Upload data-icon="inline-start" /> Start verification
          </Button>
        </div>
        <p id="verification-help" className="sr-only">The backend API is not connected, so files cannot be submitted.</p>
      </section>

      <div className="flex items-center justify-between border-t border-slate-200 pt-5">
        <p className="text-xs text-slate-400">Nothing is sent from this frontend preview.</p>
        <Link href="/settings" className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700">Connection details <ArrowUpRight size={14} aria-hidden="true" /></Link>
      </div>
    </div>
  )
}
