import type { Metadata } from 'next'
import { NotFoundContent } from '@/components/features/errors/NotFoundContent'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you were looking for does not exist.',
}

export default function NotFound() {
  return <NotFoundContent />
}
