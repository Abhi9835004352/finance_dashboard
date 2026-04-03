'use client'

import { useFinanceStore } from '@/store/useFinanceStore'

export default function RoleSwitcher() {
  const { role, setRole } = useFinanceStore()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as 'admin' | 'viewer')
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-zinc-400">Role:</span>
      <select
        value={role}
        onChange={handleChange}
        className={`rounded-md px-3 py-2 text-sm font-medium border transition-colors cursor-pointer ${role === 'admin'
            ? 'bg-blue-400/10 border-blue-800 text-blue-400'
            : 'bg-zinc-800/50 border-zinc-700 text-zinc-300'
          }`}
      >
        <option value="admin">Admin</option>
        <option value="viewer">Viewer</option>
      </select>
      <div
        className={`rounded-full px-3 py-1 text-xs font-semibold ${role === 'admin'
            ? 'bg-blue-400/20 text-blue-400'
            : 'bg-zinc-700/50 text-zinc-400'
          }`}
      >
        {role === 'admin' ? '👨‍💼 Admin' : '👤 Viewer'}
      </div>
    </div>
  )
}
