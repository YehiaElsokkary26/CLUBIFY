import type { Announcement } from './types'

export const announcements: Announcement[] = [
  {
    id: 'a1',
    title: 'Welcome to Semester 2026!',
    body: 'We\'re thrilled to kick off a new semester. Check out all our upcoming events and recruitment openings. Big things are coming!',
    targetAudience: 'All',
    clubId: 'c1',
    createdAt: '2026-05-01T09:00:00',
    author: 'Sara Ahmed',
  },
  {
    id: 'a2',
    title: 'Campus Documentary is a Wrap!',
    body: 'After weeks of shooting, our annual campus documentary is complete. Watch the premiere at the Media Screening on June 15th.',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80',
    targetAudience: 'Members',
    clubId: 'c1',
    createdAt: '2026-05-10T11:00:00',
    author: 'Omar Khalil',
  },
  {
    id: 'a3',
    title: 'New Partnership with MBC!',
    body: 'GUC Media Club has officially partnered with MBC Group for a summer internship program. Members will be notified about application details.',
    targetAudience: 'Members',
    clubId: 'c1',
    createdAt: '2026-05-12T15:00:00',
    author: 'Sara Ahmed',
  },
]
