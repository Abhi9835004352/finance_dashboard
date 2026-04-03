'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string
  href: string
  icon: string
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Transactions', href: '/transactions', icon: '💳' },
  { label: 'Insights', href: '/insights', icon: '💡' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 hidden md:flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          💰 Finance Dashboard
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6">
        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 rounded-lg transition-all font-medium text-sm ${isActive
                    ? 'bg-emerald-400/20 text-emerald-400 border-l-2 border-emerald-400'
                    : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50'
                  }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 flex items-center justify-center text-white font-bold">
            👤
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-100 truncate">User</p>
            <p className="text-xs text-zinc-500">Finance Manager</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
