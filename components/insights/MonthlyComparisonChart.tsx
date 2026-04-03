'use client'

import { MonthlySummary } from '@/types'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface MonthlyComparisonChartProps {
  data: MonthlySummary[]
}

export default function MonthlyComparisonChart({
  data,
}: MonthlyComparisonChartProps) {
  return (
    <div className="rounded-lg border border-blue-800 bg-blue-400/5 p-4 md:p-6 col-span-1 lg:col-span-2">
      <h3 className="text-base md:text-lg font-semibold text-zinc-100 mb-2 md:mb-4">
        Monthly Income vs Expenses
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
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
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="square"
          />
          <Bar dataKey="income" fill="#10b981" name="Income" radius={[8, 8, 0, 0]} />
          <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
