import { cn } from '../../lib/utils'
import type { ClubCategory } from '../../data/types'

const categoryColors: Record<ClubCategory, string> = {
  Media:      'bg-[#E14535]/10 text-[#E14535] dark:bg-[#E14535]/20 dark:text-[#E14535]',
  Business:   'bg-[#F0F0F2] text-[#4A4B52] dark:bg-[#35363F] dark:text-[#B8B9C1]',
  Academic:   'bg-[#FFEDCF] text-[#E08E0F] dark:bg-[#FDA014]/20 dark:text-[#FFE3B3]',
  Arts:       'bg-[#FAE8E9] text-[#6F2F33] dark:bg-[#6F2F33]/20 dark:text-[#E8C5C8]',
  Sports:     'bg-[#5FC756]/10 text-[#5FC756] dark:bg-[#5FC756]/20 dark:text-[#5FC756]',
  Community:  'bg-[#FFEDCF] text-[#E08E0F] dark:bg-[#FDA014]/20 dark:text-[#FFE3B3]',
  Technology: 'bg-[#FDA014]/10 text-[#E08E0F] dark:bg-[#FDA014]/20 dark:text-[#FDA014]',
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
      <span className={cn(baseClass, 'bg-[#5FC756]/10 text-[#5FC756] dark:bg-[#5FC756]/20', className)}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#5FC756] pulse-dot" />
        {label}
      </span>
    )
  }

  if (variant === 'closed') {
    return (
      <span className={cn(baseClass, 'bg-[#E14535]/10 text-[#E14535] dark:bg-[#E14535]/20', className)}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#E14535]" />
        {label}
      </span>
    )
  }

  if (variant === 'success') {
    return <span className={cn(baseClass, 'bg-[#5FC756]/10 text-[#5FC756]', className)}>{label}</span>
  }

  if (variant === 'warning') {
    return <span className={cn(baseClass, 'bg-[#FDA014]/10 text-[#FDA014]', className)}>{label}</span>
  }

  return <span className={cn(baseClass, className)}>{label}</span>
}
