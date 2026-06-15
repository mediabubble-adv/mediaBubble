import * as React from 'react'
import { Check, Minus } from 'lucide-react'

export interface ComparisonTableRow {
  label: string
  values: Array<string | boolean>
}

export interface ComparisonTableProps {
  columns: string[]
  rows: ComparisonTableRow[]
  highlightColumn?: number
  className?: string
  'aria-label'?: string
}

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check size={18} className="text-brand-success mx-auto" aria-label="Included" />
    ) : (
      <Minus size={18} className="text-brand-secondary/40 dark:text-brand-text-muted/40 mx-auto" aria-label="Not included" />
    )
  }

  return <span className="text-[13px] text-brand-secondary dark:text-brand-text-muted">{value}</span>
}

export function ComparisonTable({
  columns,
  rows,
  highlightColumn,
  className = '',
  'aria-label': ariaLabel = 'Service comparison',
}: ComparisonTableProps) {
  return (
    <div className={['overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0', className].join(' ')}>
      <table className="w-full min-w-[560px] border-collapse text-start" aria-label={ariaLabel}>
        <thead>
          <tr>
            <th
              scope="col"
              className="text-start text-[12px] font-bold uppercase tracking-wide text-brand-secondary dark:text-brand-text-muted pb-4 pe-4 w-[40%]"
            >
              Feature
            </th>
            {columns.map((column, index) => (
              <th
                key={column}
                scope="col"
                className={[
                  'text-center text-[13px] font-semibold pb-4 px-3',
                  highlightColumn === index
                    ? 'text-brand-navy dark:text-brand-yellow'
                    : 'text-brand-navy dark:text-brand-off-white',
                ].join(' ')}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className="border-t border-brand-whisper-border dark:border-white/10"
            >
              <th
                scope="row"
                className="py-3 pe-4 text-[14px] font-medium text-brand-navy dark:text-brand-off-white text-start align-middle"
              >
                {row.label}
              </th>
              {row.values.map((value, index) => (
                <td
                  key={`${row.label}-${index}`}
                  className={[
                    'py-3 px-3 text-center align-middle',
                    highlightColumn === index ? 'bg-brand-yellow/5 dark:bg-brand-yellow/10' : '',
                  ].join(' ')}
                >
                  <CellValue value={value} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
