'use client'

import { MonthlySummary } from '@/types'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface BalanceTrendChartProps {
  data: MonthlySummary[]
}

export default function BalanceTrendChart({ data }: BalanceTrendChartProps) {
  return (
    <div className="col-span-1 lg:col-span-2 rounded-lg border border-blue-800 bg-blue-400/5 p-4 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-zinc-100 mb-2 md:mb-4">Balance Trend</h3>
      <p className="text-xs md:text-sm text-zinc-400 mb-4 md:mb-6">6-month line chart</p>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
          <XAxis
            dataKey="month"
            stroke="#71717a"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#71717a" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#18181b',
              border: '1px solid #3f3f46',
              borderRadius: '8px',
              color: '#fafafa',
            }}
            formatter={(value) => `$${value?.toLocaleString()}`}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: '#10b981', r: 6 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
