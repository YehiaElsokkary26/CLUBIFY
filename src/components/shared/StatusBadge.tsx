import { cn } from '../../lib/utils'
import type { ClubCategory } from '../../data/types'

const categoryColors: Record<ClubCategory, string> = {
  Media:      'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  Business:   'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Academic:   'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Arts:       'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  Sports:     'bg-[#6E8B5A]/10 text-[#6E8B5A] dark:bg-[#6E8B5A]/20 dark:text-[#6E8B5A]',
  Community:  'bg-[#fae8e9] text-[#6F2F33] dark:bg-[#6F2F33]/20 dark:text-[#e8c5c8]',
  Technology: 'bg-[#6F2F33]/10 text-[#6F2F33] dark:bg-[#6F2F33]/20 dark:text-[#6F2F33]',
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
      <span className={cn(baseClass, 'bg-[#6E8B5A]/10 text-[#6E8B5A] dark:bg-[#6E8B5A]/20', className)}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#6E8B5A] pulse-dot" />
        {label}
      </span>
    )
  }

  if (variant === 'closed') {
    return (
      <span className={cn(baseClass, 'bg-[#C75A6B]/10 text-[#C75A6B] dark:bg-[#C75A6B]/20', className)}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#C75A6B]" />
        {label}
      </span>
    )
  }

  if (variant === 'success') {
    return <span className={cn(baseClass, 'bg-[#6E8B5A]/10 text-[#6E8B5A]', className)}>{label}</span>
  }

  if (variant === 'warning') {
    return <span className={cn(baseClass, 'bg-[#C99B2E]/10 text-[#C99B2E]', className)}>{label}</span>
  }

  return <span className={cn(baseClass, className)}>{label}</span>
}
