
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

async function sendRequest(endpoint, data) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(
      result.message || 'Something went wrong. Please try again.'
    )

    error.status = response.status
    throw error
  }

  return result
}

export function registerStudent(studentData) {
  return sendRequest('/auth/register', studentData)
}

export function loginStudent(credentials) {
  return sendRequest('/auth/login', credentials)
}

