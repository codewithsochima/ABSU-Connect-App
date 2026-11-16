
function DashboardSkeleton() {
  return (
    <div className="dash" role="status" aria-live="polite" aria-busy="true">
      <span className="dash-sr-only">Loading your dashboard…</span>

      <div className="dash-sidebar dash-skel-sidebar" aria-hidden="true">
        <div className="dash-skel dash-skel-brand"></div>
        {Array.from({ length: 9 }, (_, index) => (
          <div className="dash-skel dash-skel-nav" key={index}></div>
        ))}
      </div>

      <div className="dash-main" aria-hidden="true">
        <div className="dash-topbar">
          <div className="dash-skel dash-skel-avatar"></div>
          <div className="dash-skel-lines">
            <div className="dash-skel dash-skel-line-sm"></div>
            <div className="dash-skel dash-skel-line"></div>
          </div>
        </div>

        <div className="dash-grid">
          <div className="dash-skel dash-skel-panel dash-area-profile"></div>
          <div className="dash-skel dash-skel-panel dash-area-communities"></div>
          <div className="dash-skel dash-skel-panel dash-area-notifications"></div>
          <div className="dash-skel dash-skel-panel dash-skel-tall dash-area-feed"></div>
          <div className="dash-skel dash-skel-panel dash-area-announcements"></div>
          <div className="dash-skel dash-skel-panel dash-area-events"></div>
          <div className="dash-skel dash-skel-panel dash-area-activity"></div>
          <div className="dash-skel dash-skel-panel dash-area-students"></div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSkeleton
