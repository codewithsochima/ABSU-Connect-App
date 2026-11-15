
import { getToken } from './authStorage'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

async function sendRequest(endpoint, data, method = 'POST', authenticated = false) {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (authenticated) {
    const token = getToken()

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    ...(data !== undefined ? { body: JSON.stringify(data) } : {}),
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

export function getStudentProfile() {
  return sendRequest('/profile', undefined, 'GET', true)
}

export function updateStudentProfile(profileData) {
  return sendRequest('/profile', profileData, 'PUT', true)
}
