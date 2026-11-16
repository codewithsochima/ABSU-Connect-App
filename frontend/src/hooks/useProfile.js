
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStudentProfile } from '../api'
import { removeToken } from '../authStorage'

const NETWORK_MESSAGE =
  "We couldn't reach the server. Check your internet connection and try again."

export function useProfile() {
  const navigate = useNavigate()
  const [state, setState] = useState({
    status: 'loading',
    profile: null,
    error: '',
  })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false

    getStudentProfile()
      .then((result) => {
        if (ignore) return

        const student = result?.student

        if (!student) {
          setState({
            status: 'error',
            profile: null,
            error:
              'We received an unexpected response from the server. Please try again.',
          })
          return
        }

        setState({
          status: 'ready',
          profile: student,
          error: '',
        })
      })
      .catch((error) => {
        if (ignore) return

        if (error?.status === 401) {
          removeToken()
          navigate('/signin', {
            replace: true,
            state: { reason: 'session-expired' },
          })
          return
        }

        if (error?.status === 404) {
          removeToken()
          navigate('/signin', {
            replace: true,
            state: { reason: 'account-unavailable' },
          })
          return
        }

        setState({
          status: 'error',
          profile: null,
          error: error?.status
            ? error.message || 'The server returned an error. Please try again.'
            : NETWORK_MESSAGE,
        })
      })

    return () => {
      ignore = true
    }
  }, [attempt, navigate])

  const retry = useCallback(() => {
    setState({
      status: 'loading',
      profile: null,
      error: '',
    })
    setAttempt((count) => count + 1)
  }, [])

  return { ...state, retry }
}
