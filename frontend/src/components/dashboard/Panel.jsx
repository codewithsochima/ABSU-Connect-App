
import { useId } from 'react'
import { Link } from 'react-router-dom'
import { DashIcon } from './DashboardIcons'
import { STATUS_LABELS } from './navItems'

function Panel({ title, status, action, area, className = '', children }) {
  const headingId = useId()
  const classes = ['dash-panel', area ? `dash-area-${area}` : '', className]
    .filter(Boolean)
    .join(' ')

  const statusLabel = status ? STATUS_LABELS[status] : null

  return (
    <section className={classes} aria-labelledby={headingId}>
      <header className="dash-panel-head">
        <h2 id={headingId} className="dash-panel-title">
          {title}
        </h2>

        {statusLabel && (
          <span className={`dash-badge dash-badge-${status}`}>
            {statusLabel}
          </span>
        )}
      </header>

      <div className="dash-panel-body">{children}</div>

      {action && (
        <footer className="dash-panel-foot">
          <Link to={action.to} className="dash-panel-link">
            {action.label}
            <DashIcon name="chevronRight" size={16} />
          </Link>
        </footer>
      )}
    </section>
  )
}

export default Panel
