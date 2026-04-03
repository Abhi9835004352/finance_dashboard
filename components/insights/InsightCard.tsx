'use client'

import { motion } from 'framer-motion'

interface InsightCardProps {
  title: string
  value: string
  description: string
  icon: string
  statusColor?: 'emerald' | 'amber' | 'red'
}

export default function InsightCard({
  title,
  value,
  description,
  icon,
  statusColor = 'emerald',
}: InsightCardProps) {
  const colorClasses = {
    emerald: 'border-emerald-800 bg-emerald-400/5',
    amber: 'border-amber-800 bg-amber-400/5',
    red: 'border-red-800 bg-red-400/5',
  }

  const textColorClasses = {
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
    red: 'text-red-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-lg border p-6 ${colorClasses[statusColor]}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-zinc-400 font-medium mb-1">{title}</p>
          <p className={`text-3xl font-bold ${textColorClasses[statusColor]}`}>
            {value}
          </p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
      <p className="text-sm text-zinc-500">{description}</p>
    </motion.div>
  )
}
