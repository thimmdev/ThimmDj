import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: '#fff', letterSpacing: '0.2em' }}>
        THIMM
      </p>
    </div>
  )

  if (!user) return <Navigate to="/admin/login" replace />
  return children
}
