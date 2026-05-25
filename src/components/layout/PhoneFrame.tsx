import { useTheme } from '../../context/ThemeContext'

interface PhoneFrameProps {
  children: React.ReactNode
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  const { isDark } = useTheme()

  return (
    <div className="min-h-screen w-full flex items-start justify-center py-8 px-4"
      style={{ background: isDark ? '#111111' : '#d1d5db' }}>
      <div
        className="relative w-full max-w-[430px] rounded-[48px] overflow-hidden shadow-2xl"
        style={{
          background: isDark ? '#18181B' : '#F4F4F5',
          minHeight: '844px',
          border: isDark ? '10px solid #27272A' : '10px solid #E4E4E7',
          boxShadow: isDark
            ? '0 40px 80px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.05)'
            : '0 40px 80px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(0,0,0,0.05)',
        }}
      >
        {/* Status bar notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-50 w-28 h-7 rounded-b-2xl"
          style={{ background: isDark ? '#27272A' : '#E4E4E7' }}
        />
        <div className="h-full">{children}</div>
      </div>
    </div>
  )
}
