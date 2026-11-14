
import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from './icons'

function PasswordField({ id, label, error, children, ...inputProps }) {
  const [visible, setVisible] = useState(false)
  const errorId = `${id}-error`

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrap">
        <input
          id={id}
          className="input"
          type={visible ? 'text' : 'password'}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
        />
        <button
          type="button"
          className="toggle"
          aria-label={`${visible ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      {error && <p className="field-error" id={errorId}>{error}</p>}
      {children}
    </div>
  )
}

export default PasswordField
