'use client'

import { useFinanceStore } from '@/store/useFinanceStore'
import {
  calculateBalance,
  calculateTotalIncome,
  calculateTotalExpenses,
  formatCurrency,
  getMonthlyData,
} from '@/lib/utils'
import SummaryCard from '@/components/dashboard/SummaryCard'
import BalanceTrendChart from '@/components/dashboard/BalanceTrendChart'
import SpendingDonutChart from '@/components/dashboard/SpendingDonutChart'

export default function DashboardPage() {
  const { transactions } = useFinanceStore()

  const balance = calculateBalance(transactions)
  const income = calculateTotalIncome(transactions)
  const expenses = calculateTotalExpenses(transactions)
  const monthlyData = getMonthlyData(transactions, 6)

  return (
    <div className="p-6 space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Balance"
          value={formatCurrency(balance)}
          icon="💰"
          variant="balance"
        />
        <SummaryCard
          title="Total Income"
          value={formatCurrency(income)}
          icon="📈"
          variant="income"
        />
        <SummaryCard
          title="Total Expenses"
          value={formatCurrency(expenses)}
          icon="📉"
          variant="expense"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BalanceTrendChart data={monthlyData} />
        <SpendingDonutChart transactions={transactions} />
      </div>
    </div>
  )
}
