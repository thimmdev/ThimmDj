import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

import { AuthProvider }   from './context/AuthContext'
import ProtectedRoute     from './admin/ProtectedRoute'
import AdminLayout        from './admin/AdminLayout'
import AdminLogin         from './admin/AdminLogin'
import AdminEvents        from './admin/pages/AdminEvents'
import AdminMixes         from './admin/pages/AdminMixes'
import AdminTestimonials  from './admin/pages/AdminTestimonials'
import AdminHero          from './admin/pages/AdminHero'
import AdminContacts      from './admin/pages/AdminContacts'
import App                from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="events" replace />} />
            <Route path="events"       element={<AdminEvents />} />
            <Route path="mixes"        element={<AdminMixes />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="hero"         element={<AdminHero />} />
            <Route path="contacts"     element={<AdminContacts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
