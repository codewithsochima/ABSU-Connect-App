
import { useEffect, useState } from 'react'
import './App.css'

const CONTACT_EMAIL = ''

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Community', href: '#community' },
  { label: 'Features', href: '#features' },
  { label: 'Contact', href: '#contact' },
]

const columns = [
  [
    { color: 'yellow', src: '/images/students-together.png', alt: 'Two Nigerian university students' },
    { color: 'red', src: '/images/student.jpg', alt: 'Nigerian university student' },
  ],
  [
    { color: 'purple', src: '/images/students.jpg', alt: 'Nigerian university student' },
    { color: 'blue', src: '/images/graduate.png', alt: 'Nigerian university graduate' },
  ],
  [
    { color: 'teal', src: '/images/student.jpg', alt: 'Nigerian university student' },
    { color: 'green', src: '/images/students.jpg', alt: 'Nigerian university student' },
  ],
]

const categories = ['Freshers', 'Undergraduates', 'Final Year', 'Alumni']

const TONES = ['yellow', 'blue', 'teal', 'green', 'red']

const ICON_PATHS = {
  users: [
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2',
    'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    'M22 21v-2a4 4 0 0 0-3-3.87',
    'M16 3.13a4 4 0 0 1 0 7.75',
  ],
  user: ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'],
  book: [
    'M4 19.5A2.5 2.5 0 0 1 6.5 17H20',
    'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
  ],
  bell: ['M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9', 'M13.73 21a2 2 0 0 1-3.46 0'],
  briefcase: [
    'M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z',
    'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16',
  ],
  heart: [
    'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
  ],
  lock: ['M5 11h14v10H5z', 'M8 11V7a4 4 0 0 1 8 0v4'],
  chat: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'],
  grid: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'],
  network: [
    'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    'M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    'M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    'M8.59 13.51l6.83 3.98',
    'M15.41 6.51l-6.82 3.98',
  ],
  cap: ['M22 10L12 5 2 10l10 5 10-5z', 'M6 12v5c3 2 9 2 12 0v-5'],
  help: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', 'M12 17h.01'],
  file: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M12 18v-6', 'M9 15l3-3 3 3'],
  megaphone: ['M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z', 'M16 9a4 4 0 0 1 0 6'],
  calendar: [
    'M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z',
    'M16 2v4',
    'M8 2v4',
    'M3 10h18',
  ],
  search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.35-4.35'],
  code: ['M16 18l6-6-6-6', 'M8 6l-6 6 6 6'],
  trending: ['M23 6l-9.5 9.5-5-5L1 18', 'M17 6h6v6'],
  music: ['M9 18V5l12-2v13', 'M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M18 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
  activity: ['M22 12h-4l-3 9L9 3l-3 9H2'],
  pen: ['M12 20h9', 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z'],
  star: ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z'],
  mail: ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M22 6l-10 7L2 6'],
  chevron: ['M6 9l6 6 6-6'],
}

const ABOUT = {
  headline: 'One home for every ABSU student.',
  intro:
    "ABSU Connect is being built as a central digital community for students of Abia State University. It's not just another social media app. It's a place to connect, learn, grow and stay informed. It's being built to help you:",
  image: { src: '/images/students-together.png', alt: 'Two Nigerian university students' },
  points: [
    { icon: 'users', tone: 'yellow', title: 'Meet your people', text: 'Connect with students in your department, your faculty and other levels.' },
    { icon: 'book', tone: 'blue', title: 'Get academic support', text: 'Ask questions, share study materials and help each other with courses.' },
    { icon: 'bell', tone: 'teal', title: 'Stay informed', text: 'Follow university updates, departmental news and campus events in one place.' },
    { icon: 'briefcase', tone: 'green', title: 'Find opportunities', text: 'Discover scholarships, internships, competitions, jobs and projects to build together.' },
    { icon: 'heart', tone: 'red', title: 'Belong to the community', text: 'Share student life, make friends and show off your talents.' },
  ],
  buttonLabel: 'Explore the community',
}

const COMMUNITY = {
  heading: 'Find your people at ABSU',
  subtext: 'Groups for every level, faculty and interest. Groups open when ABSU Connect launches.',
  joinLabel: 'Sign up to join',
  placeholderLabel: 'Faculty name to be added',
  scenariosHeading: 'What a day on ABSU Connect could look like',
  scenariosSubtext: "Ideas of what we're building, not live features.",
  comingSoonLabel: 'Coming soon',
}

const GROUP_TABS = [
  { id: 'level', label: 'Level' },
  { id: 'faculty', label: 'Faculty' },
  { id: 'interest', label: 'Interest' },
]

const LEVEL_GROUPS = [
  { id: 'freshers', icon: 'star', title: 'Freshers', description: 'A space where new students will be able to ask questions, find their way around campus and meet course mates from day one.' },
  { id: 'undergraduates', icon: 'book', title: 'Undergraduates', description: 'Students will be able to swap study tips, discuss courses and connect with people across levels.' },
  { id: 'final-year', icon: 'cap', title: 'Final Year', description: 'Final-year students will be able to compare notes on projects, plan what comes next and support each other to the finish line.' },
  { id: 'alumni', icon: 'users', title: 'Alumni', description: 'Alumni will be able to stay connected to ABSU, share their experience and guide current students.' },
]

const FACULTIES = []

const FACULTY_PLACEHOLDER_COUNT = 4

const FACULTY_DESCRIPTION = 'Students in this faculty will be able to meet course mates, share study help and stay informed.'

const INTEREST_GROUPS = [
  { id: 'tech', icon: 'code', title: 'Tech and Coding', description: 'Students will be able to share projects, learn new skills and find teammates to build with.' },
  { id: 'business', icon: 'trending', title: 'Business and Entrepreneurship', description: 'Students will be able to swap ideas, talk about starting out and find partners.' },
  { id: 'creative', icon: 'music', title: 'Music and Creative Arts', description: 'Creatives will be able to show their talent and connect with each other on campus.' },
  { id: 'sports', icon: 'activity', title: 'Sports and Fitness', description: 'Students will be able to find teammates, organise games and stay active together.' },
  { id: 'writing', icon: 'pen', title: 'Writing and Debate', description: 'Students will be able to sharpen their voice, share their writing and join the conversation.' },
]

const SCENARIOS = [
  { icon: 'help', title: 'Stuck on an assignment', text: "You'll be able to ask in your course group and hear from students who've been there." },
  { icon: 'users', title: 'New in your department', text: "You'll be able to meet course mates and seniors in your faculty." },
  { icon: 'briefcase', title: 'Looking for an internship', text: "You'll be able to find scholarships, internships and competitions in one place." },
  { icon: 'megaphone', title: "What's happening on campus?", text: "You'll be able to check announcements for university and department updates." },
]

const COMING_SOON = [
  { icon: 'heart', title: 'Student stories', text: 'Real stories from ABSU students about life on campus will appear here.' },
  { icon: 'calendar', title: 'Campus events', text: 'Seminars, workshops and social activities will be listed here.' },
]

const FEATURES_COPY = {
  heading: "What we're building",
  subtext: "Every feature is labelled by how far along it is, so you always know what's ready. None are live yet.",
  categoryLabel: 'Category',
  statusLabel: 'Status',
  emptyText: 'No features match these filters.',
  resetLabel: 'Reset filters',
}

const FEATURE_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'identity', label: 'Your identity', tone: 'yellow' },
  { id: 'connect', label: 'Connect', tone: 'blue' },
  { id: 'learn', label: 'Learn', tone: 'teal' },
  { id: 'informed', label: 'Stay informed and grow', tone: 'green' },
]

