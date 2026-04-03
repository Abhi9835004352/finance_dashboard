import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Transaction, Role, Category } from '@/types'
import { mockTransactions } from '@/data/mockData'

export interface FinanceStore {
  // Data
  transactions: Transaction[]

  // Role
  role: Role
  setRole: (role: Role) => void

  // Filters
  filterType: 'all' | 'income' | 'expense'
  filterCategory: Category | 'all'
  searchQuery: string
  sortBy: 'date' | 'amount'
  sortOrder: 'asc' | 'desc'

  // Filter setters
  setFilterType: (type: 'all' | 'income' | 'expense') => void
  setFilterCategory: (category: Category | 'all') => void
  setSearchQuery: (query: string) => void
  setSortBy: (field: 'date' | 'amount') => void
  toggleSortOrder: () => void

  // Admin actions
  addTransaction: (transaction: Transaction) => void
  editTransaction: (id: string, updated: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void

  // Reset store (for testing)
  resetStore: () => void
}

const getInitialState = () => ({
  transactions: mockTransactions,
  role: 'admin' as Role,
  filterType: 'all' as const,
  filterCategory: 'all' as const,
  searchQuery: '',
  sortBy: 'date' as const,
  sortOrder: 'desc' as const,
})

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set) => ({
      ...getInitialState(),

      setRole: (role) => set({ role }),

      setFilterType: (type) => set({ filterType: type }),

      setFilterCategory: (category) => set({ filterCategory: category }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setSortBy: (field) => set({ sortBy: field }),

      toggleSortOrder: () =>
        set((state) => ({
          sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
        })),

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),

      editTransaction: (id, updated) =>
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === id ? { ...tx, ...updated } : tx
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
        })),

      resetStore: () => set(getInitialState()),
    }),
    {
      name: 'finance-store',
      version: 1,
    }
  )
)
