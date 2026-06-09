import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Sidebar } from './Sidebar'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('Sidebar', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('Default State', () => {
    it('renders collapsed by default', () => {
      render(<Sidebar />)
      const sidebar = screen.getByRole('complementary')
      expect(sidebar).toHaveClass('w-20')
    })

    it('hides nav labels when collapsed', () => {
      render(<Sidebar />)
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
    })

    it('shows logo icon when collapsed', () => {
      render(<Sidebar />)
      expect(screen.getByText('M')).toBeInTheDocument()
    })
  })

  describe('Toggle Functionality', () => {
    it('expands sidebar when toggle button is clicked', async () => {
      render(<Sidebar />)
      const toggleButton = screen.getByLabelText(/expandSidebar|collapseSidebar/i)

      fireEvent.click(toggleButton)

      await waitFor(() => {
        const sidebar = screen.getByRole('complementary')
        expect(sidebar).toHaveClass('w-64')
      })
    })

    it('shows nav labels when expanded', async () => {
      render(<Sidebar />)
      const toggleButton = screen.getByLabelText(/expandSidebar|collapseSidebar/i)

      fireEvent.click(toggleButton)

      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument()
      })
    })

    it('collapses sidebar when toggle is clicked again', async () => {
      render(<Sidebar />)
      const toggleButton = screen.getByLabelText(/expandSidebar|collapseSidebar/i)

      // Expand
      fireEvent.click(toggleButton)
      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument()
      })

      // Collapse
      fireEvent.click(toggleButton)
      await waitFor(() => {
        expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
      })
    })
  })

  describe('localStorage Persistence', () => {
    it('saves collapsed state to localStorage', async () => {
      render(<Sidebar />)
      const toggleButton = screen.getByLabelText(/expandSidebar|collapseSidebar/i)

      fireEvent.click(toggleButton)

      await waitFor(() => {
        expect(localStorage.getItem('sidebarCollapsed')).toBe('false')
      })
    })

    it('restores collapsed state from localStorage', () => {
      localStorage.setItem('sidebarCollapsed', 'false')

      render(<Sidebar />)

      const sidebar = screen.getByRole('complementary')
      expect(sidebar).toHaveClass('w-64')
    })

    it('defaults to collapsed if no localStorage value', () => {
      render(<Sidebar />)

      const sidebar = screen.getByRole('complementary')
      expect(sidebar).toHaveClass('w-20')
    })
  })

  describe('Navigation Items', () => {
    it('renders all nav items', () => {
      render(<Sidebar />)

      // Items should render even when collapsed (with tooltip)
      const dashboard = screen.getByRole('link', { name: /Dashboard/i })
      expect(dashboard).toBeInTheDocument()
    })

    it('displays badges when provided', () => {
      render(<Sidebar />)

      // Badge should show "3"
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('shows tooltip on hover when collapsed', async () => {
      render(<Sidebar />)

      const dashboardLink = screen.getByTitle('Dashboard')
      fireEvent.mouseEnter(dashboardLink)

      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeVisible()
      })
    })
  })

  describe('Logout Functionality', () => {
    it('calls onLogout when logout button is clicked', async () => {
      const handleLogout = vi.fn()
      render(<Sidebar onLogout={handleLogout} />)

      // Need to expand to see text
      const toggleButton = screen.getByLabelText(/expandSidebar|collapseSidebar/i)
      fireEvent.click(toggleButton)

      await waitFor(() => {
        const logoutButton = screen.getByRole('button', { name: /logout/i })
        fireEvent.click(logoutButton)
        expect(handleLogout).toHaveBeenCalled()
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<Sidebar />)

      const toggleButton = screen.getByLabelText(/expandSidebar|collapseSidebar/i)
      expect(toggleButton).toBeInTheDocument()
    })

    it('navigation list is semantic <nav>', () => {
      render(<Sidebar />)

      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })

    it('sidebar has correct role', () => {
      render(<Sidebar />)

      const aside = screen.getByRole('complementary')
      expect(aside).toBeInTheDocument()
    })

    it('nav links are accessible via keyboard', () => {
      render(<Sidebar />)

      const dashboardLink = screen.getByRole('link', { name: /Dashboard/i })
      expect(dashboardLink).toHaveProperty('href')
    })
  })

  describe('Dark Mode', () => {
    it('applies dark mode classes when dark class is present', () => {
      const { container } = render(
        <div className="dark">
          <Sidebar />
        </div>
      )

      const sidebar = container.querySelector('aside')
      expect(sidebar).toHaveClass('dark:bg-gray-900')
    })
  })

  describe('Responsive Design', () => {
    it('renders fixed positioning', () => {
      const { container } = render(<Sidebar />)

      const sidebar = container.querySelector('aside')
      expect(sidebar).toHaveClass('fixed', 'top-0', 'left-0', 'h-screen', 'z-40')
    })

    it('applies smooth transition', () => {
      const { container } = render(<Sidebar />)

      const sidebar = container.querySelector('aside')
      expect(sidebar).toHaveClass('transition-all', 'duration-300')
    })
  })

  describe('Custom Nav Items', () => {
    it('renders custom nav items when provided', () => {
      const customItems = [
        {
          id: 'custom1',
          label: 'Custom Item',
          icon: <span>🔧</span>,
          href: '/custom',
        },
      ]

      render(<Sidebar navItems={customItems} />)

      const customLink = screen.getByRole('link', { name: /Custom Item/i })
      expect(customLink).toBeInTheDocument()
    })
  })
})