const STATUS_LABELS = {
  'in-development': 'In development',
  planned: 'Planned',
  available: 'Available',
}

const STATUS_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'in-development', label: STATUS_LABELS['in-development'] },
  { id: 'planned', label: STATUS_LABELS.planned },
  { id: 'available', label: STATUS_LABELS.available },
]

const FEATURES = [
  { id: 'profiles', title: 'Student Profiles', category: 'identity', status: 'in-development', icon: 'user', line: 'Your name, photo, department, faculty and level in one place.', details: 'Create your account and build a profile so other students know who you are.' },
  { id: 'authentication', title: 'Authentication', category: 'identity', status: 'in-development', icon: 'lock', line: 'Secure sign up, login and password recovery.', details: 'Register, log in, log out and recover your password securely.' },
  { id: 'feed', title: 'Community Feed', category: 'connect', status: 'planned', icon: 'grid', line: 'A shared space to post, ask questions and join discussions.', details: 'Share ideas, ask questions and join discussions with students across ABSU.' },
  { id: 'groups', title: 'Student Groups', category: 'connect', status: 'planned', icon: 'users', line: 'Groups by level, faculty, department and interest.', details: 'Join communities organised around your studies and interests.' },
  { id: 'networking', title: 'Student Networking', category: 'connect', status: 'planned', icon: 'network', line: 'Discover and connect with other students.', details: 'Find students across departments and levels and build lasting relationships.' },
  { id: 'messaging', title: 'Messaging', category: 'connect', status: 'planned', icon: 'chat', line: 'Private conversations between students.', details: 'Chat one-to-one with other students.' },
  { id: 'alumni', title: 'Alumni Network', category: 'connect', status: 'planned', icon: 'cap', line: 'Alumni mentoring current students.', details: 'A space where alumni connect with current students, share experience and offer mentorship.' },
  { id: 'discussions', title: 'Academic Discussions', category: 'learn', status: 'planned', icon: 'help', line: 'Ask questions and help each other with courses.', details: 'Discuss courses and help other students understand difficult topics.' },
  { id: 'materials', title: 'Study Material Sharing', category: 'learn', status: 'planned', icon: 'file', line: 'Upload and find useful study resources.', details: 'Upload, discover and share useful academic resources.' },
  { id: 'announcements', title: 'Announcements', category: 'informed', status: 'planned', icon: 'megaphone', line: 'University and department updates in one place.', details: 'A central place for university updates, departmental information and student announcements.' },
  { id: 'events', title: 'Events and Activities', category: 'informed', status: 'planned', icon: 'calendar', line: 'Campus events, seminars and workshops.', details: 'Discover campus events, seminars, workshops and social activities.' },
  { id: 'opportunities', title: 'Scholarships and Opportunities', category: 'informed', status: 'planned', icon: 'briefcase', line: 'Scholarships, internships, jobs and competitions.', details: 'A dedicated space for scholarships, internships, jobs, competitions and more.' },
  { id: 'notifications', title: 'Notifications', category: 'informed', status: 'planned', icon: 'bell', line: 'Alerts for messages, replies and announcements.', details: 'Get alerts for messages, comments, replies, group activity and announcements.' },
  { id: 'search', title: 'Search and Discovery', category: 'informed', status: 'planned', icon: 'search', line: 'Find students, groups, posts and opportunities.', details: 'Search for students, groups, posts, departments and opportunities.' },
]

