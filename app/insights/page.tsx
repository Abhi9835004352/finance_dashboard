'use client'

import { useFinanceStore } from '@/store/useFinanceStore'
import {
  getMonthlyData,
  getTopSpendingCategory,
  getBiggestExpense,
  calculateSavingsRate,
  getSavingsRateColor,
  formatCurrency,
  formatDateLong,
} from '@/lib/utils'
import InsightCard from '@/components/insights/InsightCard'
import MonthlyComparisonChart from '@/components/insights/MonthlyComparisonChart'

type StatusColor = 'emerald' | 'amber' | 'red'

export default function InsightsPage() {
  const { transactions } = useFinanceStore()

  const monthlyData = getMonthlyData(transactions, 6)
  const topSpending = getTopSpendingCategory(transactions)
  const biggestExpense = getBiggestExpense(transactions)
  const savingsRate = calculateSavingsRate(transactions)

  const getSavingsRateStatusColor = (percentage: number): StatusColor => {
    if (percentage >= 20) return 'emerald'
    if (percentage >= 10) return 'amber'
    return 'red'
  }

  return (
    <div className="p-3 md:p-6 space-y-4 md:space-y-8">
      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
        {/* Top Spending Category */}
        {topSpending ? (
          <InsightCard
            title="Top Spending Category"
            value={formatCurrency(topSpending.total)}
            description={`${topSpending.category} • ${topSpending.percentage}% of total expenses`}
            icon="🏆"
            statusColor="red"
          />
        ) : (
          <InsightCard
            title="Top Spending Category"
            value="—"
            description="No expense data available"
            icon="🏆"
            statusColor="amber"
          />
        )}

        {/* Savings Rate */}
        <InsightCard
          title="Savings Rate"
          value={`${savingsRate}%`}
          description={
            savingsRate >= 20
              ? 'Great job! You\'re saving well.'
              : savingsRate >= 10
                ? 'Good savings rate. Keep it up!'
                : 'Consider increasing your savings.'
          }
          icon="💪"
          statusColor={getSavingsRateStatusColor(savingsRate)}
        />

        {/* Biggest Single Expense */}
        {biggestExpense ? (
          <InsightCard
            title="Biggest Single Expense"
            value={formatCurrency(biggestExpense.amount)}
            description={`${biggestExpense.description} • ${biggestExpense.category} • ${formatDateLong(biggestExpense.date)}`}
            icon="💸"
            statusColor="red"
          />
        ) : (
          <InsightCard
            title="Biggest Single Expense"
            value="—"
            description="No expense data available"
            icon="💸"
            statusColor="amber"
          />
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6">
        <MonthlyComparisonChart data={monthlyData} />
      </div>
    </div>
  )
}
