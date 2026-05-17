import { useState, useEffect, useMemo } from 'react'
import { supabase } from './lib/supabase'
import type { Lead } from './lib/supabase'
import StatsCards from './components/StatsCards.tsx'
import LeadsTable from './components/LeadsTable.tsx'
import SearchBar from './components/SearchBar.tsx'
import Header from './components/Header.tsx'

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [intentFilter, setIntentFilter] = useState<string>('all')
  const [sortField, setSortField] = useState<keyof Lead>('created_at')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    fetchLeads()
  }, [])

  async function fetchLeads() {
    try {
      setLoading(true)
      setError(null)
      const { data, error: fetchError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setLeads(data || [])
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch leads'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const filteredLeads = useMemo(() => {
    let result = leads

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (lead) =>
          (lead.name?.toLowerCase().includes(q)) ||
          (lead.phone?.toLowerCase().includes(q)) ||
          (lead.intent?.toLowerCase().includes(q)) ||
          (lead.budget?.toLowerCase().includes(q))
      )
    }

    // Intent filter
    if (intentFilter !== 'all') {
      result = result.filter((lead) =>
        lead.intent?.toLowerCase().includes(intentFilter.toLowerCase())
      )
    }

    // Sorting
    result = [...result].sort((a, b) => {
      const aVal = a[sortField] ?? ''
      const bVal = b[sortField] ?? ''
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
      return 0
    })

    return result
  }, [leads, searchQuery, intentFilter, sortField, sortDir])

  const uniqueIntents = useMemo(() => {
    const intents = new Set<string>()
    leads.forEach((lead) => {
      if (lead.intent) {
        // Extract the main intent keyword
        const text = lead.intent.toLowerCase()
        if (text.includes('buyer') || text.includes('buy') || text.includes('looking')) {
          intents.add('Buyer')
        }
        if (text.includes('seller') || text.includes('sell')) {
          intents.add('Seller')
        }
        if (text.includes('rent')) {
          intents.add('Renter')
        }
      }
    })
    if (intents.size === 0) {
      leads.forEach((lead) => {
        if (lead.intent) intents.add(lead.intent)
      })
    }
    return Array.from(intents)
  }, [leads])

  function handleSort(field: keyof Lead) {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  return (
    <div className="min-h-screen bg-surface-950 text-white">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-accent-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <Header onRefresh={fetchLeads} loading={loading} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-danger-500/10 border border-danger-500/20 text-danger-400 animate-slide-down">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-sm">{error}</span>
                <button
                  onClick={fetchLeads}
                  className="ml-auto text-xs px-3 py-1 rounded-lg bg-danger-500/20 hover:bg-danger-500/30 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          <StatsCards leads={leads} loading={loading} />

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            intentFilter={intentFilter}
            onIntentFilterChange={setIntentFilter}
            uniqueIntents={uniqueIntents}
            totalResults={filteredLeads.length}
          />

          <LeadsTable
            leads={filteredLeads}
            loading={loading}
            sortField={sortField}
            sortDir={sortDir}
            onSort={handleSort}
          />
        </main>
      </div>
    </div>
  )
}