const CONTACT_COPY = {
  heading: 'Get in touch',
  subtext: 'Questions, feedback or ideas? Send us a message.',
  disabledNote: "Messaging opens soon. Our contact email hasn't been set up yet.",
  sendNote: 'Your email app should open. Press Send there to deliver your message.',
  nameLabel: 'Name',
  reasonLabel: 'Reason',
  reasonPlaceholder: 'Choose a reason',
  messageLabel: 'Message',
  buttonLabel: 'Send message',
  infoTitle: 'How we can help',
  emailLabel: 'Email us',
  errors: {
    name: 'Please enter your name.',
    reason: 'Please choose a reason for your message.',
    message: 'Please write a message.',
  },
}

const CONTACT_REASONS = [
  { value: 'Student assistance', title: 'Student assistance', help: 'Need help with something on ABSU Connect? Tell us.' },
  { value: 'General enquiry', title: 'General enquiries', help: 'Questions about the project? Ask away.' },
  { value: 'Feedback and suggestions', title: 'Feedback and suggestions', help: 'Ideas to make it better are welcome.' },
  { value: 'Partnership and sponsorship', title: 'Partnership and sponsorship', help: 'Want to work with us? Let us know.' },
  { value: 'Report a problem or inappropriate behaviour', title: 'Report a problem or inappropriate behaviour', help: 'Help us keep the community safe and respectful.' },
]

