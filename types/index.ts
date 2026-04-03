export type Role = 'admin' | 'viewer'

export type Category =
  | 'Food & Dining'
  | 'Transportation'
  | 'Shopping'
  | 'Entertainment'
  | 'Healthcare'
  | 'Utilities'
  | 'Salary'
  | 'Freelance'
  | 'Investment'

export interface Transaction {
  id: string
  date: string // ISO string e.g. "2024-03-15"
  description: string
  amount: number // always positive
  type: 'income' | 'expense'
  category: Category
}

export interface MonthlySummary {
  month: string // e.g. "Jan"
  income: number
  expenses: number
  balance: number
}
