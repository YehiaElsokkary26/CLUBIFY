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
        'flex items-center gap-3 px-4 py-3 rounded-2xl',
        isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm',
        className
      )}
    >
      <Search size={18} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'flex-1 bg-transparent text-sm outline-none',
          isDark ? 'text-white placeholder:text-gray-500' : 'text-[#1C1C1E] placeholder:text-gray-400'
        )}
      />
      {value && (
        <button onClick={() => onChange('')}>
          <X size={16} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
        </button>
      )}
    </div>
  )
}
