import { useMemo } from 'react'
import type { Lead } from '../lib/supabase'

interface StatsCardsProps {
  leads: Lead[]
  loading: boolean
}

interface StatConfig {
  label: string
  value: string | number
  icon: JSX.Element
  gradient: string
  shadowColor: string
  change?: string
}

export default function StatsCards({ leads, loading }: StatsCardsProps) {
  const stats = useMemo((): StatConfig[] => {
    const totalLeads = leads.length

    const buyerCount = leads.filter((l) =>
      l.intent?.toLowerCase().includes('buyer') || l.intent?.toLowerCase().includes('buy') || l.intent?.toLowerCase().includes('looking')
    ).length

    const withPhone = leads.filter((l) => l.phone && l.phone !== 'NULL' && l.phone !== 'EMPTY').length

    // Parse budgets to find average
    const budgets = leads
      .map((l) => {
        if (!l.budget) return 0
        const cleaned = l.budget.replace(/[^0-9.]/g, '')
        const num = parseFloat(cleaned)
        if (isNaN(num)) return 0
        const lower = l.budget.toLowerCase()
        if (lower.includes('crore') || lower.includes('cro')) return num * 10000000
        if (lower.includes('lakh') || lower.includes('lac')) return num * 100000
        if (lower.includes('k')) return num * 1000
        if (lower.includes('m') && !lower.includes('miami')) return num * 1000000
        return num
      })
      .filter((b) => b > 0)

    const avgBudget = budgets.length > 0
      ? budgets.reduce((a, b) => a + b, 0) / budgets.length
      : 0

    function formatBudget(val: number): string {
      if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`
      if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`
      if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`
      return `$${val.toFixed(0)}`
    }

    return [
      {
        label: 'Total Leads',
        value: totalLeads,
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        ),
        gradient: 'from-primary-500 to-primary-700',
        shadowColor: 'shadow-primary-500/20',
      },
      {
        label: 'Active Buyers',
        value: buyerCount,
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        ),
        gradient: 'from-success-500 to-success-600',
        shadowColor: 'shadow-success-500/20',
      },
      {
        label: 'With Phone',
        value: withPhone,
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        ),
        gradient: 'from-accent-500 to-accent-600',
        shadowColor: 'shadow-accent-500/20',
      },
      {
        label: 'Avg Budget',
        value: avgBudget > 0 ? formatBudget(avgBudget) : '—',
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        gradient: 'from-warning-400 to-warning-500',
        shadowColor: 'shadow-warning-500/20',
      },
    ]
  }, [leads])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-2xl p-5 glass-light animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl skeleton" />
              <div className="w-16 h-4 rounded skeleton" />
            </div>
            <div className="w-20 h-8 rounded skeleton mb-1" />
            <div className="w-24 h-3 rounded skeleton" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-8">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`glass-light rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 animate-slide-up group cursor-default`}
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg ${stat.shadowColor} group-hover:scale-110 transition-transform duration-300`}>
              {stat.icon}
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
          <div className="text-xs text-surface-400 font-medium mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
