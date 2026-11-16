
import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { DashIcon } from './DashboardIcons'
import { NAV_ITEMS, TAB_BAR_IDS } from './navItems'

function MobileTabBar({ onLogout }) {
  const location = useLocation()
  const [openPath, setOpenPath] = useState(null)
  const open = openPath === location.pathname
  const moreButtonRef = useRef(null)
  const sheetRef = useRef(null)

  const tabItems = NAV_ITEMS.filter((item) => TAB_BAR_IDS.includes(item.id))
  const moreItems = NAV_ITEMS.filter((item) => !TAB_BAR_IDS.includes(item.id))
  const moreIsActive = moreItems.some((item) => location.pathname === item.to)

  useEffect(() => {
    if (!open) return undefined

    const sheet = sheetRef.current
    const moreButton = moreButtonRef.current
    const focusable = () => sheet.querySelectorAll('a[href], button:not([disabled])')

    focusable()[0]?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenPath(null)
        return
      }

      if (event.key !== 'Tab') return

      const items = focusable()
      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      moreButton?.focus()
    }
  }, [open])

  return (
    <>
      {open && (
        <>
          <div
            className="dash-sheet-backdrop"
            onClick={() => setOpenPath(null)}
          />

          <div
            id="dashboard-more-menu"
            className="dash-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="More pages"
            ref={sheetRef}
          >
            <ul>
              {moreItems.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      isActive ? 'dash-sheet-link is-active' : 'dash-sheet-link'
                    }
                  >
                    <DashIcon name={item.icon} />
                    {item.label}
                  </NavLink>
                </li>
              ))}

              <li className="dash-sheet-divider">
                <button
                  type="button"
                  className="dash-sheet-link"
                  onClick={() => {
                    setOpenPath(null)
                    onLogout()
                  }}
                >
                  <DashIcon name="logout" />
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </>
      )}

      <nav className="dash-tabbar" aria-label="Main">
        <ul>
          {tabItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive ? 'dash-tab is-active' : 'dash-tab'
                }
              >
                <DashIcon name={item.icon} size={22} />
                <span>{item.shortLabel}</span>
              </NavLink>
            </li>
          ))}

          <li>
            <button
              type="button"
              ref={moreButtonRef}
              className={moreIsActive || open ? 'dash-tab is-active' : 'dash-tab'}
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="dashboard-more-menu"
              onClick={() => setOpenPath(open ? null : location.pathname)}
            >
              <DashIcon name="more" size={22} />
              <span>More</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default MobileTabBar
