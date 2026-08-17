interface HeaderProps {
  onRefresh: () => void
  loading: boolean
}

export default function Header({ onRefresh, loading }: HeaderProps) {
  return (
    <header className="glass sticky top-0 z-50 border-b border-surface-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                <span className="gradient-text">RealEstate</span>
                <span className="text-surface-300">CRM</span>
              </h1>
              <p className="text-[10px] text-surface-500 -mt-0.5 font-medium tracking-wider uppercase">Lead Management</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                bg-surface-800/80 hover:bg-surface-700/80 text-surface-300 hover:text-white
                border border-surface-700/50 hover:border-surface-600/50
                transition-all duration-200 disabled:opacity-50 group"
            >
              <svg
                className={`w-4 h-4 transition-transform duration-500 ${loading ? 'animate-spin' : 'group-hover:rotate-180'}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
