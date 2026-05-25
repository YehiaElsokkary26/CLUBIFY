import { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react'
import { cn } from '../../lib/utils'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[390px] px-4 space-y-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl pointer-events-auto font-body',
                t.type === 'success' && 'bg-[#27272A] text-white',
                t.type === 'error'   && 'bg-[#DC2626] text-white',
                t.type === 'info'    && 'bg-[#0891B2] text-white'
              )}
            >
              {t.type === 'success' && <CheckCircle size={18} className="text-[#059669] flex-shrink-0" />}
              {t.type === 'error'   && <AlertCircle size={18} className="flex-shrink-0" />}
              {t.type === 'info'    && <Info        size={18} className="flex-shrink-0" />}
              <span className="text-sm font-medium flex-1">{t.message}</span>
              <button
                onClick={() => setToasts((prev) => prev.filter((tt) => tt.id !== t.id))}
                className="opacity-60 hover:opacity-100"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be inside ToastProvider')
  return ctx
}
