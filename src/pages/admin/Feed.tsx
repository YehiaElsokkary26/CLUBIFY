import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Edit2, X, Check, Image } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useToast } from '../../components/shared/Toast'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { announcements as initialAnnouncements } from '../../data/announcements'
import { cn } from '../../lib/utils'
import type { Announcement } from '../../data/types'

export function AdminFeed() {
  const { user } = useAuth()
  const { isDark } = useTheme()
  const { toast } = useToast()
  const [posts, setPosts] = useLocalStorage<Announcement[]>('admin_announcements', initialAnnouncements)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [audience, setAudience] = useState<'All' | 'Members'>('All')

  const resetForm = () => { setTitle(''); setBody(''); setImageUrl(''); setAudience('All'); setEditId(null); setShowForm(false) }

  const handleSubmit = () => {
    if (!title.trim() || !body.trim()) { toast('Title and body are required', 'error'); return }
    if (editId) {
      setPosts((prev) => prev.map((p) => p.id === editId ? { ...p, title, body, imageUrl: imageUrl || undefined, targetAudience: audience } : p))
      toast('Post updated!', 'success')
    } else {
      const newPost: Announcement = {
        id: `a${Date.now()}`,
        title, body,
        imageUrl: imageUrl || undefined,
        targetAudience: audience,
        clubId: 'c1',
        createdAt: new Date().toISOString(),
        author: user?.name || 'Admin',
      }
      setPosts((prev) => [newPost, ...prev])
      toast('Post published!', 'success')
    }
    resetForm()
  }

  const handleEdit = (post: Announcement) => {
    setTitle(post.title); setBody(post.body); setImageUrl(post.imageUrl || ''); setAudience(post.targetAudience); setEditId(post.id); setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id))
    toast('Post deleted', 'info')
  }

  const Input = ({ value, onChange, placeholder, textarea }: { value: string; onChange: (v: string) => void; placeholder: string; textarea?: boolean }) => {
    const cls = cn('w-full px-4 py-3 rounded-2xl text-sm outline-none border', isDark ? 'bg-[#2C2C2E] border-[#3A3A3C] text-white placeholder:text-gray-500' : 'bg-white border-gray-200 text-[#1C1C1E] placeholder:text-gray-400')
    return textarea
      ? <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={4} className={cn(cls, 'resize-none')} />
      : <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
  }

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#1C1C1E' : '#FAF8F5' }}>
      <div className={cn('sticky top-0 z-20 pt-12 pb-3 px-5', isDark ? 'bg-[#1C1C1E]' : 'bg-[#FAF8F5]')}>
        <div className="flex items-center justify-between mb-1">
          <h1 className={cn('text-2xl font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Feed Manager</h1>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowForm(true)}
            className="w-10 h-10 rounded-full bg-[#8B1A1A] flex items-center justify-center shadow-lg"
          >
            <Plus size={20} className="text-white" />
          </motion.button>
        </div>
        <p className={cn('text-xs', isDark ? 'text-gray-400' : 'text-gray-500')}>{posts.length} posts published</p>
      </div>

      {/* Post form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn('mx-5 mb-4 rounded-2xl p-5 shadow-md', isDark ? 'bg-[#2C2C2E]' : 'bg-white')}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={cn('text-sm font-bold', isDark ? 'text-white' : 'text-[#1C1C1E]')}>
                {editId ? 'Edit Post' : 'New Announcement'}
              </h3>
              <button onClick={resetForm}><X size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} /></button>
            </div>
            <div className="space-y-3">
              <Input value={title} onChange={setTitle} placeholder="Post title" />
              <Input value={body} onChange={setBody} placeholder="Write your announcement..." textarea />
              <div className="flex items-center gap-2">
                <Image size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                <Input value={imageUrl} onChange={setImageUrl} placeholder="Image URL (optional)" />
              </div>
              <div className="flex gap-2">
                <span className={cn('text-xs font-semibold self-center', isDark ? 'text-gray-400' : 'text-gray-500')}>Audience:</span>
                {(['All', 'Members'] as const).map((a) => (
                  <button
                    key={a}
                    onClick={() => setAudience(a)}
                    className={cn('px-3 py-1.5 rounded-xl text-xs font-semibold', audience === a ? 'bg-[#8B1A1A] text-white' : isDark ? 'bg-[#3A3A3C] text-gray-400' : 'bg-gray-100 text-gray-600')}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                className="w-full py-3 rounded-2xl bg-[#8B1A1A] text-white font-bold text-sm flex items-center justify-center gap-2"
              >
                <Check size={16} />
                {editId ? 'Update Post' : 'Publish'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts list */}
      <div className="px-5 space-y-3">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn('rounded-2xl p-4 shadow-sm', isDark ? 'bg-[#2C2C2E]' : 'bg-white')}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className={cn('text-sm font-bold flex-1', isDark ? 'text-white' : 'text-[#1C1C1E]')}>{post.title}</h4>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => handleEdit(post)} className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Edit2 size={13} className="text-blue-600" />
                </button>
                <button onClick={() => handleDelete(post.id)} className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center">
                  <Trash2 size={13} className="text-red-600" />
                </button>
              </div>
            </div>
            <p className={cn('text-xs leading-relaxed mb-2', isDark ? 'text-gray-400' : 'text-gray-500')}>{post.body}</p>
            {post.imageUrl && <img src={post.imageUrl} alt="post" className="w-full h-32 object-cover rounded-xl mb-2" loading="lazy" />}
            <div className="flex items-center gap-2">
              <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-semibold', post.targetAudience === 'All' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700')}>
                {post.targetAudience}
              </span>
              <span className={cn('text-[10px]', isDark ? 'text-gray-600' : 'text-gray-400')}>
                {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {post.author}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
