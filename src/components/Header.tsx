import { useAuth } from '../context/AuthContext'

interface HeaderProps {
  onRefresh: () => void
  loading: boolean
}

export default function Header({ onRefresh, loading }: HeaderProps) {
  const { user, signOut } = useAuth()

  const userInitial = user?.email?.charAt(0).toUpperCase() ?? 'U'
  const userEmail = user?.email ?? ''

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

            {/* Logout button */}
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                bg-surface-800/80 hover:bg-danger-500/20 text-surface-400 hover:text-danger-400
                border border-surface-700/50 hover:border-danger-500/30
                transition-all duration-200 group"
            >
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>

            {/* User avatar with email tooltip */}
            <div className="relative group/avatar">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-xs font-bold shadow-lg shadow-primary-500/20 cursor-default">
                {userInitial}
              </div>
              {/* Tooltip */}
              {userEmail && (
                <div className="absolute right-0 top-full mt-2 px-3 py-1.5 rounded-lg bg-surface-800 border border-surface-700/50
                  text-xs text-surface-300 whitespace-nowrap opacity-0 invisible
                  group-hover/avatar:opacity-100 group-hover/avatar:visible
                  transition-all duration-200 shadow-xl pointer-events-none">
                  {userEmail}
                  <div className="absolute -top-1 right-3 w-2 h-2 bg-surface-800 border-l border-t border-surface-700/50 rotate-45" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
