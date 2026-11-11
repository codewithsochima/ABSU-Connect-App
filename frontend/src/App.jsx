
import './App.css'

function App() {
  return (
    <div className="app">

      {/* Background overlay */}
      <div className="background-overlay"></div>

      {/* Navigation */}
      <header className="navbar">

        <div className="brand">
          <div className="brand-logo">ABSU</div>
          <span className="brand-name">ABSU Connect</span>
        </div>

        <nav className="nav-actions">
          <a href="#login" className="nav-button login-button">
            Login
          </a>

          <a href="#signup" className="nav-button signup-button">
            Join Community
          </a>
        </nav>

      </header>

      {/* Main landing page */}
      <main className="landing-content">

        {/* Left side: Welcome text */}
        <section className="hero-section">

          <span className="hero-label">
            ABIA STATE UNIVERSITY · UTURU
          </span>

          <h1 className="hero-title">
            More Than a
            <br />
            University.
            <br />
            <span className="hero-highlight">
              We're a Community.
            </span>
          </h1>

          <p className="hero-description">
            Meet fellow ABSU students, share experiences,
            discover opportunities and build meaningful
            connections beyond the classroom.
          </p>

          <div className="hero-actions">

            <a href="#signup" className="hero-button primary-button">
              Get Started <span>→</span>
            </a>

            <a href="#login" className="hero-button secondary-button">
              I Have an Account
            </a>

          </div>

          <div className="hero-note">
            <span className="online-dot"></span>
            Made for the ABSU student community
          </div>

        </section>

        {/* Right side: Student photographs */}
        <section className="student-gallery">

          <div className="student-photo photo-one">
            <img
              src="/images/students-together.png"
              alt="Two Nigerian university students"
            />
          </div>

          <div className="student-photo photo-two">
            <img
              src="/images/students.jpg"
              alt="Nigerian university student"
            />
          </div>

          <div className="student-photo photo-three">
            <img
              src="/images/student.jpg"
              alt="Nigerian university student"
            />
          </div>

          <div className="student-photo photo-four">
            <img
              src="/images/graduate.png"
              alt="Nigerian university graduate"
            />
          </div>

          <div className="gallery-caption">
            <span>ABSU STUDENTS</span>
            <p>One campus. Many stories.</p>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} ABSU Connect. Built for our community.
      </footer>

    </div>
  )
}

export default App
