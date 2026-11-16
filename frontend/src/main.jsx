
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ScrollManager from './components/ScrollManager.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { NAV_ITEMS } from './components/dashboard/navItems.js'
import ComingSoonPage from './pages/dashboard/ComingSoonPage.jsx'
import DashboardHome from './pages/dashboard/DashboardHome.jsx'
import DashboardLayout from './pages/dashboard/DashboardLayout.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />

            {NAV_ITEMS.filter((item) => item.path).map((item) => (
              <Route
                key={item.id}
                path={item.path}
                element={<ComingSoonPage item={item} />}
              />
            ))}

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
