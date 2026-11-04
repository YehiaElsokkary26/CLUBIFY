import { motion } from 'framer-motion'
import { Users, TrendingUp, UserPlus, ClipboardList, CheckCircle, XCircle } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import { cn } from '../../lib/utils'
import { getClub, getApplications, updateApplicationStatus } from '../../lib/db'
import { useState } from 'react'
import type { Application } from '../../lib/db'

const monthlyData = [
  { month: 'Jan', value: 22 },
  { month: 'Feb', value: 38 },
  { month: 'Mar', value: 55 },
  { month: 'Apr', value: 44 },
  { month: 'May', value: 72 },
  { month: 'Jun', value: 60 },
]

const maxMonth = Math.max(...monthlyData.map((d) => d.value))

export function AdminStats() {
  const { isDark } = useTheme()
  const { user } = useAuth()
  const adminClub = getClub(user?.managedClubId ?? '') ?? undefined
  const [apps, setApps] = useState<Application[]>(() => getApplications(adminClub?.id))

  const refreshApps = () => setApps(getApplications(adminClub?.id))

  const pending = apps.filter((a) => a.status === 'pending')
  const interviewed = apps.filter((a) => a.status === 'interview_scheduled')
  const accepted = apps.filter((a) => a.status === 'accepted')

  const funnelData = [
    { stage: 'Applied', count: apps.length, color: '#1A5E3A' },
    { stage: 'Interviewed', count: interviewed.length + accepted.length, color: '#C99B2E' },
    { stage: 'Accepted', count: accepted.length, color: '#6E8B5A' },
  ]
  const funnelMax = Math.max(funnelData[0].count, 1)

  const handleDecision = (appId: string, decision: 'accepted' | 'rejected') => {
    updateApplicationStatus(appId, decision)
    refreshApps()
  }

  const StatCard = ({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: string | number; sub?: string; color: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('rounded-2xl p-4', isDark ? 'bg-[#23323F]' : 'bg-[#FFFFFF] shadow-sm')}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}15` }}>
        <div style={{ color }}>{icon}</div>
      </div>
      <p className={cn('text-2xl font-black font-display', isDark ? 'text-white' : 'text-[#0D1A12]')}>{value}</p>
      <p className={cn('text-xs mt-0.5 font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>{label}</p>
      {sub && <p className="text-xs text-[#6E8B5A] font-semibold font-body mt-1">{sub}</p>}
    </motion.div>
  )

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#0D1A12' : '#F4FBF6' }}>
      <div className={cn('pt-12 pb-4 px-5', isDark ? 'bg-[#0D1A12]' : 'bg-[#F4FBF6]')}>
        <h1 className={cn('text-2xl font-black font-display tracking-wide', isDark ? 'text-white' : 'text-[#0D1A12]')}>Club Stats</h1>
        <p className={cn('text-xs mt-1 font-mono', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>{adminClub?.name ?? '—'} · Semester 2026</p>
      </div>

      <div className="px-5 space-y-5">
        {/* Quick stat cards 2x2 */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={<Users size={20} />} label="Total Members" value={adminClub?.memberCount ?? 0} color="#1A5E3A" />
          <StatCard icon={<TrendingUp size={20} />} label="Total Applications" value={apps.length} sub={`${accepted.length} accepted`} color="#C99B2E" />
          <StatCard icon={<UserPlus size={20} />} label="Open Recruitments" value={adminClub?.isRecruiting ? 1 : 0} color="#6E8B5A" />
          <StatCard icon={<ClipboardList size={20} />} label="Pending Review" value={pending.length} sub={`${interviewed.length} in interview`} color="#7C3AED" />
        </div>

        {/* Monthly Activity Bar Chart */}
        <div className={cn('rounded-2xl p-5', isDark ? 'bg-[#23323F]' : 'bg-[#FFFFFF] shadow-sm')}>
          <h3 className={cn('text-sm font-bold font-display tracking-wide mb-4', isDark ? 'text-white' : 'text-[#0D1A12]')}>Monthly Activity</h3>
          <div className="flex items-end justify-between gap-2 h-32">
            {monthlyData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.value / maxMonth) * 100}%` }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="w-full rounded-t-xl min-h-[4px]"
                  style={{ background: d.month === 'May' ? '#1A5E3A' : isDark ? '#2d3d4a' : '#DDEEE6' }}
                />
                <span className={cn('text-[10px] font-mono', isDark ? 'text-[#6A7870]' : 'text-[#9AB0A0]')}>{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Application Funnel */}
        <div className={cn('rounded-2xl p-5', isDark ? 'bg-[#23323F]' : 'bg-[#FFFFFF] shadow-sm')}>
          <h3 className={cn('text-sm font-bold font-display tracking-wide mb-4', isDark ? 'text-white' : 'text-[#0D1A12]')}>Application Funnel</h3>
          <div className="space-y-3">
            {funnelData.map((f, i) => {
              const pct = Math.round((f.count / funnelMax) * 100)
              return (
                <div key={f.stage}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={cn('text-xs font-semibold font-body', isDark ? 'text-[#C0D4C8]' : 'text-[#5C5650]')}>{f.stage}</span>
                    <span className="text-xs font-black font-display" style={{ color: f.color }}>{f.count}</span>
                  </div>
                  <div className={cn('h-3 rounded-full overflow-hidden', isDark ? 'bg-[#2d3d4a]' : 'bg-[#EEF7F2]')}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: i * 0.15, duration: 0.6 }}
                      className="h-full rounded-full"
                      style={{ background: f.color }}
                    />
                  </div>
                  <p className={cn('text-[10px] mt-0.5 font-body', isDark ? 'text-[#6A7870]' : 'text-[#9AB0A0]')}>{pct}% of applicants</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pending Application Review */}
        <div className={cn('rounded-2xl p-5', isDark ? 'bg-[#23323F]' : 'bg-[#FFFFFF] shadow-sm')}>
          <h3 className={cn('text-sm font-bold font-display tracking-wide mb-3', isDark ? 'text-white' : 'text-[#0D1A12]')}>
            Pending Applications
            {pending.length > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-[10px] font-black font-body">
                {pending.length}
              </span>
            )}
          </h3>
          {pending.length === 0 ? (
            <p className={cn('text-xs font-body text-center py-4', isDark ? 'text-[#6A7870]' : 'text-[#9AB0A0]')}>
              No pending applications
            </p>
          ) : (
            <div className="space-y-3">
              {pending.map((app) => (
                <div key={app.id} className={cn('p-3 rounded-xl', isDark ? 'bg-[#2d3d4a]' : 'bg-[#F4FBF6]')}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className={cn('text-xs font-bold font-body truncate', isDark ? 'text-white' : 'text-[#0D1A12]')}>{app.studentName}</p>
                      <p className={cn('text-[10px] font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>{app.committeeName}</p>
                    </div>
                    <span className="text-[10px] font-mono text-[#9AB0A0] flex-shrink-0">
                      {new Date(app.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDecision(app.id, 'accepted')}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl bg-[#1A5E3A]/10 text-[#1A5E3A] text-[11px] font-bold font-body"
                    >
                      <CheckCircle size={12} /> Accept
                    </button>
                    <button
                      onClick={() => handleDecision(app.id, 'rejected')}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl bg-red-50 text-red-500 text-[11px] font-bold font-body"
                    >
                      <XCircle size={12} /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top performers preview */}
        {adminClub && adminClub.members.length > 0 && (
          <div className={cn('rounded-2xl p-5', isDark ? 'bg-[#23323F]' : 'bg-[#FFFFFF] shadow-sm')}>
            <h3 className={cn('text-sm font-bold font-display tracking-wide mb-3', isDark ? 'text-white' : 'text-[#0D1A12]')}>Top Committee Members</h3>
            {adminClub.members.map((m, i) => (
              <div key={m.id} className={cn('flex items-center gap-3 py-2.5 border-b last:border-0', isDark ? 'border-[#2d3d4a]' : 'border-[#DDEEE6]')}>
                <span className={cn('text-xs font-bold font-body w-4', isDark ? 'text-[#6A7870]' : 'text-[#9AB0A0]')}>#{i + 1}</span>
                <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full" />
                <div className="flex-1">
                  <p className={cn('text-xs font-semibold font-body', isDark ? 'text-white' : 'text-[#0D1A12]')}>{m.name}</p>
                  <p className={cn('text-[10px] font-body', isDark ? 'text-[#9AB0A0]' : 'text-[#6A7870]')}>{m.role}</p>
                </div>
                <span className="text-xs font-bold font-body text-[#1A5E3A]">98%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
