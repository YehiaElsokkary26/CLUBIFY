import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../lib/utils'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  const { isDark } = useTheme()

  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-8 text-center', className)}>
      {icon && (
        <div
          className={cn(
            'w-20 h-20 rounded-3xl flex items-center justify-center mb-5',
            isDark ? 'bg-[#2C2C2E]' : 'bg-[#F0EDE8]'
          )}
        >
          {icon}
        </div>
      )}
      <h3 className={cn('text-lg font-bold mb-2', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{title}</h3>
      {description && (
        <p className={cn('text-sm leading-relaxed mb-6', isDark ? 'text-gray-400' : 'text-gray-500')}>{description}</p>
      )}
      {action}
    </div>
  )
}
