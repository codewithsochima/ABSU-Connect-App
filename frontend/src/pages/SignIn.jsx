
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import AuthSuccess from '../components/AuthSuccess'
import PasswordField from '../components/PasswordField'
import TextField from '../components/TextField'
import { loginStudent } from '../api'
import { forgetEmail, getRememberedEmail, rememberEmail, saveToken } from '../authStorage'
import { validateSignIn } from '../validation'

const COPY = {
  pageTitle: 'Sign in',
  headline: 'Welcome back to the community.',
  description: 'Sign in with the email and password you registered with.',
  title: 'Sign in',
  subtitle: 'Enter your details to continue.',
  submit: 'Sign in',
  submitting: 'Signing in…',
  rememberLabel: 'Remember my email on this device',
  forgotLabel: 'Forgot password?',
  forgotNote: "Password recovery isn't available yet.",
  switchText: "Don't have an account?",
  switchLink: 'Sign up',
  successNote: "ABSU Connect hasn't launched yet, so there's no member area to open. We're still building it.",
}

const FIELD_IDS = {
  email: 'signin-email',
  password: 'signin-password',
}

function SignIn() {
  const [rememberedEmail] = useState(getRememberedEmail)
  const [values, setValues] = useState({ email: rememberedEmail, password: '' })
  const [rememberMe, setRememberMe] = useState(Boolean(rememberedEmail))
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [showForgotNote, setShowForgotNote] = useState(false)
  const [status, setStatus] = useState('idle')
  const [welcomeName, setWelcomeName] = useState('')
  const [serverMessage, setServerMessage] = useState('')

  const isLoading = status === 'loading'

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isLoading) return

    const foundErrors = validateSignIn(values)
    setErrors(foundErrors)
    setFormError('')

    const firstInvalid = Object.keys(FIELD_IDS).find((name) => foundErrors[name])
    if (firstInvalid) {
      document.getElementById(FIELD_IDS[firstInvalid])?.focus()
      return
    }

    setStatus('loading')

    try {
      const email = values.email.trim()
      const data = await loginStudent({ email, password: values.password })

      saveToken(data.token)
      if (rememberMe) rememberEmail(email)
      else forgetEmail()

      setWelcomeName(data.student?.fullName?.split(' ')[0] || '')
      setServerMessage(data.message)
      setValues({ email: '', password: '' })
      setStatus('success')
    } catch (error) {
      setFormError(error.message)
      setStatus('idle')
    }
  }

  return (
    <AuthLayout
      pageTitle={COPY.pageTitle}
      headline={COPY.headline}
      description={COPY.description}
    >
      {status === 'success' ? (
        <AuthSuccess
          title={welcomeName ? `Signed in, ${welcomeName}.` : 'Signed in.'}
          message={serverMessage}
          note={COPY.successNote}
        />
      ) : (
        <form className="form" onSubmit={handleSubmit} noValidate aria-busy={isLoading}>
          <header className="form-head">
            <h1 className="form-title">{COPY.title}</h1>
            <p className="form-sub">{COPY.subtitle}</p>
          </header>

          <div className="form-fields">
            <TextField
              id={FIELD_IDS.email}
              name="email"
              label="Email address"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="name@example.com"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
            />

            <PasswordField
              id={FIELD_IDS.password}
              name="password"
              label="Password"
              autoComplete="current-password"
              placeholder="Your password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
            />

            <div className="form-meta">
              <label className="check">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span className="check-box" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="auth-icon">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                {COPY.rememberLabel}
              </label>
              <button
                type="button"
                className="link-button"
                aria-expanded={showForgotNote}
                onClick={() => setShowForgotNote((current) => !current)}
              >
                {COPY.forgotLabel}
              </button>
            </div>

            {showForgotNote && <p className="form-note" role="status">{COPY.forgotNote}</p>}

            {formError && <p className="form-alert" role="alert">{formError}</p>}

            <button type="submit" className="submit" disabled={isLoading}>
              {isLoading && <span className="spinner" aria-hidden="true"></span>}
              {isLoading ? COPY.submitting : COPY.submit}
            </button>
          </div>

          <p className="switch-line">
            {COPY.switchText} <Link to="/signup">{COPY.switchLink}</Link>
          </p>
        </form>
      )}
    </AuthLayout>
  )
}

export default SignIn
