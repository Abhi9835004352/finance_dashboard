import { Transaction, Category, MonthlySummary } from '@/types'

/**
 * Format a number as USD currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format a currency with cents
 */
export const formatCurrencyWithCents = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

/**
 * Format an ISO date string to a readable format (e.g., "Mar 15")
 */
export const formatDate = (isoString: string): string => {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/**
 * Format an ISO date string to full format (e.g., "Mar 15, 2025")
 */
export const formatDateLong = (isoString: string): string => {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Format an ISO date string to month-year (e.g., "Mar 2025")
 */
export const formatDateMonth = (isoString: string): string => {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

/**
 * Parse ISO date to get month abbreviation (e.g., "Mar")
 */
export const getMonthAbbr = (isoString: string): string => {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', { month: 'short' })
}

/**
 * Calculate total balance (income - expenses)
 */
export const calculateBalance = (transactions: Transaction[]): number => {
  return transactions.reduce((sum, tx) => {
    return tx.type === 'income' ? sum + tx.amount : sum - tx.amount
  }, 0)
}

/**
 * Calculate total income
 */
export const calculateTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0)
}

/**
 * Calculate total expenses
 */
export const calculateTotalExpenses = (transactions: Transaction[]): number => {
  return transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)
}

/**
 * Get expenses grouped by category with totals
 */
export const calculateCategoryTotals = (
  transactions: Transaction[]
): Record<Category, number> => {
  const categories: Category[] = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Healthcare',
    'Utilities',
    'Salary',
    'Freelance',
    'Investment',
  ]

  const totals: Record<Category, number> = {} as Record<Category, number>

  categories.forEach((cat) => {
    totals[cat] = transactions
      .filter((tx) => tx.category === cat)
      .reduce((sum, tx) => sum + tx.amount, 0)
  })

  return totals
}

/**
 * Get monthly summaries for the last N months
 */
export const getMonthlyData = (
  transactions: Transaction[],
  months: number = 6
): MonthlySummary[] => {
  // Get all unique months from transactions
  const monthSet = new Set<string>()
  transactions.forEach((tx) => {
    const date = new Date(tx.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    monthSet.add(monthKey)
  })

  // Sort months
  const sortedMonths = Array.from(monthSet).sort()

  // Get the last N months
  const relevantMonths = sortedMonths.slice(-months)

  // Build monthly summaries
  return relevantMonths.map((monthKey) => {
    const [year, month] = monthKey.split('-')
    const monthDate = new Date(parseInt(year), parseInt(month) - 1, 1)
    const monthName = monthDate.toLocaleDateString('en-US', { month: 'short' })

    const monthTransactions = transactions.filter((tx) => {
      const txDate = new Date(tx.date)
      return (
        txDate.getFullYear() === parseInt(year) &&
        txDate.getMonth() === parseInt(month) - 1
      )
    })

    const income = monthTransactions
      .filter((tx) => tx.type === 'income')
      .reduce((sum, tx) => sum + tx.amount, 0)

    const expenses = monthTransactions
      .filter((tx) => tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0)

    // Calculate cumulative balance for trend
    const allPreviousAndCurrent = transactions.filter((tx) => {
      const txDate = new Date(tx.date)
      const currentDate = new Date(parseInt(year), parseInt(month) - 1, 31)
      return txDate <= currentDate
    })

    const balance = calculateBalance(allPreviousAndCurrent)

    return {
      month: monthName,
      income,
      expenses,
      balance,
    }
  })
}

/**
 * Filter and sort transactions
 */
export const filterTransactions = (
  transactions: Transaction[],
  {
    searchQuery = '',
    filterType = 'all',
    filterCategory = 'all',
    sortBy = 'date',
    sortOrder = 'desc',
  }: {
    searchQuery?: string
    filterType?: 'all' | 'income' | 'expense'
    filterCategory?: string
    sortBy?: 'date' | 'amount'
    sortOrder?: 'asc' | 'desc'
  }
): Transaction[] => {
  let filtered = [...transactions]

  // Filter by search query (searches description)
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase()
    filtered = filtered.filter((tx) =>
      tx.description.toLowerCase().includes(query)
    )
  }

  // Filter by type
  if (filterType !== 'all') {
    filtered = filtered.filter((tx) => tx.type === filterType)
  }

  // Filter by category
  if (filterCategory !== 'all') {
    filtered = filtered.filter((tx) => tx.category === filterCategory)
  }

  // Sort
  filtered.sort((a, b) => {
    let comparison = 0

    if (sortBy === 'date') {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
    } else if (sortBy === 'amount') {
      comparison = a.amount - b.amount
    }

    return sortOrder === 'asc' ? comparison : -comparison
  })

  return filtered
}

