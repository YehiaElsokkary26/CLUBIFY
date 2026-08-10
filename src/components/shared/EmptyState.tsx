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
            isDark ? 'bg-[#272831]' : 'bg-[#F5F5F6]'
          )}
        >
          {icon}
        </div>
      )}
      <h3 className={cn('text-lg font-bold mb-2 font-display tracking-wide', isDark ? 'text-white' : 'text-[#272831]')}>{title}</h3>
      {description && (
        <p className={cn('text-sm leading-relaxed mb-6 font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>{description}</p>
      )}
      {action}
    </div>
  )
}
