
export const STATUS_LABELS = {
  'in-development': 'In development',
  planned: 'Planned',
}

export const FOOTER_DISCLAIMER =
  'An independent student project, not affiliated with or endorsed by Abia State University.'

export const INDEPENDENT_NOTE =
  'ABSU Connect is an independent student community project. It is not an official or endorsed service of Abia State University.'

export const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    shortLabel: 'Home',
    to: '/dashboard',
    end: true,
    icon: 'grid',
  },
  {
    id: 'community',
    label: 'Community',
    shortLabel: 'Community',
    path: 'community',
    to: '/dashboard/community',
    icon: 'users',
    status: 'planned',
    description:
      'Share ideas, ask questions and join discussions with students across ABSU.',
    points: [
      'A shared space to post, ask questions and join discussions.',
      'Groups by level, faculty, department and interest.',
      'Discover and connect with other students.',
    ],
  },
  {
    id: 'faculty',
    label: 'My Faculty',
    shortLabel: 'Faculty',
    path: 'faculty',
    to: '/dashboard/faculty',
    icon: 'cap',
    status: 'planned',
    personal: 'faculty',
    description:
      'Students in this faculty will be able to meet course mates, share study help and stay informed.',
    points: ['Groups by level, faculty, department and interest.'],
  },
  {
    id: 'department',
    label: 'My Department',
    shortLabel: 'Department',
    path: 'department',
    to: '/dashboard/department',
    icon: 'book',
    status: 'planned',
    personal: 'department',
    description:
      'Connect with students in your department, your faculty and other levels.',
    points: [
      'Groups by level, faculty, department and interest.',
      'Discover and connect with other students.',
    ],
  },
  {
    id: 'announcements',
    label: 'Announcements',
    shortLabel: 'Announcements',
    path: 'announcements',
    to: '/dashboard/announcements',
    icon: 'megaphone',
    status: 'planned',
    description:
      'A central place for university updates, departmental information and student announcements.',
    points: ['University and department updates in one place.'],
    note: INDEPENDENT_NOTE,
  },
  {
    id: 'events',
    label: 'Events',
    shortLabel: 'Events',
    path: 'events',
    to: '/dashboard/events',
    icon: 'calendar',
    status: 'planned',
    description:
      'Discover campus events, seminars, workshops and social activities.',
    points: ['Campus events, seminars and workshops.'],
  },
  {
    id: 'notifications',
    label: 'Notifications',
    shortLabel: 'Alerts',
    path: 'notifications',
    to: '/dashboard/notifications',
    icon: 'bell',
    status: 'planned',
    description:
      'Get alerts for messages, comments, replies, group activity and announcements.',
    points: ['Alerts for messages, replies and announcements.'],
  },
  {
    id: 'profile',
    label: 'My Profile',
    shortLabel: 'Profile',
    path: 'profile',
    to: '/dashboard/profile',
    icon: 'user',
    status: 'in-development',
    description:
      'Manage your profile and keep your student information up to date.',
    points: ['Your name, photo, department, faculty and level in one place.'],
  },
  {
    id: 'settings',
    label: 'Settings',
    shortLabel: 'Settings',
    path: 'settings',
    to: '/dashboard/settings',
    icon: 'settings',
    status: 'in-development',
    description:
      'Manage your account preferences and customise your ABSU Connect experience.',
    points: ['Update your account details and choose your app preferences.'],
  },
]

export const TAB_BAR_IDS = ['dashboard', 'community', 'events', 'notifications']