const FAQ_HEADING = 'Frequently asked questions'

const FAQS = [
  { question: 'Who is ABSU Connect for?', answer: 'Students of Abia State University, from freshers to final year. A space for alumni is planned for later.' },
  { question: 'Who can join?', answer: "ABSU Connect is made for ABSU students. We'll share how membership works before launch." },
  { question: 'Is registration free?', answer: 'Yes! Registration on ABSU Connect will be completely free for students at launch.' },
  { question: 'What can I do on ABSU Connect?', answer: "See the Features section above for what we're building and how far along each feature is." },
  { question: 'Is ABSU Connect run by the university?', answer: 'No. ABSU Connect is an independent student community project. It is not an official or endorsed service of Abia State University.' },
]

const FOOTER_DISCLAIMER = 'An independent student project, not affiliated with or endorsed by Abia State University.'

function Icon({ name }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {ICON_PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

function IconCircle({ name, tone }) {
  return (
    <span className={`icon-circle tone-${tone}`}>
      <Icon name={name} />
    </span>
  )
}

function Logo({ idPrefix }) {
  const shieldId = `${idPrefix}-logoShield`
  const diamondId = `${idPrefix}-logoDiamond`

  return (
    <>
      <svg className="logo-mark" viewBox="0 0 64 72" aria-hidden="true">
        <defs>
          <linearGradient id={shieldId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2f20a8" />
            <stop offset="1" stopColor="#1b0f66" />
          </linearGradient>
          <linearGradient id={diamondId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#35b2ff" />
            <stop offset="1" stopColor="#0580de" />
          </linearGradient>
        </defs>
        <path d="M4 6Q32 0 60 6V36C60 54 44 66 32 71C20 66 4 54 4 36Z" fill={`url(#${shieldId})`} stroke="#b08d74" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M4 14Q32 8 60 14" fill="none" stroke="#b08d74" strokeWidth="2.5" />
        <path d="M32 16L54 40L32 64L10 40Z" fill={`url(#${diamondId})`} stroke="#b08d74" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M28 24A4 4 0 0 0 36 24Q32 28.5 28 24Z" fill="#f1d5bd" />
        <circle cx="25" cy="40.5" r="2.6" fill="#b08d74" />
        <path d="M20.5 49Q20.5 43.5 25 43.5Q29.5 43.5 29.5 49Z" fill="#b08d74" />
        <circle cx="39" cy="40.5" r="2.6" fill="#b08d74" />
        <path d="M34.5 49Q34.5 43.5 39 43.5Q43.5 43.5 43.5 49Z" fill="#b08d74" />
        <circle cx="32" cy="36" r="3.4" fill="#fff4ea" stroke="#0a8ae8" strokeWidth="1" />
        <path d="M25.5 49Q25.5 40.8 32 40.8Q38.5 40.8 38.5 49Z" fill="#fff4ea" stroke="#0a8ae8" strokeWidth="1" strokeLinejoin="round" />
      </svg>
      <span className="logo-words">
        <span className="logo-text"><strong>ABSU</strong> Connect</span>
        <span className="logo-motto">Excellence, together.</span>
      </span>
    </>
  )
}

function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{STATUS_LABELS[status]}</span>
}

function ExpandCard({ id, icon, tone, title, badge, line, open, onToggle, children }) {
  return (
    <div className={`card${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="card-head"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
      >
        {icon && <IconCircle name={icon} tone={tone} />}
        <span className="card-text">
          <span className="card-title">{title}</span>
          {badge && <StatusBadge status={badge} />}
          {line && <span className="card-line">{line}</span>}
        </span>
        <span className="chevron">
          <Icon name="chevron" />
        </span>
      </button>
      <div id={`${id}-panel`} className="card-body" hidden={!open}>
        {children}
      </div>
    </div>
  )
}

function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <div className="about-photo">
          <img src={ABOUT.image.src} alt={ABOUT.image.alt} loading="lazy" decoding="async" />
        </div>
        <div className="about-text">
          <h2 className="about-title">{ABOUT.headline}</h2>
          <p className="about-intro">{ABOUT.intro}</p>
          <ul className="about-points">
            {ABOUT.points.map((point) => (
              <li key={point.title}>
                <IconCircle name={point.icon} tone={point.tone} />
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <a href="#community" className="btn btn-blue btn-inline">{ABOUT.buttonLabel}</a>
        </div>
      </div>
    </section>
  )
}

function getGroups(tab) {
  if (tab === 'level') return LEVEL_GROUPS
  if (tab === 'interest') return INTEREST_GROUPS
  if (FACULTIES.length > 0) {
    return FACULTIES.map((name, i) => ({
      id: `faculty-${i}`,
      icon: 'book',
      title: name,
      description: FACULTY_DESCRIPTION,
    }))
  }
  return Array.from({ length: FACULTY_PLACEHOLDER_COUNT }, (_, i) => ({
    id: `faculty-placeholder-${i}`,
    icon: 'book',
    title: COMMUNITY.placeholderLabel,
    placeholder: true,
  }))
}

function CommunitySection({ activeTab, setActiveTab }) {
  const [openGroup, setOpenGroup] = useState(null)
  const groups = getGroups(activeTab)

  const onTabKeyDown = (e, index) => {
    const last = GROUP_TABS.length - 1
    let next = null
    if (e.key === 'ArrowRight') next = index === last ? 0 : index + 1
    if (e.key === 'ArrowLeft') next = index === 0 ? last : index - 1
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    setActiveTab(GROUP_TABS[next].id)
    document.getElementById(`tab-${GROUP_TABS[next].id}`)?.focus()
  }

  return (
    <section id="community" className="section section-alt">
      <div className="container">
        <div className="section-head">
          <h2>{COMMUNITY.heading}</h2>
          <p>{COMMUNITY.subtext}</p>
        </div>

        <div className="tabs-wrap">
          <div className="tabs" role="tablist" aria-label="Group type">
            {GROUP_TABS.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                className="tab"
                aria-selected={activeTab === tab.id}
                aria-controls="community-panel"
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => onTabKeyDown(e, index)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div id="community-panel" role="tabpanel" aria-labelledby={`tab-${activeTab}`} className="card-grid">
          {groups.map((group, i) =>
            group.placeholder ? (
              <div key={group.id} className="card card-placeholder">
                <div className="card-head card-head-static">
                  <IconCircle name={group.icon} tone="muted" />
                  <span className="card-text">
                    <span className="card-title">{group.title}</span>
                  </span>
                </div>
              </div>
            ) : (
              <ExpandCard
                key={group.id}
                id={`group-${group.id}`}
                icon={group.icon}
                tone={TONES[i % TONES.length]}
                title={group.title}
                open={openGroup === group.id}
                onToggle={() => setOpenGroup(openGroup === group.id ? null : group.id)}
              >
                <p>{group.description}</p>
                <a href="#join" className="btn btn-blue btn-inline btn-small">{COMMUNITY.joinLabel}</a>
              </ExpandCard>
            ),
          )}
        </div>

        <div className="subsection">
          <div className="section-head">
            <h3>{COMMUNITY.scenariosHeading}</h3>
            <p>{COMMUNITY.scenariosSubtext}</p>
          </div>
          <div className="scenario-grid">
            {SCENARIOS.map((item, i) => (
              <div className="mini-card" key={item.title}>
                <IconCircle name={item.icon} tone={TONES[i % TONES.length]} />
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="subsection">
          <h3 className="sr-only">{COMMUNITY.comingSoonLabel}</h3>
          <div className="soon-grid">
            {COMING_SOON.map((item) => (
              <div className="mini-card mini-card-soon" key={item.title}>
                <IconCircle name={item.icon} tone="muted" />
                <h4>{item.title}</h4>
                <span className="badge badge-soon">{COMMUNITY.comingSoonLabel}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')
  const [openFeature, setOpenFeature] = useState(null)

  const hasAvailable = FEATURES.some((feature) => feature.status === 'available')
  const statusFilters = STATUS_FILTERS.filter((item) => item.id !== 'available' || hasAvailable)

  const visible = FEATURES.filter(
    (feature) =>
      (category === 'all' || feature.category === category) &&
      (status === 'all' || feature.status === status),
  )

  const reset = () => {
    setCategory('all')
    setStatus('all')
  }

  return (
    <section id="features" className="section">
      <div className="container">
        <div className="section-head">
          <h2>{FEATURES_COPY.heading}</h2>
          <p>{FEATURES_COPY.subtext}</p>
        </div>

        <div className="filters">
          <div className="filter-row" role="group" aria-label={FEATURES_COPY.categoryLabel}>
            <span className="filter-label">{FEATURES_COPY.categoryLabel}</span>
            {FEATURE_CATEGORIES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`chip${item.tone ? ` tone-${item.tone}` : ''}`}
                aria-pressed={category === item.id}
                onClick={() => setCategory(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="filter-row" role="group" aria-label={FEATURES_COPY.statusLabel}>
            <span className="filter-label">{FEATURES_COPY.statusLabel}</span>
            {statusFilters.map((item) => (
              <button
                key={item.id}
                type="button"
                className="chip"
                aria-pressed={status === item.id}
                onClick={() => setStatus(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <p className="count" aria-live="polite">
          Showing {visible.length} of {FEATURES.length}
        </p>

        {visible.length > 0 ? (
          <div className="feature-grid">
            {visible.map((feature) => (
              <ExpandCard
                key={feature.id}
                id={`feature-${feature.id}`}
                icon={feature.icon}
                tone={FEATURE_CATEGORIES.find((c) => c.id === feature.category).tone}
                title={feature.title}
                badge={feature.status}
                line={feature.line}
                open={openFeature === feature.id}
                onToggle={() => setOpenFeature(openFeature === feature.id ? null : feature.id)}
              >
                <p>{feature.details}</p>
              </ExpandCard>
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>{FEATURES_COPY.emptyText}</p>
            <button type="button" className="btn btn-dark" onClick={reset}>
              {FEATURES_COPY.resetLabel}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function FaqList() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="faq">
      <h3>{FAQ_HEADING}</h3>
      <div className="faq-list">
        {FAQS.map((item, i) => (
          <ExpandCard
            key={item.question}
            id={`faq-${i}`}
            title={item.question}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <p>{item.answer}</p>
          </ExpandCard>
        ))}
      </div>
    </div>
  )
}

function ContactSection() {
  const contactEmail = CONTACT_EMAIL.trim()
  const emailReady = contactEmail !== ''
  const [values, setValues] = useState({ name: '', reason: '', message: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!emailReady) return

    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = CONTACT_COPY.errors.name
    if (!values.reason) nextErrors.reason = CONTACT_COPY.errors.reason
    if (!values.message.trim()) nextErrors.message = CONTACT_COPY.errors.message
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const subject = encodeURIComponent(values.reason)
    const body = encodeURIComponent(`Name: ${values.name.trim()}\n\n${values.message.trim()}`)
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <div className="section-head">
          <h2>{CONTACT_COPY.heading}</h2>
          <p>{CONTACT_COPY.subtext}</p>
        </div>

        <div className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {!emailReady && (
              <p className="notice" role="status">{CONTACT_COPY.disabledNote}</p>
            )}
            <fieldset className="form-fields" disabled={!emailReady}>
              <div className="field">
                <label htmlFor="contact-name">{CONTACT_COPY.nameLabel} <span aria-hidden="true">*</span></label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={80}
                  required
                  value={values.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                />
                {errors.name && <p className="field-error" id="contact-name-error">{errors.name}</p>}
              </div>

              <div className="field">
                <label htmlFor="contact-reason">{CONTACT_COPY.reasonLabel} <span aria-hidden="true">*</span></label>
                <select
                  id="contact-reason"
                  name="reason"
                  required
                  value={values.reason}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.reason)}
                  aria-describedby={errors.reason ? 'contact-reason-error' : undefined}
                >
                  <option value="">{CONTACT_COPY.reasonPlaceholder}</option>
                  {CONTACT_REASONS.map((reason) => (
                    <option key={reason.value} value={reason.value}>{reason.value}</option>
                  ))}
                </select>
                {errors.reason && <p className="field-error" id="contact-reason-error">{errors.reason}</p>}
              </div>

              <div className="field">
                <label htmlFor="contact-message">{CONTACT_COPY.messageLabel} <span aria-hidden="true">*</span></label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  maxLength={2000}
                  required
                  value={values.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                ></textarea>
                {errors.message && <p className="field-error" id="contact-message-error">{errors.message}</p>}
              </div>

              <button type="submit" className="btn btn-blue">{CONTACT_COPY.buttonLabel}</button>
            </fieldset>
            {emailReady && <p className="form-note">{CONTACT_COPY.sendNote}</p>}
          </form>

          <aside className="info-card" aria-label={CONTACT_COPY.infoTitle}>
            <h3>{CONTACT_COPY.infoTitle}</h3>
            <ul>
              {CONTACT_REASONS.map((reason) => (
                <li key={reason.title}>
                  <strong>{reason.title}</strong>
                  <p>{reason.help}</p>
                </li>
              ))}
            </ul>
            {emailReady && (
              <div className="info-email">
                <IconCircle name="mail" tone="yellow" />
                <div>
                  <span>{CONTACT_COPY.emailLabel}</span>
                  <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                </div>
              </div>
            )}
          </aside>
        </div>

        <FaqList />
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="logo footer-logo">
            <Logo idPrefix="footer" />
          </div>
          <nav className="footer-links" aria-label="Footer">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ABSU Connect</p>
          <p>{FOOTER_DISCLAIMER}</p>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('level')

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth > 1000) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="app">
      <div className="stage" id="home">
        <div className="glow" aria-hidden="true"></div>
        <span className="dot dot-orange" aria-hidden="true"></span>
        <span className="dot dot-yellow" aria-hidden="true"></span>
        <span className="dot dot-green" aria-hidden="true"></span>
        <span className="dot dot-red" aria-hidden="true"></span>

        <header className="navbar">
          <a href="#home" className="logo" aria-label="ABSU Connect home">
            <Logo idPrefix="nav" />
          </a>

          <nav id="site-nav" className={`nav-links${menuOpen ? ' is-open' : ''}`} aria-label="Main">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-right">
            <a href="#login" className="signin-button">Sign in</a>
            <button
              type="button"
              className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="site-nav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </header>

        <main className="hero">
          <section className="hero-text">
            <h1>
              More Than a University.
              <br />
              We're a Community.
            </h1>

            <p className="hero-description">
              Meet fellow ABSU students, share experiences, discover
              opportunities and build meaningful connections beyond
              the classroom.
            </p>

            <div className="hero-actions" id="join">
              <a href="#signup" className="btn btn-blue">Sign Up</a>
              <a href="#register" className="btn btn-dark">Register</a>
            </div>

            <div className="categories">
              <h2>Choose Your Category</h2>
              <ul>
                {categories.map((name) => (
                  <li key={name}>
                    <a href="#community" onClick={() => setActiveTab('level')}>{name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <aside className="gallery" aria-label="ABSU students">
            {columns.map((col, i) => (
              <div className={`gallery-col col-${i + 1}`} key={i}>
                {col.map((photo, j) => (
                  <div className={`pill pill-${photo.color}`} key={j}>
                    <img src={photo.src} alt={photo.alt} decoding="async" />
                  </div>
                ))}
              </div>
            ))}
          </aside>
        </main>
      </div>

      <AboutSection />
      <CommunitySection activeTab={activeTab} setActiveTab={setActiveTab} />
      <FeaturesSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default App
