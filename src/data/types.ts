export type ClubCategory =
  | 'Media'
  | 'Business'
  | 'Academic'
  | 'Arts'
  | 'Sports'
  | 'Community'
  | 'Technology'

export interface SocialLinks {
  instagram?: string
  facebook?: string
  linkedin?: string
  tiktok?: string
  website?: string
}

export interface Committee {
  id: string
  name: string
  description: string
  spotsAvailable: number
}

export interface ClubMember {
  id: string
  name: string
  role: string
  avatar: string
  isMonthStar?: boolean
  quote?: string
}

export interface ClubEvent {
  id: string
  clubId: string
  title: string
  date: string
  time: string
  location: string
  description: string
  type: 'Workshop' | 'Social' | 'Competition' | 'Meeting' | 'Talk'
  image?: string
}

export interface SpotlightContent {
  clubOfWeek?: {
    title: string
    subtitle: string
    description: string
    image: string
  }
  memberOfMonth?: {
    name: string
    role: string
    quote: string
    avatar: string
  }
}

export interface Club {
  id: string
  name: string
  slug: string
  category: ClubCategory
  logo: string
  coverImage: string
  description: string
  mission: string
  memberCount: number
  founded: number
  contactEmail: string
  socialLinks: SocialLinks
  tags: string[]
  isRecruiting: boolean
  recruitmentDeadline?: string
  spotsLeft?: number
  committees: Committee[]
  events: ClubEvent[]
  members: ClubMember[]
  spotlightContent: SpotlightContent
  whoShouldJoin: string
}

export interface Recruitment {
  id: string
  clubId: string
  clubName: string
  clubLogo: string
  category: ClubCategory
  deadline: string
  spotsLeft: number
  totalSpots: number
  committees: Committee[]
  urgencyLabel?: string
}

export interface Notification {
  id: string
  type: 'event' | 'recruitment' | 'announcement' | 'reminder'
  title: string
  body: string
  timestamp: string
  isRead: boolean
  isPinned?: boolean
  isFlagged?: boolean
  clubId?: string
  clubName?: string
}

export interface User {
  id: string
  name: string
  nickname?: string
  email: string
  emailPrefix?: string
  gucId: string
  faculty: string
  year: number
  avatar: string
  bio: string
  role: 'student' | 'admin'
  /** For admin users — the club they manage */
  managedClubId?: string
  joinedClubs: string[]
  attendedSessions: number
  totalSessions: number
  warnings: string[]
  profileCompletion: number
}

export interface PostAttachment {
  id: string
  name: string
  type: 'pdf' | 'image'
  mimeType: string
  dataUrl: string
  size: number
}

export interface Announcement {
  id: string
  title: string
  body: string
  imageUrl?: string
  attachments?: PostAttachment[]
  targetAudience: 'All' | 'Members'
  clubId: string
  createdAt: string
  author: string
}
