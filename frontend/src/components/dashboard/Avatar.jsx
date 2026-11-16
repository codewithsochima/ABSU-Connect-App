
import { useState } from 'react'
import { getInitials, isSafeImageUrl } from '../../utils/profileHelpers'

function Avatar({ name, src, size = 'md' }) {
  const [failedSrc, setFailedSrc] = useState('')
  const showImage = isSafeImageUrl(src) && failedSrc !== src

  return (
    <span className={`dash-avatar dash-avatar-${size}`} aria-hidden="true">
      {showImage ? (
        <img
          src={src}
          alt=""
          referrerPolicy="no-referrer"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </span>
  )
}

export default Avatar
