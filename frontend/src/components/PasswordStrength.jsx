
function PasswordStrength({ password = '' }) {
  const checks = [
    password.length >= 8,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ]

  const score = checks.filter(Boolean).length

  const levels = [
    { label: 'Very weak', color: '#e56b6f' },
    { label: 'Weak', color: '#e58a45' },
    { label: 'Fair', color: '#e5b84c' },
    { label: 'Good', color: '#8e9dcb' },
    { label: 'Strong', color: '#58b88a' },
  ]

  const strength = password.length === 0
    ? null
    : levels[score]

  return (
    <div className="password-strength">
      <div className="strength-bars" aria-hidden="true">
        {levels.map((level, index) => (
          <span
            key={level.label}
            className="strength-bar"
            style={{
              background:
                index < score ? strength.color : 'rgba(255,255,255,0.12)',
            }}
          />
        ))}
      </div>

      <div className="strength-details">
        <span>Password strength</span>

        <strong style={{ color: strength?.color || 'inherit' }}>
          {strength?.label || 'Enter a password'}
        </strong>
      </div>

      <ul className="strength-requirements">
        <li className={checks[0] ? 'met' : ''}>At least 8 characters</li>
        <li className={checks[1] ? 'met' : ''}>Uppercase and lowercase letters</li>
        <li className={checks[2] ? 'met' : ''}>At least one number</li>
        <li className={checks[3] ? 'met' : ''}>At least one special character</li>
      </ul>
    </div>
  )
}

export default PasswordStrength
