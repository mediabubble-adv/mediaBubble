import type { Metadata } from 'next'
import { Wallet } from 'lucide-react'
import { ModulePlaceholder } from '../_shell/module-placeholder'

export const metadata: Metadata = { title: 'Finance' }

export default function FinancePage() {
  return (
    <ModulePlaceholder
      icon={Wallet}
      title="Finance"
      description="Cash flow charts, currency switcher, ledger, optimization brief."
      status="Week 4"
    />
  )
}
