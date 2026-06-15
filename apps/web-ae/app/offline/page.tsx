import { OfflineContent } from '@/components/features/errors/OfflineContent'

export const metadata = {
  title: 'Offline',
  robots: { index: false, follow: false },
}

export default function OfflinePage() {
  return <OfflineContent />
}
