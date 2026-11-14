
function AuthSuccess({ title, message, note }) {
  return (
    <div
      className="auth-success"
      role="status"
      aria-live="polite"
      style={{
        textAlign: 'center',
        padding: '32px 20px',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          margin: '0 auto 22px',
          borderRadius: '50%',
          background: 'rgba(246, 191, 30, 0.14)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f6bf1e"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <h2 style={{ marginBottom: '12px' }}>
        {title || 'Success!'}
      </h2>

      <p style={{ marginBottom: '12px' }}>
        {message}
      </p>

      {note && (
        <p style={{ opacity: 0.75, lineHeight: 1.7 }}>
          {note}
        </p>
      )}
    </div>
  )
}

export default AuthSuccess
