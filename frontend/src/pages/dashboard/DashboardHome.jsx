
import { useOutletContext } from 'react-router-dom'
import EmptyState from '../../components/dashboard/EmptyState'
import Panel from '../../components/dashboard/Panel'
import ProfileCard from '../../components/dashboard/ProfileCard'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

function DashboardHome() {
  const { profile } = useOutletContext() || {}
  useDocumentTitle('Dashboard · ABSU Connect')

  return (
    <>
      <h1 className="dash-sr-only">Dashboard</h1>

      <div className="dash-grid">
        {profile && <ProfileCard profile={profile} />}

        <Panel
          title="Communities"
          area="communities"
          status="planned"
          action={{ to: '/dashboard/community', label: 'Learn more' }}
        >
          <EmptyState
            icon="users"
            tone="yellow"
            title="No communities yet"
            message="Groups by level, faculty, department and interest are planned."
          />
        </Panel>

        <Panel
          title="Notifications"
          area="notifications"
          status="planned"
          action={{ to: '/dashboard/notifications', label: 'Learn more' }}
        >
          <EmptyState
            icon="bell"
            tone="teal"
            title="No notifications"
            message="Alerts for messages, replies and announcements are planned."
          />
        </Panel>

        <Panel
          title="Community feed"
          area="feed"
          status="planned"
          action={{ to: '/dashboard/community', label: 'Learn more' }}
        >
          <EmptyState
            icon="chat"
            tone="purple"
            title="No posts yet"
            message="The feed will be a shared space to post, ask questions and join discussions."
          />
        </Panel>

        <Panel
          title="Announcements"
          area="announcements"
          status="planned"
          action={{ to: '/dashboard/announcements', label: 'Learn more' }}
        >
          <EmptyState
            icon="megaphone"
            tone="yellow"
            title="No announcements"
            message="University and department updates will be gathered in one place."
          />
        </Panel>

        <Panel
          title="Upcoming events"
          area="events"
          status="planned"
          action={{ to: '/dashboard/events', label: 'Learn more' }}
        >
          <EmptyState
            icon="calendar"
            tone="green"
            title="No events"
            message="Campus events, seminars and workshops will be listed here."
          />
        </Panel>

        <Panel title="Recent activity" area="activity">
          <EmptyState
            icon="activity"
            tone="blue"
            title="No activity yet"
            message="Your activity will appear here once community features are available."
          />
        </Panel>

        <Panel title="Students you may know" area="students" status="planned">
          <EmptyState
            icon="network"
            tone="purple"
            title="No suggestions yet"
            message="You will be able to discover and connect with other students."
          />
        </Panel>
      </div>
    </>
  )
}

export default DashboardHome
