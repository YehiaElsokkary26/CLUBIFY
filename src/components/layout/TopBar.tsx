import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../lib/utils'

interface TopBarProps {
  title?: string
  showBack?: boolean
  right?: React.ReactNode
  transparent?: boolean
  className?: string
}

export function TopBar({ title, showBack, right, transparent, className }: TopBarProps) {
  const navigate = useNavigate()
  const { isDark } = useTheme()

  return (
    <div
      className={cn(
        'flex items-center justify-between px-5 pt-10 pb-3 z-30',
        transparent ? 'absolute top-0 left-0 right-0 bg-transparent' : '',
        !transparent && (isDark ? 'bg-[#272831]' : 'bg-[#F5F5F6]'),
        className
      )}
    >
      <div className="w-10">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className={cn(
              'flex items-center justify-center w-9 h-9 rounded-full transition-all',
              isDark ? 'bg-[#272831] text-white' : 'bg-[#FFFFFF] text-[#272831] shadow-sm'
            )}
          >
            <ArrowLeft size={18} />
          </button>
        )}
      </div>

      {title && (
        <h1
          className={cn(
            'text-base font-bold text-center flex-1 font-display tracking-wide',
            transparent ? 'text-white' : isDark ? 'text-white' : 'text-[#272831]'
          )}
        >
          {title}
        </h1>
      )}

      <div className="w-10 flex justify-end">{right}</div>
    </div>
  )
}
