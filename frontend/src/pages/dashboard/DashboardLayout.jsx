
import { Outlet, useNavigate } from 'react-router-dom'
import { removeToken } from '../../authStorage'
import { useProfile } from '../../hooks/useProfile'
import DashboardSkeleton from '../../components/dashboard/DashboardSkeleton'
import MobileTabBar from '../../components/dashboard/MobileTabBar'
import ProfileError from '../../components/dashboard/ProfileError'
import Sidebar from '../../components/dashboard/Sidebar'
import TopBar from '../../components/dashboard/TopBar'
import { FOOTER_DISCLAIMER } from '../../components/dashboard/navItems'
import '../../styles/dashboard.css'

function DashboardLayout() {
  const navigate = useNavigate()
  const { status, profile, error, retry } = useProfile()

  const handleLogout = () => {
    removeToken()
    navigate('/signin', { replace: true })
  }

  if (status === 'loading') {
    return <DashboardSkeleton />
  }

  if (status === 'error') {
    return (
      <ProfileError
        message={error}
        onRetry={retry}
        onLogout={handleLogout}
      />
    )
  }

  if (!profile) {
    return (
      <ProfileError
        message="Your profile information is unavailable. Please try again."
        onRetry={retry}
        onLogout={handleLogout}
      />
    )
  }

  const skipToContent = (event) => {
    event.preventDefault()
    document.getElementById('dash-content')?.focus()
  }

  return (
    <div className="dash">
      <a href="#dash-content" className="dash-skip" onClick={skipToContent}>
        Skip to main content
      </a>

      <Sidebar onLogout={handleLogout} />

      <div className="dash-main">
        <TopBar profile={profile} />

        <main id="dash-content" className="dash-content" tabIndex={-1}>
          <Outlet context={{ profile }} />
        </main>

        <footer className="dash-footer">
          <p>{FOOTER_DISCLAIMER}</p>
        </footer>
      </div>

      <MobileTabBar onLogout={handleLogout} />
    </div>
  )
}

export default DashboardLayout
