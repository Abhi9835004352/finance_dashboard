'use client'

import { useFinanceStore } from '@/store/useFinanceStore'
import { filterTransactions, generateCSV, downloadCSV, generateCSVFilename } from '@/lib/utils'
import TransactionFilters from '@/components/transactions/TransactionFilters'
import TransactionTable from '@/components/transactions/TransactionTable'

export default function TransactionsPage() {
  const { transactions, searchQuery, filterType, filterCategory, sortBy, sortOrder } =
    useFinanceStore()

  const handleExport = () => {
    const filtered = filterTransactions(transactions, {
      searchQuery,
      filterType,
      filterCategory,
      sortBy,
      sortOrder,
    })

    const csv = generateCSV(filtered)
    const filename = generateCSVFilename()
    downloadCSV(csv, filename)
  }

  return (
    <div className="p-3 md:p-6 space-y-3 md:space-y-6">
      <TransactionFilters onExport={handleExport} />
      <TransactionTable />
    </div>
  )
}
