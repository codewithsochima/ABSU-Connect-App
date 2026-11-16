
import { Link, useOutletContext } from 'react-router-dom'
import { DashIcon } from '../../components/dashboard/DashboardIcons'
import { STATUS_LABELS } from '../../components/dashboard/navItems'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

function ComingSoonPage({ item }) {
  const { profile } = useOutletContext() || {}
  useDocumentTitle(`${item.label} · ABSU Connect`)

  const personalValue = item.personal ? profile?.[item.personal] : ''
  const personalLabel =
    item.personal === 'faculty' ? 'Your faculty' : 'Your department'
  const statusLabel = STATUS_LABELS[item.status] || 'Coming soon'
  const points = item.points || []

  return (
    <div className="dash-soon">
      <section className="dash-panel dash-soon-card" aria-labelledby="dash-soon-title">
        <span className="dash-icon-circle dash-icon-circle-lg dash-tone-yellow">
          <DashIcon name={item.icon || 'grid'} size={30} />
        </span>

        <span className={`dash-badge dash-badge-${item.status || 'planned'}`}>
          {statusLabel}
        </span>

        <h1 id="dash-soon-title" className="dash-soon-title">
          {item.label}
        </h1>
        <p className="dash-soon-lead">
          {item.description || 'We are working on this section.'}
        </p>

        {item.personal && (
          <div className="dash-soon-personal">
            <span className="dash-soon-personal-label">{personalLabel}</span>
            {personalValue ? (
              <strong>{personalValue}</strong>
            ) : (
              <span className="dash-muted">Not added yet</span>
            )}
          </div>
        )}

        <h2 className="dash-soon-subtitle">What we&rsquo;re building</h2>
        <ul className="dash-soon-points">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        {item.note && <p className="dash-soon-note">{item.note}</p>}

        <p className="dash-soon-status">
          This page isn&rsquo;t available yet. We&rsquo;re still building it.
        </p>

        <Link to="/dashboard" className="dash-btn">
          Back to dashboard
        </Link>
      </section>
    </div>
  )
}

export default ComingSoonPage
