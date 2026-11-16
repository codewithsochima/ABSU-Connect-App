
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import { DashIcon } from './DashboardIcons'

function TopBar({ profile }) {
  const fullName = profile?.fullName || 'Student'

  return (
    <header className="dash-topbar">
      <Link
        to="/dashboard"
        className="dash-topbar-brand"
        aria-label="ABSU Connect dashboard home"
      >
        <img src="/absu-connect-logo.svg" alt="" width="34" height="38" />
      </Link>

      <Avatar
        name={fullName}
        src={profile?.profilePicture}
      />

      <div className="dash-welcome">
        <span className="dash-welcome-label">Welcome,</span>
        <span className="dash-welcome-name">{fullName}</span>
      </div>

      <Link
        to="/dashboard/notifications"
        className="dash-icon-button"
        aria-label="Notifications"
      >
        <DashIcon name="bell" />
      </Link>
    </header>
  )
}

export default TopBar
