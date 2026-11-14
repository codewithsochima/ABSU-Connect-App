
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import { ArrowLeftIcon } from './icons'
import '../auth.css'

const PANEL_TAG = 'An independent student project'
const STEPS = ['Create your account', 'Set up your profile', 'Join your community']

function AuthLayout({ pageTitle, headline, description, activeStep = null, children }) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = `${pageTitle} | ABSU Connect`
    return () => {
      document.title = previousTitle
    }
  }, [pageTitle])

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <aside className="auth-panel">
          <span className="panel-dot panel-dot-orange" aria-hidden="true"></span>
          <span className="panel-dot panel-dot-yellow" aria-hidden="true"></span>
          <span className="panel-dot panel-dot-green" aria-hidden="true"></span>

          <div className="auth-logo">
            <Logo />
          </div>

          <div className="panel-copy">
            <span className="panel-tag">
              <span className="panel-tag-dot" aria-hidden="true"></span>
              {PANEL_TAG}
            </span>
            <p className="panel-title">{headline}</p>
            <p className="panel-text">{description}</p>
          </div>

          <ol className="steps" aria-label="Your journey">
            {STEPS.map((title, index) => (
              <li
                key={title}
                className={`step${activeStep === index ? ' is-active' : ''}`}
                aria-current={activeStep === index ? 'step' : undefined}
              >
                <span className="step-num" aria-hidden="true">{index + 1}</span>
                <span className="step-title">{title}</span>
              </li>
            ))}
          </ol>
        </aside>

        <main className="auth-main">
          <div className="auth-topbar">
            <Link to="/" className="back-link">
              <ArrowLeftIcon />
              Back to home
            </Link>
          </div>
          <div className="auth-card">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default AuthLayout
