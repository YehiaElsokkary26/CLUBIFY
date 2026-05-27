import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Edit2, X, Check, Image as ImageIcon, Paperclip, FileText, FileImage } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useToast } from '../../components/shared/Toast'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { announcements as initialAnnouncements } from '../../data/announcements'
import { cn } from '../../lib/utils'
import type { Announcement, PostAttachment } from '../../data/types'

const ALLOWED_EXT = ['pdf', 'png', 'jpg', 'jpeg']
const MAX_FILE_MB = 8

export function AdminFeed() {
  const { user } = useAuth()
  const { isDark } = useTheme()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [posts, setPosts] = useLocalStorage<Announcement[]>('admin_announcements', initialAnnouncements)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [audience, setAudience] = useState<'All' | 'Members'>('All')
  const [attachments, setAttachments] = useState<PostAttachment[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  const resetForm = () => {
    setTitle(''); setBody(''); setImageUrl(''); setAudience('All')
    setAttachments([]); setEditId(null); setShowForm(false)
  }

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    Array.from(files).forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || ''
      if (!ALLOWED_EXT.includes(ext)) {
        toast(`"${file.name}" rejected. Only PDF, PNG, JPG, JPEG allowed.`, 'error')
        return
      }
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        toast(`"${file.name}" is over ${MAX_FILE_MB}MB`, 'error')
        return
      }
      const reader = new FileReader()
      reader.onload = () => {
        const att: PostAttachment = {
          id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          name: file.name,
          type: ext === 'pdf' ? 'pdf' : 'image',
          mimeType: file.type,
          dataUrl: reader.result as string,
          size: file.size,
        }
        setAttachments((prev) => [...prev, att])
      }
      reader.readAsDataURL(file)
    })
    if (fileRef.current) fileRef.current.value = ''
  }

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id))
  }

  const handleSubmit = () => {
    if (!title.trim()) { toast('Heading is required', 'error'); return }
    if (!body.trim()) { toast('Description is required', 'error'); return }

    if (editId) {
      setPosts((prev) => prev.map((p) => p.id === editId ? {
        ...p, title, body,
        imageUrl: imageUrl || undefined,
        attachments: attachments.length ? attachments : undefined,
        targetAudience: audience,
      } : p))
      toast('Post updated!', 'success')
    } else {
      const newPost: Announcement = {
        id: `a${Date.now()}`,
        title, body,
        imageUrl: imageUrl || undefined,
        attachments: attachments.length ? attachments : undefined,
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
    setTitle(post.title); setBody(post.body)
    setImageUrl(post.imageUrl || '')
    setAudience(post.targetAudience)
    setAttachments(post.attachments || [])
    setEditId(post.id); setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id))
    toast('Post deleted', 'info')
  }

  const sizeKb = (b: number) => (b / 1024).toFixed(0)

  return (
    <div className="phone-scroll h-[844px] pb-24" style={{ background: isDark ? '#1E1B16' : '#F2EDDF' }}>
      <div className={cn('sticky top-0 z-20 pt-12 pb-3 px-5', isDark ? 'bg-[#1E1B16]' : 'bg-[#F2EDDF]')}>
        <div className="flex items-center justify-between mb-1">
          <h1 className={cn('text-2xl font-black font-display tracking-wide', isDark ? 'text-white' : 'text-[#1E1B16]')}>Feed Manager</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/admin/profile')}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#6F2F33]/30 shadow-sm"
              aria-label="My profile"
            >
              <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" />
            </button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowForm(true)}
              className="w-10 h-10 rounded-full bg-[#6F2F33] flex items-center justify-center shadow-lg"
              aria-label="New post"
            >
              <Plus size={20} className="text-white" />
            </motion.button>
          </div>
        </div>
        <p className={cn('text-xs font-body', isDark ? 'text-[#A8A09A]' : 'text-[#76706A]')}>
          {posts.length} post{posts.length !== 1 ? 's' : ''} published
        </p>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn('mx-5 mb-4 rounded-2xl p-5 shadow-md', isDark ? 'bg-[#23323F]' : 'bg-[#FAF6EA]')}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={cn('text-base font-black font-display tracking-wide', isDark ? 'text-white' : 'text-[#1E1B16]')}>
                {editId ? 'Edit Post' : 'New Post'}
              </h3>
              <button onClick={resetForm} className={cn('w-8 h-8 rounded-full flex items-center justify-center', isDark ? 'bg-[#2d3d4a]' : 'bg-[#EDE8D8]')}>
                <X size={14} className={isDark ? 'text-[#C8BFAF]' : 'text-[#5C5650]'} />
              </button>
            </div>

            <div className="space-y-4">
              {/* HEADING */}
              <div>
                <label className={cn('type-label mb-1.5 block', isDark ? 'text-[#A8A09A]' : 'text-[#76706A]')}>
                  Post heading
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Catchy title for your post"
                  maxLength={120}
                  className={cn(
                    'w-full px-4 py-3 rounded-xl text-base font-bold font-body outline-none border-2 transition-colors',
                    isDark
                      ? 'bg-[#2d3d4a] border-[#3a4d5a] text-white placeholder:text-[#76706A] focus:border-[#6F2F33]'
                      : 'bg-[#FAF6EA] border-[#D8D0BE] text-[#1E1B16] placeholder:text-[#A8A09A] focus:border-[#6F2F33]'
                  )}
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className={cn('type-label mb-1.5 block', isDark ? 'text-[#A8A09A]' : 'text-[#76706A]')}>
                  Post description
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Describe what's happening — details, dates, context..."
                  rows={5}
                  className={cn(
                    'w-full px-4 py-3 rounded-xl text-sm font-body outline-none border-2 resize-none transition-colors',
                    isDark
                      ? 'bg-[#2d3d4a] border-[#3a4d5a] text-white placeholder:text-[#76706A] focus:border-[#6F2F33]'
                      : 'bg-[#FAF6EA] border-[#D8D0BE] text-[#1E1B16] placeholder:text-[#A8A09A] focus:border-[#6F2F33]'
                  )}
                />
              </div>

              {/* COVER IMAGE URL (optional) */}
              <div>
                <label className={cn('type-label mb-1.5 flex items-center gap-1.5', isDark ? 'text-[#A8A09A]' : 'text-[#76706A]')}>
                  <ImageIcon size={11} /> Cover image URL <span className="font-normal lowercase">(optional)</span>
                </label>
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className={cn(
                    'w-full px-4 py-3 rounded-xl text-sm font-body outline-none border-2',
                    isDark
                      ? 'bg-[#2d3d4a] border-[#3a4d5a] text-white placeholder:text-[#76706A] focus:border-[#6F2F33]'
                      : 'bg-[#FAF6EA] border-[#D8D0BE] text-[#1E1B16] placeholder:text-[#A8A09A] focus:border-[#6F2F33]'
                  )}
                />
              </div>

              {/* ATTACHMENTS */}
              <div>
                <label className={cn('type-label mb-1.5 block', isDark ? 'text-[#A8A09A]' : 'text-[#76706A]')}>
                  Attachments <span className="font-normal lowercase">(pdf, png, jpg, jpeg · max {MAX_FILE_MB}MB each)</span>
                </label>
                <input
                  ref={fileRef}
                  type="file"
                  multiple
                  accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
                  onChange={(e) => handleFiles(e.target.files)}
                  className="hidden"
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  className={cn(
                    'w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed text-sm font-semibold font-body',
                    isDark ? 'border-[#3a4d5a] text-[#C8BFAF]' : 'border-[#C8BFAF] text-[#5C5650]'
                  )}
                >
                  <Paperclip size={14} />
                  Upload from device
                </button>

                {attachments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {attachments.map((a) => (
                      <div
                        key={a.id}
                        className={cn('flex items-center gap-3 px-3 py-2 rounded-xl', isDark ? 'bg-[#2d3d4a]' : 'bg-[#FAF6EA]')}
                      >
                        <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', a.type === 'pdf' ? 'bg-red-100' : 'bg-blue-100')}>
                          {a.type === 'pdf' ? <FileText size={16} className="text-red-600" /> : <FileImage size={16} className="text-blue-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn('text-xs font-semibold font-body truncate', isDark ? 'text-white' : 'text-[#1E1B16]')}>{a.name}</p>
                          <p className={cn('text-[10px] font-body', isDark ? 'text-[#76706A]' : 'text-[#A8A09A]')}>{sizeKb(a.size)} KB · {a.type.toUpperCase()}</p>
                        </div>
                        <button
                          onClick={() => removeAttachment(a.id)}
                          className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center"
                          aria-label="Remove attachment"
                        >
                          <X size={13} className="text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* AUDIENCE */}
              <div>
                <label className={cn('type-label mb-1.5 block', isDark ? 'text-[#A8A09A]' : 'text-[#76706A]')}>
                  Audience
                </label>
                <div className="flex gap-2">
                  {(['All', 'Members'] as const).map((a) => (
                    <button
                      key={a}
                      onClick={() => setAudience(a)}
                      className={cn(
                        'flex-1 py-2.5 rounded-xl text-xs font-bold font-body',
                        audience === a ? 'bg-[#6F2F33] text-white' : isDark ? 'bg-[#2d3d4a] text-[#A8A09A]' : 'bg-[#EDE8D8] text-[#5C5650]'
                      )}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                className="w-full py-3.5 rounded-2xl bg-[#6F2F33] text-white font-bold font-body text-sm flex items-center justify-center gap-2"
              >
                <Check size={16} />
                {editId ? 'Update Post' : 'Publish Post'}
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
            className={cn('rounded-2xl p-4 shadow-sm', isDark ? 'bg-[#23323F]' : 'bg-[#FAF6EA]')}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className={cn('text-sm font-bold font-body flex-1', isDark ? 'text-white' : 'text-[#1E1B16]')}>{post.title}</h4>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => handleEdit(post)} className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center" aria-label="Edit">
                  <Edit2 size={13} className="text-blue-600" />
                </button>
                <button onClick={() => handleDelete(post.id)} className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center" aria-label="Delete">
                  <Trash2 size={13} className="text-red-600" />
                </button>
              </div>
            </div>
            <p className={cn('text-xs leading-relaxed mb-2 font-body', isDark ? 'text-[#A8A09A]' : 'text-[#76706A]')}>{post.body}</p>
            {post.imageUrl && <img src={post.imageUrl} alt="post" className="w-full h-32 object-cover rounded-xl mb-2" loading="lazy" />}
            {post.attachments && post.attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {post.attachments.map((a) => (
                  <a
                    key={a.id}
                    href={a.dataUrl}
                    download={a.name}
                    className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold font-body', isDark ? 'bg-[#2d3d4a] text-[#C8BFAF]' : 'bg-[#EDE8D8] text-[#5C5650]')}
                  >
                    {a.type === 'pdf' ? <FileText size={11} /> : <FileImage size={11} />}
                    <span className="truncate max-w-[120px]">{a.name}</span>
                  </a>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-semibold font-body', post.targetAudience === 'All' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700')}>
                {post.targetAudience}
              </span>
              <span className={cn('text-[10px] font-mono', isDark ? 'text-[#5C5650]' : 'text-[#A8A09A]')}>
                {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {post.author}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
