import type { Lead } from '../lib/supabase'

interface LeadsTableProps {
  leads: Lead[]
  loading: boolean
  sortField: keyof Lead
  sortDir: 'asc' | 'desc'
  onSort: (field: keyof Lead) => void
}

function SortIcon({ field, sortField, sortDir }: { field: keyof Lead; sortField: keyof Lead; sortDir: string }) {
  if (field !== sortField) {
    return (
      <svg className="w-3.5 h-3.5 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    )
  }
  return (
    <svg className="w-3.5 h-3.5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {sortDir === 'asc' ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      )}
    </svg>
  )
}

function IntentBadge({ intent }: { intent: string }) {
  if (!intent) return <span className="text-surface-600 text-sm">—</span>

  const lower = intent.toLowerCase()
  let colorClasses = 'bg-surface-700/50 text-surface-400'

  if (lower.includes('buyer') || lower.includes('buy') || lower.includes('looking')) {
    colorClasses = 'bg-success-500/10 text-success-400 border border-success-500/20'
  } else if (lower.includes('seller') || lower.includes('sell')) {
    colorClasses = 'bg-accent-500/10 text-accent-400 border border-accent-500/20'
  } else if (lower.includes('rent')) {
    colorClasses = 'bg-warning-400/10 text-warning-400 border border-warning-400/20'
  }

  return (
    <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium ${colorClasses}`}>
      {intent.length > 40 ? intent.substring(0, 40) + '…' : intent}
    </span>
  )
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatPhone(phone: string): string {
  if (!phone || phone === 'NULL' || phone === 'EMPTY') return '—'
  return phone
}

export default function LeadsTable({ leads, loading, sortField, sortDir, onSort }: LeadsTableProps) {
  const columns: { key: keyof Lead; label: string; sortable: boolean }[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'phone', label: 'Phone', sortable: true },
    { key: 'intent', label: 'Intent', sortable: true },
    { key: 'budget', label: 'Budget', sortable: true },
    { key: 'created_at', label: 'Date Added', sortable: true },
  ]

  if (loading) {
    return (
      <div className="glass-light rounded-2xl overflow-hidden animate-slide-up" style={{ animationDelay: '500ms', animationFillMode: 'backwards' }}>
        <div className="p-5 border-b border-surface-700/30">
          <div className="w-32 h-5 rounded skeleton" />
        </div>
        <div className="divide-y divide-surface-800/50">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <div className="w-8 h-8 rounded-full skeleton" />
              <div className="flex-1 space-y-2">
                <div className="w-32 h-4 rounded skeleton" />
                <div className="w-24 h-3 rounded skeleton" />
              </div>
              <div className="w-28 h-4 rounded skeleton" />
              <div className="w-20 h-6 rounded-lg skeleton" />
              <div className="w-16 h-4 rounded skeleton" />
              <div className="w-24 h-4 rounded skeleton" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (leads.length === 0) {
    return (
      <div className="glass-light rounded-2xl p-12 text-center animate-slide-up" style={{ animationDelay: '500ms', animationFillMode: 'backwards' }}>
        <div className="w-16 h-16 rounded-2xl bg-surface-800/60 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-surface-300 mb-1">No leads found</h3>
        <p className="text-sm text-surface-500">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="glass-light rounded-2xl overflow-hidden animate-slide-up" style={{ animationDelay: '500ms', animationFillMode: 'backwards' }}>
      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-700/30">
              <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-surface-400 uppercase tracking-wider w-10">
                #
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-5 py-3.5 text-left text-[11px] font-semibold text-surface-400 uppercase tracking-wider ${
                    col.sortable ? 'cursor-pointer hover:text-surface-200 select-none' : ''
                  } transition-colors duration-200`}
                  onClick={() => col.sortable && onSort(col.key)}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && <SortIcon field={col.key} sortField={sortField} sortDir={sortDir} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-800/30">
            {leads.map((lead, index) => (
              <tr
                key={lead.id}
                className="hover:bg-surface-800/30 transition-colors duration-150 group"
              >
                <td className="px-5 py-4 text-xs text-surface-600 font-mono">
                  {index + 1}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400/20 to-accent-400/20 flex items-center justify-center border border-primary-500/10 group-hover:border-primary-500/30 transition-colors duration-200">
                      <span className="text-xs font-bold text-primary-300">
                        {lead.name?.charAt(0)?.toUpperCase() || '?'}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-surface-200 group-hover:text-white transition-colors duration-200">
                      {lead.name || '—'}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-surface-400 font-mono tracking-tight">
                    {formatPhone(lead.phone)}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <IntentBadge intent={lead.intent} />
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm font-semibold text-surface-200">
                    {lead.budget || '—'}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-xs text-surface-500">
                    {lead.created_at ? formatDate(lead.created_at) : '—'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-surface-700/30 flex items-center justify-between">
        <span className="text-xs text-surface-500">
          Showing <span className="text-surface-300 font-medium">{leads.length}</span> leads
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
          <span className="text-[10px] text-surface-500 font-medium">Connected to Supabase</span>
        </div>
      </div>
    </div>
  )
}
