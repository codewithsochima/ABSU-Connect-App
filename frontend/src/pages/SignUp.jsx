
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import AuthSuccess from '../components/AuthSuccess'
import PasswordField from '../components/PasswordField'
import PasswordStrength from '../components/PasswordStrength'
import TextField from '../components/TextField'
import { registerStudent } from '../api'
import { saveToken } from '../authStorage'
import { LEVELS, validateSignUp } from '../validation'

const COPY = {
  pageTitle: 'Create account',
  headline: 'Your place in the ABSU community starts here.',
  description:
    "Create your account with your ABSU details. We're still building groups, the community feed and more.",
  title: 'Create your account',
  subtitle: 'All fields are required.',
  submit: 'Create account',
  submitting: 'Creating account…',
  switchText: 'Already have an account?',
  switchLink: 'Sign in',
  successNote: "ABSU Connect hasn't launched yet, so there's no member area to open. We're still building it.",
  duplicateEmail: 'This email is already registered. Try signing in instead.',
}

const INITIAL_VALUES = {
  fullName: '',
  email: '',
  department: '',
  faculty: '',
  level: '',
  password: '',
  confirmPassword: '',
}

const FIELD_IDS = {
  fullName: 'signup-fullName',
  email: 'signup-email',
  department: 'signup-department',
  faculty: 'signup-faculty',
  level: 'signup-level-100',
  password: 'signup-password',
  confirmPassword: 'signup-confirmPassword',
}

function SignUp() {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [status, setStatus] = useState('idle')
  const [welcomeName, setWelcomeName] = useState('')
  const [serverMessage, setServerMessage] = useState('')

  const isLoading = status === 'loading'

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }))
  }

  const focusField = (name) => {
    document.getElementById(FIELD_IDS[name])?.focus()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isLoading) return

    const foundErrors = validateSignUp(values)
    setErrors(foundErrors)
    setFormError('')

    const firstInvalid = Object.keys(FIELD_IDS).find((name) => foundErrors[name])
    if (firstInvalid) {
      focusField(firstInvalid)
      return
    }

    setStatus('loading')

    try {
      const data = await registerStudent({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        password: values.password,
        department: values.department.trim(),
        faculty: values.faculty.trim(),
        level: values.level,
      })

      saveToken(data.token)
      setWelcomeName(data.student?.fullName?.split(' ')[0] || '')
      setServerMessage(data.message)
      setValues(INITIAL_VALUES)
      setStatus('success')
    } catch (error) {
      if (error.status === 409) {
        setErrors({ email: COPY.duplicateEmail })
        focusField('email')
      } else {
        setFormError(error.message)
      }
      setStatus('idle')
    }
  }

  return (
    <AuthLayout
      pageTitle={COPY.pageTitle}
      headline={COPY.headline}
      description={COPY.description}
      activeStep={0}
    >
      {status === 'success' ? (
        <AuthSuccess
          title={welcomeName ? `You're registered, ${welcomeName}.` : "You're registered."}
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
              id={FIELD_IDS.fullName}
              name="fullName"
              label="Full name"
              type="text"
              autoComplete="name"
              maxLength={80}
              placeholder="Chinedu Okafor"
              value={values.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />

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

            <div className="form-row">
              <TextField
                id={FIELD_IDS.department}
                name="department"
                label="Department"
                type="text"
                maxLength={80}
                placeholder="Computer Science"
                value={values.department}
                onChange={handleChange}
                error={errors.department}
              />
              <TextField
                id={FIELD_IDS.faculty}
                name="faculty"
                label="Faculty"
                type="text"
                maxLength={80}
                placeholder="Your faculty"
                value={values.faculty}
                onChange={handleChange}
                error={errors.faculty}
              />
            </div>

            <fieldset
              className="level-field"
              aria-describedby={errors.level ? 'signup-level-error' : undefined}
            >
              <legend>Level</legend>
              <div className="level-grid">
                {LEVELS.map((level) => (
                  <label className="level-chip" key={level}>
                    <input
                      id={`signup-level-${level}`}
                      type="radio"
                      name="level"
                      value={level}
                      checked={values.level === level}
                      onChange={handleChange}
                    />
                    <span>{level} Level</span>
                  </label>
                ))}
              </div>
              {errors.level && <p className="field-error" id="signup-level-error">{errors.level}</p>}
            </fieldset>

            <div className="form-row">
              <PasswordField
                id={FIELD_IDS.password}
                name="password"
                label="Password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={values.password}
                onChange={handleChange}
                error={errors.password}
              >
                <PasswordStrength password={values.password} />
              </PasswordField>
              <PasswordField
                id={FIELD_IDS.confirmPassword}
                name="confirmPassword"
                label="Confirm password"
                autoComplete="new-password"
                placeholder="Repeat your password"
                value={values.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />
            </div>

            {formError && <p className="form-alert" role="alert">{formError}</p>}

            <button type="submit" className="submit" disabled={isLoading}>
              {isLoading && <span className="spinner" aria-hidden="true"></span>}
              {isLoading ? COPY.submitting : COPY.submit}
            </button>
          </div>

          <p className="switch-line">
            {COPY.switchText} <Link to="/signin">{COPY.switchLink}</Link>
          </p>
        </form>
      )}
    </AuthLayout>
  )
}

export default SignUp
