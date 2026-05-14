# Clubify — GUC Student Activities Hub

A mobile-first student activities hub for the German University in Cairo (GUC), built as a premium consumer-grade frontend prototype.

## Tech Stack

- **React 18 + TypeScript** — Component architecture with full type safety
- **Vite** — Fast dev server and production builds
- **Tailwind CSS v4** — Utility-first styling with custom GUC color theme
- **Framer Motion** — Page transitions, card animations, staggered lists
- **React Router v6** — Client-side routing with nested layouts
- **React Query (@tanstack/react-query)** — Mock async data fetching with fake delays
- **Lucide React** — Icon library

## Setup & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Demo Credentials

### Student Login
- **Email:** `youssef.mahmoud@guc.edu.eg`
- **Password:** any value
- Or use any `@guc.edu.eg` email

### Admin Login (Club Officer)
- Switch to "Club Officer" tab on login screen
- **Email:** any `@guc.edu.eg` email
- **Password:** any value

### Guest Access
- Click "Continue as Guest" to browse without an account

## Features

### Student Shell
- **Home** — Dashboard with greeting, profile completion, Club Spotlight, Recruitment Alert, upcoming events feed, Member of the Month
- **Clubs** — Searchable/filterable grid of 18 GUC clubs with favorites (persisted to localStorage)
- **Club Detail** — Full club page with About/Events/Members tabs, social links, recruitment status
- **Recruit** — Open recruitment listings with urgency indicators, deadline countdowns, spot progress bars
- **Apply** — 3-step application flow: choose committee → pick interview slot → confirm + confetti success screen
- **Profile** — User card, attendance tracker, bio editing, joined clubs, upcoming activities
- **Settings** — Dark mode toggle, notifications, language selector (bottom sheet), sign out
- **Notifications** — Categorized notification feed with read/unread states

### Admin Shell (Club Officer)
- **Feed Manager** — Create/edit/delete club announcements with image support
- **Manage** — Edit Club of the Week, Member of the Month, events, and social links
- **Club Preview** — Toggle between student view and edit mode
- **Stats** — Quick stat cards, monthly activity bar chart, application funnel

### Design Highlights
- **Phone frame** — Fixed 430px centered layout on desktop mimicking a real mobile app
- **Dark mode** — Full dark mode support, persisted to localStorage
- **Onboarding quiz** — 3-step interest quiz with club recommendations (shown once, localStorage)
- **Loading skeletons** — Shimmer skeletons replace spinners for all data loading
- **Toast notifications** — Feedback for all user actions (favorite, apply, post, save)
- **Optimistic updates** — Favorites update instantly in UI
- **Confetti animation** — Celebratory success screen after application submission
- **Recruitment alerts** — Pulsing dot banners for open recruitments

## Project Structure

```
src/
├── components/
│   ├── layout/       # PhoneFrame, StudentShell, AdminShell, BottomNav, TopBar
│   ├── cards/        # ClubCard, EventCard, RecruitmentCard, NotificationCard
│   └── shared/       # SearchBar, CategoryFilter, StatusBadge, EmptyState,
│                     # Toast, SocialIcons, LoadingSkeletons
├── pages/
│   ├── auth/         # Login, Signup, Onboarding
│   ├── student/      # Home, Clubs, ClubDetail, Recruit, Apply, Profile, Settings, Notifications
│   └── admin/        # Feed, Manage, ClubPreview, Stats
├── context/          # AuthContext, ThemeContext
├── data/             # clubs.ts (18 clubs), events.ts, recruitments.ts,
│                     # notifications.ts, users.ts, announcements.ts, types.ts
├── hooks/            # useClubs, useLocalStorage, useNotifications
└── lib/              # utils (cn, formatDate, daysUntil, getTimeOfDay)
```

## Mock Data

All data is mocked in `src/data/` — 18 GUC clubs with full details, 20+ events, 10 notifications, and 2 demo users (student + admin). No backend required.

## Color Theme

| Token | Value | Usage |
|-------|-------|-------|
| Maroon | `#8B1A1A` | Primary brand, CTAs, active states |
| Orange | `#E07B39` | Accent, urgency, highlights |
| Cream | `#FAF8F5` | Light surface background |
| Charcoal | `#1C1C1E` | Dark surface, text |
| Muted | `#8E8E93` | Secondary text, placeholders |
