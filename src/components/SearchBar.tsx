interface SearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  intentFilter: string
  onIntentFilterChange: (filter: string) => void
  uniqueIntents: string[]
  totalResults: number
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
  intentFilter,
  onIntentFilterChange,
  uniqueIntents,
  totalResults,
}: SearchBarProps) {
  return (
    <div className="glass-light rounded-2xl p-4 mb-6 animate-slide-up" style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}>
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search leads by name, phone, intent, budget..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-800/60 border border-surface-700/50
              text-sm text-white placeholder-surface-500
              focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/40
              transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full
                bg-surface-600 hover:bg-surface-500 flex items-center justify-center
                transition-colors duration-200"
            >
              <svg className="w-3 h-3 text-surface-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Intent Filter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-surface-800/60 rounded-xl border border-surface-700/50 p-1">
            <button
              onClick={() => onIntentFilterChange('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                intentFilter === 'all'
                  ? 'bg-primary-500/20 text-primary-400 shadow-sm'
                  : 'text-surface-400 hover:text-surface-300'
              }`}
            >
              All
            </button>
            {uniqueIntents.map((intent) => (
              <button
                key={intent}
                onClick={() => onIntentFilterChange(intent)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  intentFilter === intent
                    ? 'bg-primary-500/20 text-primary-400 shadow-sm'
                    : 'text-surface-400 hover:text-surface-300'
                }`}
              >
                {intent}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <div className="hidden sm:flex items-center px-3 py-1.5 rounded-lg bg-surface-800/40 border border-surface-700/30">
          <span className="text-xs text-surface-400">
            <span className="text-white font-semibold">{totalResults}</span> leads
          </span>
        </div>
      </div>
    </div>
  )
}
