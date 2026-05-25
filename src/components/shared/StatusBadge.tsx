import { cn } from '../../lib/utils'
import type { ClubCategory } from '../../data/types'

const categoryColors: Record<ClubCategory, string> = {
  Media:      'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  Business:   'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Academic:   'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Arts:       'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  Sports:     'bg-[#059669]/10 text-[#059669] dark:bg-[#059669]/20 dark:text-[#059669]',
  Community:  'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  Technology: 'bg-[#0891B2]/10 text-[#0891B2] dark:bg-[#0891B2]/20 dark:text-[#0891B2]',
}

interface StatusBadgeProps {
  label: string
  variant?: 'category' | 'recruiting' | 'closed' | 'success' | 'warning'
  category?: ClubCategory
  className?: string
}

export function StatusBadge({ label, variant = 'category', category, className }: StatusBadgeProps) {
  const baseClass = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-display tracking-wider uppercase'

  if (variant === 'category' && category) {
    return <span className={cn(baseClass, categoryColors[category], className)}>{label}</span>
  }

  if (variant === 'recruiting') {
    return (
      <span className={cn(baseClass, 'bg-[#059669]/10 text-[#059669] dark:bg-[#059669]/20', className)}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#059669] pulse-dot" />
        {label}
      </span>
    )
  }

  if (variant === 'closed') {
    return (
      <span className={cn(baseClass, 'bg-[#DC2626]/10 text-[#DC2626] dark:bg-[#DC2626]/20', className)}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
        {label}
      </span>
    )
  }

  if (variant === 'success') {
    return <span className={cn(baseClass, 'bg-[#059669]/10 text-[#059669]', className)}>{label}</span>
  }

  if (variant === 'warning') {
    return <span className={cn(baseClass, 'bg-[#D97706]/10 text-[#D97706]', className)}>{label}</span>
  }

  return <span className={cn(baseClass, className)}>{label}</span>
}
