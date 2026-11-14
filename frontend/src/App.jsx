
import './App.css'

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

function App() {
  return (
    <div className="app">
      <div className="glow" aria-hidden="true"></div>
      <span className="dot dot-orange" aria-hidden="true"></span>
      <span className="dot dot-yellow" aria-hidden="true"></span>
      <span className="dot dot-green" aria-hidden="true"></span>
      <span className="dot dot-red" aria-hidden="true"></span>

      <header className="navbar">
        <a href="#home" className="logo" aria-label="ABSU Connect home">
          <svg className="logo-mark" viewBox="0 0 64 72" aria-hidden="true">
            <defs>
              <linearGradient id="logoShield" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2f20a8" />
                <stop offset="1" stopColor="#1b0f66" />
              </linearGradient>
              <linearGradient id="logoDiamond" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#35b2ff" />
                <stop offset="1" stopColor="#0580de" />
              </linearGradient>
            </defs>
            <path d="M4 6Q32 0 60 6V36C60 54 44 66 32 71C20 66 4 54 4 36Z" fill="url(#logoShield)" stroke="#b08d74" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M4 14Q32 8 60 14" fill="none" stroke="#b08d74" strokeWidth="2.5" />
            <path d="M32 16L54 40L32 64L10 40Z" fill="url(#logoDiamond)" stroke="#b08d74" strokeWidth="2.5" strokeLinejoin="round" />
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
        </a>

        <nav className="nav-links" aria-label="Main">
          <a href="#about">About</a>
          <a href="#community">Community</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#login" className="signin-button">Sign in</a>
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

          <div className="hero-actions">
            <a href="#signup" className="btn btn-blue">Sign Up</a>
            <a href="#register" className="btn btn-dark">Register</a>
          </div>

          <div className="categories">
            <h2>Choose Your Category</h2>
            <ul>
              {categories.map((name) => (
                <li key={name}>
                  <a href={`#${name.toLowerCase().replace(' ', '-')}`}>
                    {name}
                  </a>
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
                  <img src={photo.src} alt={photo.alt} />
                </div>
              ))}
            </div>
          ))}
        </aside>
      </main>
    </div>
  )
}

export default App
