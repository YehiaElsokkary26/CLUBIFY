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
          : 'bg-[#FFFFFF] border-[#C8E0D0] shadow-sm',
        className
      )}
    >
      <Search size={18} className="text-[#1A5E3A]" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'flex-1 bg-transparent text-sm outline-none font-body',
          isDark ? 'text-white placeholder:text-[#6A7870]' : 'text-[#0D1A12] placeholder:text-[#9AB0A0]'
        )}
      />
      {value && (
        <button onClick={() => onChange('')}>
          <X size={16} className={isDark ? 'text-[#6A7870]' : 'text-[#9AB0A0]'} />
        </button>
      )}
    </div>
  )
}
