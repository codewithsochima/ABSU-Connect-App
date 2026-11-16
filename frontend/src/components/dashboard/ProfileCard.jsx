
import Avatar from './Avatar'
import Panel from './Panel'
import { formatLevel } from '../../utils/profileHelpers'

function ProfileCard({ profile }) {
  const rows = [
    { label: 'Faculty', value: profile?.faculty },
    { label: 'Department', value: profile?.department },
    { label: 'Level', value: formatLevel(profile?.level) },
  ]

  return (
    <Panel
      title="Your profile"
      area="profile"
      action={{ to: '/dashboard/profile', label: 'Open' }}
    >
      <div className="dash-profile">
        <Avatar name={profile?.fullName} src={profile?.profilePicture} size="lg" />
        <div className="dash-profile-id">
          <p className="dash-profile-name">{profile?.fullName || 'Student'}</p>
          <p className="dash-profile-email">{profile?.email || 'No email available'}</p>
        </div>
      </div>

      <dl className="dash-details">
        {rows.map((row) => (
          <div className="dash-details-row" key={row.label}>
            <dt>{row.label}</dt>
            <dd>
              {row.value || <span className="dash-muted">Not added yet</span>}
            </dd>
          </div>
        ))}
      </dl>
    </Panel>
  )
}

export default ProfileCard
