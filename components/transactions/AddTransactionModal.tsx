'use client'

import { useState, useEffect } from 'react'
import { Transaction, Category } from '@/types'

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

interface AddTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (transaction: Transaction) => void
  editingTransaction?: Transaction | null
}

export default function AddTransactionModal({
  isOpen,
  onClose,
  onSave,
  editingTransaction,
}: AddTransactionModalProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    type: 'expense' as 'income' | 'expense',
    category: 'Food & Dining' as Category,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        date: editingTransaction.date,
        description: editingTransaction.description,
        amount: editingTransaction.amount.toString(),
        type: editingTransaction.type,
        category: editingTransaction.category,
      })
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: '',
        amount: '',
        type: 'expense',
        category: 'Food & Dining',
      })
    }
    setErrors({})
  }, [isOpen, editingTransaction])

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    const amount = parseFloat(formData.amount)
    if (!formData.amount || isNaN(amount) || amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    const transaction: Transaction = {
      id: editingTransaction?.id || Date.now().toString(),
      date: formData.date,
      description: formData.description,
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
    }

    onSave(transaction)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        {/* Modal Content */}
        <div
          className="bg-zinc-900 rounded-lg border border-zinc-800 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-100">
              {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
            </h2>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-300 text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Description
              </label>
              <input
                type="text"
                placeholder="e.g., Grocery Store"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className={`w-full px-4 py-2 rounded-lg bg-zinc-800 border transition-colors text-zinc-100 placeholder-zinc-500 focus:outline-none ${errors.description
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-zinc-700 focus:border-emerald-400'
                  }`}
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Amount
              </label>
              <input
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className={`w-full px-4 py-2 rounded-lg bg-zinc-800 border transition-colors text-zinc-100 placeholder-zinc-500 focus:outline-none ${errors.amount
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-zinc-700 focus:border-emerald-400'
                  }`}
              />
              {errors.amount && (
                <p className="text-red-400 text-sm mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as 'income' | 'expense',
                  })
                }
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-emerald-400 transition-colors cursor-pointer"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as Category,
                  })
                }
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-emerald-400 transition-colors cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-500 text-white hover:from-emerald-300 hover:to-emerald-400 transition-all font-medium"
              >
                {editingTransaction ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
