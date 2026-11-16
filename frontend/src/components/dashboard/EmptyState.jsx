
import { DashIcon } from './DashboardIcons'

function EmptyState({ icon, tone = 'purple', title, message }) {
  return (
    <div className="dash-empty">
      <span className={`dash-icon-circle dash-tone-${tone}`}>
        <DashIcon name={icon} size={22} />
      </span>
      <h3 className="dash-empty-title">{title}</h3>
      <p className="dash-empty-text">{message}</p>
    </div>
  )
}

export default EmptyState
