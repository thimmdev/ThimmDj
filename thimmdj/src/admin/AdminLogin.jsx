import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminLogin() {
  const { signIn } = useAuth()
  const navigate   = useNavigate()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await signIn(email, password)
    setLoading(false)
    if (err) { setError('Email ou senha inválidos.'); return }
    navigate('/admin')
  }

  return (
    <div style={{
      minHeight:      '100vh',
      background:     '#0a0a0a',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      padding:        '24px',
      cursor:         'auto',
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      '48px',
          color:         '#ffffff',
          letterSpacing: '0.15em',
          marginBottom:  '8px',
        }}>
          THIMM
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '48px' }}>
          Painel Administrativo
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelSt}>Email</label>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              style={inputSt} placeholder="seu@email.com"
              onFocus={e => { e.target.style.borderBottomColor = '#fff' }}
              onBlur={e  => { e.target.style.borderBottomColor = 'rgba(255,255,255,0.2)' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelSt}>Senha</label>
            <input
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              style={inputSt} placeholder="••••••••"
              onFocus={e => { e.target.style.borderBottomColor = '#fff' }}
              onBlur={e  => { e.target.style.borderBottomColor = 'rgba(255,255,255,0.2)' }}
            />
          </div>

          {error && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#ff6b6b' }}>{error}</p>
          )}

          <button type="submit" disabled={loading} style={{
            background:    loading ? 'rgba(255,255,255,0.5)' : '#ffffff',
            color:         '#0a0a0a',
            border:        'none',
            fontFamily:    'var(--font-display)',
            fontSize:      '18px',
            letterSpacing: '0.1em',
            padding:       '16px',
            cursor:        loading ? 'not-allowed' : 'pointer',
            transition:    'opacity 0.2s',
          }}>
            {loading ? 'ENTRANDO...' : 'ENTRAR'}
          </button>
        </form>
      </div>
    </div>
  )
}

const labelSt = {
  fontFamily: 'var(--font-body)', fontSize: '11px', color: '#555',
  textTransform: 'uppercase', letterSpacing: '0.15em',
}
const inputSt = {
  background: 'transparent', border: 'none',
  borderBottom: '0.5px solid rgba(255,255,255,0.2)',
  color: '#fff', fontFamily: 'var(--font-body)', fontSize: '15px',
  padding: '10px 0', outline: 'none',
  transition: 'border-color 0.2s',
}
