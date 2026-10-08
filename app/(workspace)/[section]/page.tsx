import { DashboardScreen } from '@/components/trustdoc/dashboard-screen'
import { EmptyScreen } from '@/components/trustdoc/empty-screens'
import { UploadScreen } from '@/components/trustdoc/upload-screen'

const sectionTitles: Record<string, string> = {
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

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const { section } = await params

  if (section === 'dashboard') return <DashboardScreen />
  if (section === 'upload') return <UploadScreen />

  return <EmptyScreen section={section} title={sectionTitles[section]} />
}
