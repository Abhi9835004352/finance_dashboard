'use client'

import { usePathname } from 'next/navigation'
import MobileNav from './MobileNav'
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
      <div className="px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-3 md:gap-4">
        {/* Left side - Mobile nav + Page title */}
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <MobileNav />
          <span className="text-xl md:text-2xl flex-shrink-0">{getPageIcon()}</span>
          <h2 className="text-lg md:text-2xl font-bold text-zinc-100 truncate">{getPageTitle()}</h2>
        </div>

        {/* Right side - Controls */}
      </div>
    </header>
  )
}
