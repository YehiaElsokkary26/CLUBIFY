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
          ? 'bg-[#23323F] border-[#2d3d4a]'
          : 'bg-[#FAF6EA] border-[#D8D0BE] shadow-sm',
        className
      )}
    >
      <Search size={18} className="text-[#6F2F33]" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'flex-1 bg-transparent text-sm outline-none font-body',
          isDark ? 'text-white placeholder:text-zinc-500' : 'text-[#1E1B16] placeholder:text-zinc-400'
        )}
      />
      {value && (
        <button onClick={() => onChange('')}>
          <X size={16} className={isDark ? 'text-zinc-500' : 'text-zinc-400'} />
        </button>
      )}
    </div>
  )
}
