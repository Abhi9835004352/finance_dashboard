'use client'

import { Transaction } from '@/types'
import { formatDate, formatCurrency, filterTransactions } from '@/lib/utils'
import { useFinanceStore } from '@/store/useFinanceStore'
import { useState } from 'react'
import { motion } from 'framer-motion'
import AddTransactionModal from './AddTransactionModal'

export default function TransactionTable() {
  const {
    transactions,
    role,
    searchQuery,
    filterType,
    filterCategory,
    sortBy,
    sortOrder,
    editTransaction,
    deleteTransaction,
  } = useFinanceStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  // Filter and sort transactions
  const filtered = filterTransactions(transactions, {
    searchQuery,
    filterType,
    filterCategory,
    sortBy,
    sortOrder,
  })

  const handleEdit = (tx: Transaction) => {
    if (role === 'admin') {
      setEditingTransaction(tx)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    if (role === 'admin') {
      deleteTransaction(id)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingTransaction(null)
  }

  const handleSaveTransaction = (transaction: Transaction) => {
    if (editingTransaction) {
      editTransaction(editingTransaction.id, transaction)
    }
    handleModalClose()
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <>
      {/* Table Container */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
        {filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-800/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                    Type
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-300">
                    Amount
                  </th>
                  {role === 'admin' && (
                    <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-300">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx, index) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors ${
                      index % 2 === 0 ? 'bg-zinc-900/50' : 'bg-zinc-900'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {formatDate(tx.date)}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-100 font-medium">
                      {tx.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {tx.category}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          tx.type === 'income'
                            ? 'bg-emerald-400/20 text-emerald-400'
                            : 'bg-red-400/20 text-red-400'
                        }`}
                      >
                        {tx.type === 'income' ? 'Income' : 'Expense'}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 text-sm font-semibold text-right ${
                        tx.type === 'income'
                          ? 'text-emerald-400'
                          : 'text-red-400'
                      }`}
                    >
                      {tx.type === 'income' ? '+' : '-'}
                      {formatCurrency(Math.abs(tx.amount))}
                    </td>
                    {role === 'admin' && (
                      <td className="px-6 py-4 text-sm text-right">
                        <div className="flex items-center justify-end gap-2">
                          <motion.button
                            onClick={() => handleEdit(tx)}
                            className="p-2 text-zinc-400 hover:text-emerald-400 transition-colors"
                            title="Edit"
                            whileHover={{ scale: 1.2 }}
                          >
                            ✏️
                          </motion.button>
                          <motion.button
                            onClick={() => handleDelete(tx.id)}
                            className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
                            title="Delete"
                            whileHover={{ scale: 1.2 }}
                          >
                            🗑️
                          </motion.button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty State */
          <div className="px-6 py-16 text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-2">
              No transactions found
            </h3>
            <p className="text-zinc-500">
              Try adjusting your filters or add a new transaction
            </p>
          </div>
        )}
      </div>

      {/* Floating Add Button (Admin Only) */}
      {role === 'admin' && (
        <motion.button
          onClick={() => {
            setEditingTransaction(null)
            setIsModalOpen(true)
          }}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 text-white font-bold shadow-lg hover:shadow-emerald-400/50 transition-all flex items-center justify-center text-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          +
        </motion.button>
      )}

      {/* Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveTransaction}
        editingTransaction={editingTransaction}
      />
    </>
  )
}
