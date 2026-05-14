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
          background: isDark ? '#1C1C1E' : '#FAF8F5',
          minHeight: '844px',
          border: isDark ? '10px solid #2C2C2E' : '10px solid #E5E5EA',
          boxShadow: isDark
            ? '0 40px 80px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.05)'
            : '0 40px 80px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(0,0,0,0.05)',
        }}
      >
        {/* Status bar notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-50 w-28 h-7 rounded-b-2xl"
          style={{ background: isDark ? '#2C2C2E' : '#E5E5EA' }}
        />
        <div className="h-full">{children}</div>
      </div>
    </div>
  )
}
