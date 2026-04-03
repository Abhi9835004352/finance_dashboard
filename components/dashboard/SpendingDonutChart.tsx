'use client'

import { Transaction } from '@/types'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { calculateCategoryTotals } from '@/lib/utils'

interface SpendingDonutChartProps {
  transactions: Transaction[]
}

const COLORS = [
  '#ef4444', // red - Food & Dining
  '#f97316', // orange - Transportation
  '#eab308', // yellow - Shopping
  '#06b6d4', // cyan - Entertainment
  '#ec4899', // pink - Healthcare
  '#8b5cf6', // purple - Utilities
  '#6366f1', // indigo - Salary (won't show in expenses)
  '#14b8a6', // teal - Freelance (won't show in expenses)
  '#3b82f6', // blue - Investment
]

export default function SpendingDonutChart({ transactions }: SpendingDonutChartProps) {
  const categoryTotals = calculateCategoryTotals(
    transactions.filter((tx) => tx.type === 'expense')
  )

  // Filter categories that have expenses and create chart data
  const chartData = Object.entries(categoryTotals)
    .filter(([_, amount]) => amount > 0)
    .map(([category, amount]) => ({
      name: category,
      value: amount,
    }))
    .sort((a, b) => b.value - a.value)

  const totalExpenses = chartData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="col-span-1 rounded-lg border border-amber-800 bg-amber-400/5 p-4 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-zinc-100 mb-2 md:mb-4">Spending by Category</h3>
      <p className="text-xs md:text-sm text-zinc-400 mb-4 md:mb-6">Donut chart</p>

      {chartData.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: '1px solid #3f3f46',
                  borderRadius: '8px',
                  color: '#fafafa',
                }}
                formatter={(value) => `$${typeof value === 'number' ? value.toLocaleString() : 0}`}
              />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {chartData.map((item, index) => {
              const percentage = totalExpenses > 0
                ? Math.round((item.value / totalExpenses) * 100)
                : 0
              return (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-zinc-400">
                    {item.name.split(' ')[0]} ({percentage}%)
                  </span>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <div className="h-64 flex items-center justify-center text-zinc-500">
          No expense data
        </div>
      )}
    </div>
  )
}
