import { Search, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../lib/utils'

interface SearchBarProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
}

export function SearchBar({ value, onChange, placeholder = 'Search...', className }: SearchBarProps) {
  const { isDark } = useTheme()

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-2xl border',
        isDark
          ? 'bg-[#272831] border-[#35363F]'
          : 'bg-[#FFFFFF] border-[#E5E5E8] shadow-sm',
        className
      )}
    >
      <Search size={18} className="text-[#FDA014]" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'flex-1 bg-transparent text-sm outline-none font-body',
          isDark ? 'text-white placeholder:text-[#929397]' : 'text-[#272831] placeholder:text-[#929397]'
        )}
      />
      {value && (
        <button onClick={() => onChange('')}>
          <X size={16} className={isDark ? 'text-[#929397]' : 'text-[#929397]'} />
        </button>
      )}
    </div>
  )
}
