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
          ? 'bg-[#27272A] border-[#3F3F46]'
          : 'bg-white border-[#D4D4D8] shadow-sm',
        className
      )}
    >
      <Search size={18} className="text-[#0891B2]" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'flex-1 bg-transparent text-sm outline-none font-body',
          isDark ? 'text-white placeholder:text-zinc-500' : 'text-[#27272A] placeholder:text-zinc-400'
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
