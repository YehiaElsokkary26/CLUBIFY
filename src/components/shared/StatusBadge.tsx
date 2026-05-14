import { cn } from '../../lib/utils'
import type { ClubCategory } from '../../data/types'

const categoryColors: Record<ClubCategory, string> = {
  Media: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  Business: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Academic: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Arts: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  Sports: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Community: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  Technology: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
}

interface StatusBadgeProps {
  label: string
  variant?: 'category' | 'recruiting' | 'closed' | 'success' | 'warning'
  category?: ClubCategory
  className?: string
}

export function StatusBadge({ label, variant = 'category', category, className }: StatusBadgeProps) {
  const baseClass = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold'

  if (variant === 'category' && category) {
    return <span className={cn(baseClass, categoryColors[category], className)}>{label}</span>
  }

  if (variant === 'recruiting') {
    return (
      <span className={cn(baseClass, 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300', className)}>
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 pulse-dot" />
        {label}
      </span>
    )
  }

  if (variant === 'closed') {
    return (
      <span className={cn(baseClass, 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300', className)}>
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        {label}
      </span>
    )
  }

  if (variant === 'success') {
    return <span className={cn(baseClass, 'bg-green-100 text-green-700', className)}>{label}</span>
  }

  if (variant === 'warning') {
    return <span className={cn(baseClass, 'bg-amber-100 text-amber-700', className)}>{label}</span>
  }

  return <span className={cn(baseClass, className)}>{label}</span>
}
