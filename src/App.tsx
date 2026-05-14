import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './components/shared/Toast'
import { PhoneFrame } from './components/layout/PhoneFrame'
import { StudentShell } from './components/layout/StudentShell'
import { AdminShell } from './components/layout/AdminShell'

// Auth pages
import { Login } from './pages/auth/Login'
import { Signup } from './pages/auth/Signup'
import { Onboarding } from './pages/auth/Onboarding'

// Student pages
import { Home } from './pages/student/Home'
import { Clubs } from './pages/student/Clubs'
import { ClubDetail } from './pages/student/ClubDetail'
import { Recruit } from './pages/student/Recruit'
import { Apply } from './pages/student/Apply'
import { Profile } from './pages/student/Profile'
import { Settings } from './pages/student/Settings'
import { Notifications } from './pages/student/Notifications'

// Admin pages
import { AdminFeed } from './pages/admin/Feed'
import { AdminManage } from './pages/admin/Manage'
import { AdminClub } from './pages/admin/ClubPreview'
import { AdminStats } from './pages/admin/Stats'
import { AdminProfile } from './pages/admin/Profile'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: false } },
})

function AppRoutes() {
  const { role } = useAuth()

  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Student */}
      <Route path="/student" element={<StudentShell />}>
        <Route path="home" element={<Home />} />
        <Route path="clubs" element={<Clubs />} />
        <Route path="clubs/:slug" element={<ClubDetail />} />
        <Route path="recruit" element={<Recruit />} />
        <Route path="apply/:clubId" element={<Apply />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<AdminShell />}>
        <Route path="feed" element={<AdminFeed />} />
        <Route path="manage" element={<AdminManage />} />
        <Route path="club" element={<AdminClub />} />
        <Route path="stats" element={<AdminStats />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      {/* Default redirect */}
      <Route
        path="/"
        element={
          role === 'admin'
            ? <Navigate to="/admin/feed" replace />
            : role === 'student'
            ? <Navigate to="/student/home" replace />
            : <Navigate to="/login" replace />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter>
              <PhoneFrame>
                <AppRoutes />
              </PhoneFrame>
            </BrowserRouter>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
