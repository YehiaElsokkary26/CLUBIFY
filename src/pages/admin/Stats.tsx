import { motion } from 'framer-motion'
import { Users, TrendingUp, UserPlus, ClipboardList } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../lib/utils'
import { clubs } from '../../data/clubs'

const adminClub = clubs[0]

const monthlyData = [
  { month: 'Jan', value: 22 },
  { month: 'Feb', value: 38 },
  { month: 'Mar', value: 55 },
  { month: 'Apr', value: 44 },
  { month: 'May', value: 72 },
  { month: 'Jun', value: 60 },
]

const funnelData = [
  { stage: 'Applied', count: 48, color: '#8B1A1A' },
  { stage: 'Interviewed', count: 32, color: '#E07B39' },
  { stage: 'Accepted', count: 18, color: '#2A8B3A' },
]

const maxMonth = Math.max(...monthlyData.map((d) => d.value))

export function AdminStats() {
  const { isDark } = useTheme()

  const StatCard = ({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: string | number; sub?: string; color: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('rounded-2xl p-4', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}15` }}>
        <div style={{ color }}>{icon}</div>
      </div>
      <p className={cn('text-2xl font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{value}</p>
      <p className={cn('text-xs mt-0.5', isDark ? 'text-gray-400' : 'text-gray-500')}>{label}</p>
      {sub && <p className="text-xs text-green-500 font-semibold mt-1">{sub}</p>}
    </motion.div>
  )

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#1C1C1E' : '#FAF8F5' }}>
      <div className={cn('pt-12 pb-4 px-5', isDark ? 'bg-[#1C1C1E]' : 'bg-[#FAF8F5]')}>
        <h1 className={cn('text-2xl font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Club Stats</h1>
        <p className={cn('text-xs mt-1', isDark ? 'text-gray-400' : 'text-gray-500')}>{adminClub.name} · Semester 2026</p>
      </div>

      <div className="px-5 space-y-5">
        {/* Quick stat cards 2x2 */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={<Users size={20} />} label="Total Members" value={adminClub.memberCount} sub="+12 this month" color="#8B1A1A" />
          <StatCard icon={<TrendingUp size={20} />} label="Active This Month" value={87} sub="61% engagement" color="#E07B39" />
          <StatCard icon={<UserPlus size={20} />} label="Open Recruitments" value={adminClub.isRecruiting ? 1 : 0} color="#2A8B3A" />
          <StatCard icon={<ClipboardList size={20} />} label="Pending Applications" value={48} sub="18 in interview" color="#4A4A8B" />
        </div>

        {/* Monthly Activity Bar Chart */}
        <div className={cn('rounded-2xl p-5', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}>
          <h3 className={cn('text-sm font-bold mb-4', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Monthly Activity</h3>
          <div className="flex items-end justify-between gap-2 h-32">
            {monthlyData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.value / maxMonth) * 100}%` }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="w-full rounded-t-xl min-h-[4px]"
                  style={{ background: d.month === 'May' ? '#8B1A1A' : isDark ? '#3A3A3C' : '#E5E5EA' }}
                />
                <span className={cn('text-[10px] font-semibold', isDark ? 'text-gray-500' : 'text-gray-400')}>{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Application Funnel */}
        <div className={cn('rounded-2xl p-5', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}>
          <h3 className={cn('text-sm font-bold mb-4', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Application Funnel</h3>
          <div className="space-y-3">
            {funnelData.map((f, i) => {
              const pct = Math.round((f.count / funnelData[0].count) * 100)
              return (
                <div key={f.stage}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={cn('text-xs font-semibold', isDark ? 'text-gray-300' : 'text-gray-600')}>{f.stage}</span>
                    <span className="text-xs font-black" style={{ color: f.color }}>{f.count}</span>
                  </div>
                  <div className={cn('h-3 rounded-full overflow-hidden', isDark ? 'bg-[#3A3A3C]' : 'bg-gray-100')}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: i * 0.15, duration: 0.6 }}
                      className="h-full rounded-full"
                      style={{ background: f.color }}
                    />
                  </div>
                  <p className={cn('text-[10px] mt-0.5', isDark ? 'text-gray-500' : 'text-gray-400')}>{pct}% of applicants</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top performers preview */}
        <div className={cn('rounded-2xl p-5', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}>
          <h3 className={cn('text-sm font-bold mb-3', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Top Committee Members</h3>
          {adminClub.members.map((m, i) => (
            <div key={m.id} className={cn('flex items-center gap-3 py-2.5 border-b last:border-0', isDark ? 'border-[#3A3A3C]' : 'border-gray-100')}>
              <span className={cn('text-xs font-bold w-4', isDark ? 'text-gray-500' : 'text-gray-400')}>#{i + 1}</span>
              <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full" />
              <div className="flex-1">
                <p className={cn('text-xs font-semibold', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{m.name}</p>
                <p className={cn('text-[10px]', isDark ? 'text-gray-400' : 'text-gray-500')}>{m.role}</p>
              </div>
              <span className="text-xs font-bold text-[#8B1A1A]">98%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
