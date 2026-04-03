'use client'

import { motion } from 'framer-motion'

interface SummaryCardProps {
  title: string
  value: string
  icon: string
  variant: 'balance' | 'income' | 'expense'
  trend?: { value: number; direction: 'up' | 'down' }
}

export default function SummaryCard({
  title,
  value,
  icon,
  variant,
  trend,
}: SummaryCardProps) {
  const baseColor = {
    balance: 'border-blue-800 bg-blue-400/10',
    income: 'border-emerald-800 bg-emerald-400/10',
    expense: 'border-red-800 bg-red-400/10',
  }

  const textColor = {
    balance: 'text-blue-400',
    income: 'text-emerald-400',
    expense: 'text-red-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-lg border p-4 md:p-6 ${baseColor[variant]}`}
    >
      <div className="flex items-start md:items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs md:text-sm text-zinc-400 font-medium mb-1 md:mb-2">{title}</p>
          <p className={`text-2xl md:text-3xl font-bold ${textColor[variant]} break-words`}>{value}</p>
        </div>
        <span className="text-3xl md:text-4xl flex-shrink-0">{icon}</span>
      </div>

      {trend && (
        <div className="mt-3 md:mt-4 flex items-center gap-1 text-xs md:text-sm">
          <span className={trend.direction === 'up' ? 'text-emerald-400' : 'text-red-400'}>
            {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
          </span>
          <span className="text-zinc-500">vs last month</span>
        </div>
      )}
    </motion.div>
  )
}
