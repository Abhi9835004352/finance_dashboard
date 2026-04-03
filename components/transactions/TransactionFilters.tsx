'use client'

import { useFinanceStore } from '@/store/useFinanceStore'
import { Category } from '@/types'

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

interface TransactionFiltersProps {
  onExport?: () => void
}

export default function TransactionFilters({ onExport }: TransactionFiltersProps) {
  const {
    searchQuery,
    filterType,
    filterCategory,
    sortBy,
    sortOrder,
    setSearchQuery,
    setFilterType,
    setFilterCategory,
    setSortBy,
    toggleSortOrder,
  } = useFinanceStore()

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="lg:col-span-1">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors"
          />
        </div>

        {/* Type Filter */}
        <div className="lg:col-span-1">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'all' | 'income' | 'expense')}
            className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-emerald-400 transition-colors cursor-pointer"
          >
            <option value="all">Type: All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="lg:col-span-1">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory((e.target.value as Category) || 'all')}
            className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-emerald-400 transition-colors cursor-pointer"
          >
            <option value="all">Category: All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="lg:col-span-1">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
            className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-emerald-400 transition-colors cursor-pointer"
          >
            <option value="date">Sort: Date</option>
            <option value="amount">Sort: Amount</option>
          </select>
        </div>

        {/* Sort Order + Export */}
        <div className="lg:col-span-1 flex gap-2">
          <button
            onClick={toggleSortOrder}
            className="flex-1 px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 hover:bg-zinc-700 transition-colors font-medium"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
          {onExport && (
            <button
              onClick={onExport}
              className="flex-1 px-4 py-2.5 rounded-lg bg-emerald-400/10 border border-emerald-800 text-emerald-400 hover:bg-emerald-400/20 transition-colors font-medium"
              title="Export as CSV"
            >
              📥
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="flex flex-wrap gap-2 text-sm">
        {searchQuery && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
            <span>🔍 "{searchQuery}"</span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-zinc-500 hover:text-zinc-300"
            >
              ✕
            </button>
          </div>
        )}
        {filterType !== 'all' && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
            <span>{filterType}</span>
            <button
              onClick={() => setFilterType('all')}
              className="text-zinc-500 hover:text-zinc-300"
            >
              ✕
            </button>
          </div>
        )}
        {filterCategory !== 'all' && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
            <span>{filterCategory}</span>
            <button
              onClick={() => setFilterCategory('all')}
              className="text-zinc-500 hover:text-zinc-300"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
