
const TOKEN_KEY = 'absu_connect_token'
const EMAIL_KEY = 'absu_connect_remembered_email'

export function saveToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function removeToken() {
  sessionStorage.removeItem(TOKEN_KEY)
}

export function rememberEmail(email) {
  localStorage.setItem(EMAIL_KEY, email)
}

export function getRememberedEmail() {
  return localStorage.getItem(EMAIL_KEY) || ''
}

export function forgetEmail() {
  localStorage.removeItem(EMAIL_KEY)
}
