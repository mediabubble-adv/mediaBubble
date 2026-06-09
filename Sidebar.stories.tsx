import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-screen bg-white dark:bg-gray-950">
        <Story />
        <div className="flex-1 ml-64 p-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Main Content Area
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This demonstrates the sidebar next to main content. The sidebar is responsive and collapses
              on smaller screens.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                Sidebar will adjust content width as it expands/collapses
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default sidebar - starts collapsed
 */
export const Default: Story = {
  args: {
    navItems: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        ),
        href: '/',
      },
      {
        id: 'campaigns',
        label: 'Campaigns',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="9" x2="15" y2="9" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        ),
        href: '/campaigns',
        badge: 5,
      },
      {
        id: 'analytics',
        label: 'Analytics',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
            <line x1="12" y1="12" x2="20" y2="7.5" />
            <line x1="12" y1="12" x2="12" y2="21" />
            <line x1="12" y1="12" x2="4" y2="7.5" />
          </svg>
        ),
        href: '/analytics',
      },
      {
        id: 'portfolio',
        label: 'Portfolio',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 7h-12V4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" />
            <path d="M8 7V5" />
            <path d="M16 7V5" />
          </svg>
        ),
        href: '/portfolio',
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.12 2.12l4.24 4.24M1 12h6m6 0h6m-17.78 7.78l4.24-4.24m2.12-2.12l4.24-4.24M19.78 19.78l-4.24-4.24m-2.12-2.12l-4.24-4.24" />
          </svg>
        ),
        href: '/settings',
      },
    ],
  },
}

/**
 * Sidebar with custom action handlers
 */
export const WithActions: Story = {
  args: {
    ...Default.args,
    onLogout: () => alert('Logout clicked'),
  },
}

/**
 * Sidebar on dark mode
 */
export const DarkMode: Story = {
  args: {
    ...Default.args,
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <div className="flex min-h-screen bg-gray-950">
          <Story />
          <div className="flex-1 ml-64 p-8">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold text-white mb-4">
                Dark Mode
              </h1>
              <p className="text-gray-400 mb-4">
                The sidebar adapts to dark mode with appropriate color schemes.
              </p>
              <div className="bg-gray-800 p-8 rounded-lg">
                <p className="text-gray-300">
                  Dark mode is fully supported with proper contrast ratios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
}

/**
 * Minimal sidebar without badges
 */
export const Minimal: Story = {
  args: {
    navItems: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        ),
        href: '/',
      },
      {
        id: 'campaigns',
        label: 'Campaigns',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="9" x2="15" y2="9" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        ),
        href: '/campaigns',
      },
      {
        id: 'reports',
        label: 'Reports',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="13" x2="12" y2="17" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        ),
        href: '/reports',
      },
    ],
  },
}

/**
 * Sidebar with many items (scrollable)
 */
export const ManyItems: Story = {
  args: {
    navItems: [
      {
        id: '1',
        label: 'Dashboard',
        icon: <div className="w-5 h-5 bg-blue-500 rounded" />,
        href: '/',
      },
      {
        id: '2',
        label: 'Campaigns',
        icon: <div className="w-5 h-5 bg-green-500 rounded" />,
        href: '/campaigns',
        badge: 3,
      },
      {
        id: '3',
        label: 'Analytics',
        icon: <div className="w-5 h-5 bg-purple-500 rounded" />,
        href: '/analytics',
      },
      {
        id: '4',
        label: 'Portfolio',
        icon: <div className="w-5 h-5 bg-pink-500 rounded" />,
        href: '/portfolio',
      },
      {
        id: '5',
        label: 'Blog',
        icon: <div className="w-5 h-5 bg-orange-500 rounded" />,
        href: '/blog',
        badge: 2,
      },
      {
        id: '6',
        label: 'Team',
        icon: <div className="w-5 h-5 bg-red-500 rounded" />,
        href: '/team',
      },
      {
        id: '7',
        label: 'Reports',
        icon: <div className="w-5 h-5 bg-yellow-500 rounded" />,
        href: '/reports',
      },
      {
        id: '8',
        label: 'Settings',
        icon: <div className="w-5 h-5 bg-indigo-500 rounded" />,
        href: '/settings',
      },
      {
        id: '9',
        label: 'Help',
        icon: <div className="w-5 h-5 bg-cyan-500 rounded" />,
        href: '/help',
      },
    ],
  },
}
