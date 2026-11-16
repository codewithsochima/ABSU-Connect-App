
import { Link, NavLink } from 'react-router-dom'
import { DashIcon } from './DashboardIcons'
import { NAV_ITEMS } from './navItems'

function Sidebar({ onLogout }) {
  return (
    <aside className="dash-sidebar">
      <Link
        to="/dashboard"
        className="dash-brand"
        aria-label="ABSU Connect dashboard home"
      >
        <img
          src="/absu-connect-logo.svg"
          alt=""
          className="dash-brand-logo"
          width="40"
          height="44"
        />
        <span className="dash-brand-copy">
          <strong>ABSU Connect</strong>
          <small>Excellence, together.</small>
        </span>
      </Link>

      <nav className="dash-nav" aria-label="Dashboard">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.to}
                end={item.end}
                title={item.label}
                className={({ isActive }) =>
                  isActive ? 'dash-nav-link is-active' : 'dash-nav-link'
                }
              >
                {({ isActive }) => (
                  <>
                    <DashIcon name={item.icon} />
                    <span className="dash-nav-label">{item.label}</span>
                    {isActive && <span className="dash-sr-only">Current page</span>}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="dash-sidebar-foot">
        <button
          type="button"
          className="dash-nav-link dash-logout"
          onClick={onLogout}
          title="Log out"
        >
          <DashIcon name="logout" />
          <span className="dash-nav-label">Log out</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
