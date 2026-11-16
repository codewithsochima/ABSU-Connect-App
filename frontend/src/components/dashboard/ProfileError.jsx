
import { DashIcon } from './DashboardIcons'

function ProfileError({ message, onRetry, onLogout }) {
  return (
    <div className="dash dash-center">
      <div className="dash-panel dash-error" role="alert">
        <span className="dash-icon-circle dash-tone-red">
          <DashIcon name="alert" size={24} />
        </span>
        <h1 className="dash-error-title">We couldn&rsquo;t load your dashboard</h1>
        <p className="dash-error-text">
          {message || 'Something went wrong. Please try again.'}
        </p>
        <div className="dash-actions">
          <button type="button" className="dash-btn" onClick={onRetry}>
            Try again
          </button>
          <button type="button" className="dash-btn dash-btn-secondary" onClick={onLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileError
