
export const LEVELS = ['100', '200', '300', '400', '500', '600']

export function validateSignUp(values) {
  const errors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'Please enter your full name.'
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!values.department.trim()) {
    errors.department = 'Please enter your department.'
  }

  if (!values.faculty.trim()) {
    errors.faculty = 'Please enter your faculty.'
  }

  if (!values.level) {
    errors.level = 'Please select your level.'
  }

  if (!values.password) {
    errors.password = 'Please create a password.'
  } else if (values.password.length < 8) {
    errors.password = 'Password must contain at least 8 characters.'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.'
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  return errors
}

export function validateSignIn(values) {
  const errors = {}

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!values.password) {
    errors.password = 'Please enter your password.'
  }

  return errors
}
