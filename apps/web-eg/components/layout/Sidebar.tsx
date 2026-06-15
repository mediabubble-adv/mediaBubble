import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight, Home, Settings, LogOut } from 'lucide-react'
import { getTypedStorageItem, setTypedStorageItem, STORAGE_KEYS } from '@mediabubble/shared/client'

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  badge?: number
}

interface SidebarProps {
  navItems?: NavItem[]
  onLogout?: () => void
}

export function Sidebar({
  navItems = defaultNavItems,
  onLogout
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const { t, i18n } = useTranslation()

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const saved = getTypedStorageItem(STORAGE_KEYS.sidebarCollapsed)
    if (saved !== null) {
      setCollapsed(saved)
    }
    setIsLoading(false)
  }, [])

  // Save collapsed state to localStorage when it changes
  useEffect(() => {
    if (!isLoading) {
      setTypedStorageItem(STORAGE_KEYS.sidebarCollapsed, collapsed)
    }
  }, [collapsed, isLoading])

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  // Prevent hydration mismatch during SSR
  if (isLoading) {
    return <div className="w-20 bg-gray-100" />
  }

  // Determine text direction
  const isRTL = i18n.language === 'ar'

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen z-40
        bg-gray-100 dark:bg-gray-900
        transition-all duration-300 ease-in-out
        shadow-lg border-r border-gray-200 dark:border-gray-800
        ${collapsed ? 'w-20' : 'w-64'}
        flex flex-col
      `}
    >
      {/* HEADER - Logo & Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        {/* Logo */}
        {!collapsed && (
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">MB</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white truncate">
              MediaBubble
            </span>
          </div>
        )}

        {/* Logo Icon Only (when collapsed) */}
        {collapsed && (
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          aria-label={collapsed ? t('common.expandSidebar') : t('common.collapseSidebar')}
          className={`
            p-2 rounded-lg text-gray-600 dark:text-gray-400
            hover:bg-gray-200 dark:hover:bg-gray-800
            transition-colors duration-200
            ml-auto
          `}
        >
          {collapsed ? (
            isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />
          ) : (
            isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />
          )}
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-lg
                  text-gray-700 dark:text-gray-300
                  hover:bg-gray-200 dark:hover:bg-gray-800
                  active:bg-gray-300 dark:active:bg-gray-700
                  transition-colors duration-200
                  relative group
                  ${collapsed ? 'justify-center' : 'justify-start'}
                `}
                title={collapsed ? item.label : ''}
              >
                {/* Icon */}
                <span className="flex-shrink-0 text-blue-600 dark:text-blue-400">
                  {item.icon}
                </span>

                {/* Label - Only show when expanded */}
                {!collapsed && (
                  <>
                    <span className="text-sm font-medium truncate flex-1">
                      {item.label}
                    </span>

                    {/* Badge */}
                    {item.badge && (
                      <span className="
                        bg-red-500 text-white text-xs font-bold
                        rounded-full w-5 h-5 flex items-center justify-center
                        flex-shrink-0
                      ">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="
                    absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-700
                    text-white text-sm rounded-lg whitespace-nowrap
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200
                    pointer-events-none z-50
                  ">
                    {item.label}
                  </div>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* FOOTER - Settings & Logout */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4 space-y-2">
        {/* Settings Button */}
        <button
          className={`
            w-full flex items-center gap-3 px-3 py-3 rounded-lg
            text-gray-700 dark:text-gray-300
            hover:bg-gray-200 dark:hover:bg-gray-800
            transition-colors duration-200
            ${collapsed ? 'justify-center' : 'justify-start'}
          `}
          title={collapsed ? t('common.settings') : ''}
        >
          <span className="flex-shrink-0 text-gray-600 dark:text-gray-400">
            <Settings size={20} />
          </span>
          {!collapsed && (
            <span className="text-sm font-medium">
              {t('common.settings')}
            </span>
          )}
        </button>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className={`
            w-full flex items-center gap-3 px-3 py-3 rounded-lg
            text-red-600 dark:text-red-400
            hover:bg-red-50 dark:hover:bg-red-900/20
            transition-colors duration-200
            ${collapsed ? 'justify-center' : 'justify-start'}
          `}
          title={collapsed ? t('common.logout') : ''}
        >
          <span className="flex-shrink-0">
            <LogOut size={20} />
          </span>
          {!collapsed && (
            <span className="text-sm font-medium">
              {t('common.logout')}
            </span>
          )}
        </button>
      </div>

      {/* Version / Info (optional) */}
      {!collapsed && (
        <div className="border-t border-gray-200 dark:border-gray-800 p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            v1.0.0
          </p>
        </div>
      )}
    </aside>
  )
}

// Default navigation items
const defaultNavItems: NavItem[] = [
  {
    id: 'home',
    label: 'Dashboard',
    icon: <Home size={20} />,
    href: '/dashboard',
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: <CampaignIcon />,
    href: '/campaigns',
    badge: 3,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <AnalyticsIcon />,
    href: '/analytics',
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    icon: <PortfolioIcon />,
    href: '/portfolio',
  },
  {
    id: 'team',
    label: 'Team',
    icon: <TeamIcon />,
    href: '/team',
  },
]

// Icon components (placeholder - replace with your actual icons)
function CampaignIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="9" y1="9" x2="15" y2="9" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
  )
}

function AnalyticsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
      <line x1="12" y1="12" x2="20" y2="7.5" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <line x1="12" y1="12" x2="4" y2="7.5" />
    </svg>
  )
}

function PortfolioIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 7h-12V4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" />
      <path d="M8 7V5" />
      <path d="M16 7V5" />
    </svg>
  )
}

function TeamIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

// Export hook for collapsed state (optional)
export function useSidebarCollapsed() {
  const [collapsed, setCollapsed] = useState(true)

  useEffect(() => {
    const saved = getTypedStorageItem(STORAGE_KEYS.sidebarCollapsed)
    if (saved !== null) {
      setCollapsed(saved)
    }
  }, [])

  return collapsed
}
