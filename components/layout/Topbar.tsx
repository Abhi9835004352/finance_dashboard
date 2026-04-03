'use client'

import { usePathname } from 'next/navigation'
import RoleSwitcher from './RoleSwitcher'
import ThemeToggle from './ThemeToggle'

export default function Topbar() {
  const pathname = usePathname()

  const getPageTitle = () => {
    if (pathname === '/dashboard' || pathname === '/') {
      return 'Dashboard'
    } else if (pathname === '/transactions') {
      return 'Transactions'
    } else if (pathname === '/insights') {
      return 'Insights'
    }
    return 'Finance Dashboard'
  }

  const getPageIcon = () => {
    if (pathname === '/dashboard' || pathname === '/') {
      return '📊'
    } else if (pathname === '/transactions') {
      return '💳'
    } else if (pathname === '/insights') {
      return '💡'
    }
    return '💰'
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-900 border-b border-zinc-800">
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        {/* Left side - Page title */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getPageIcon()}</span>
          <h2 className="text-2xl font-bold text-zinc-100">{getPageTitle()}</h2>
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center gap-4">
        </div>
      </div>
    </header>
  )
}
