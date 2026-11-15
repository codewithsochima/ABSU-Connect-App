
import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from '../authStorage'

function ProtectedRoute() {
  const token = getToken()

  if (!token) {
    return <Navigate to="/signin" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