/**
 * Get the top spending category
 */
export const getTopSpendingCategory = (
  transactions: Transaction[]
): { category: Category; total: number; percentage: number } | null => {
  const expenseTransactions = transactions.filter((tx) => tx.type === 'expense')

  if (expenseTransactions.length === 0) {
    return null
  }

  const categoryTotals = calculateCategoryTotals(expenseTransactions)
  const totalExpenses = calculateTotalExpenses(expenseTransactions)

  let topCategory: Category | null = null
  let topAmount = 0

  Object.entries(categoryTotals).forEach(([category, amount]) => {
    if (amount > topAmount) {
      topAmount = amount
      topCategory = category as Category
    }
  })

  if (!topCategory) {
    return null
  }

  return {
    category: topCategory,
    total: topAmount,
    percentage:
      totalExpenses > 0 ? Math.round((topAmount / totalExpenses) * 100) : 0,
  }
}

/**
 * Get the biggest single expense
 */
export const getBiggestExpense = (
  transactions: Transaction[]
): Transaction | null => {
  const expenses = transactions.filter((tx) => tx.type === 'expense')

  if (expenses.length === 0) {
    return null
  }

  return expenses.reduce((max, tx) => (tx.amount > max.amount ? tx : max))
}

/**
 * Calculate savings rate
 */
export const calculateSavingsRate = (transactions: Transaction[]): number => {
  const income = calculateTotalIncome(transactions)
  const expenses = calculateTotalExpenses(transactions)

  if (income === 0) {
    return 0
  }

  return Math.round(((income - expenses) / income) * 100)
}

/**
 * Get savings rate color based on percentage
 */
export const getSavingsRateColor = (
  percentage: number
): 'text-emerald-400' | 'text-amber-400' | 'text-red-400' => {
  if (percentage >= 20) {
    return 'text-emerald-400'
  } else if (percentage >= 10) {
    return 'text-amber-400'
  } else {
    return 'text-red-400'
  }
}

/**
 * Get the background color for savings rate
 */
export const getSavingsRateBgColor = (
  percentage: number
): 'bg-emerald-400/10' | 'bg-amber-400/10' | 'bg-red-400/10' => {
  if (percentage >= 20) {
    return 'bg-emerald-400/10'
  } else if (percentage >= 10) {
    return 'bg-amber-400/10'
  } else {
    return 'bg-red-400/10'
  }
}

/**
 * Generate a CSV string from transactions
 */
export const generateCSV = (transactions: Transaction[]): string => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount']
  const rows = transactions.map((tx) => [
    formatDateLong(tx.date),
    `"${tx.description}"`,
    tx.category,
    tx.type,
    formatCurrencyWithCents(tx.amount),
  ])

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join(
    '\n'
  )

  return csvContent
}

/**
 * Download CSV file
 */
export const downloadCSV = (csvContent: string, filename: string = 'transactions.csv') => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Generate CSV filename with current date
 */
export const generateCSVFilename = (): string => {
  const today = new Date().toISOString().split('T')[0]
  return `transactions_${today}.csv`
}
