import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { label: 'Eventos',      path: '/admin/events'       },
  { label: 'Mixes',        path: '/admin/mixes'        },
  { label: 'Depoimentos',  path: '/admin/testimonials' },
  { label: 'Hero',         path: '/admin/hero'         },
  { label: 'Formulários',  path: '/admin/contacts'     },
]

export default function AdminLayout() {
  const { signOut } = useAuth()
  const navigate    = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', cursor: 'auto' }}>
      {/* Sidebar */}
      <aside style={{
        width:        '220px',
        flexShrink:   0,
        background:   '#0f0f0f',
        borderRight:  '0.5px solid rgba(255,255,255,0.08)',
        display:      'flex',
        flexDirection:'column',
        padding:      '32px 0',
        position:     'fixed',
        top:          0,
        bottom:       0,
        left:         0,
        zIndex:       100,
      }}>
        <div style={{ padding: '0 24px 32px', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: '#fff', letterSpacing: '0.15em' }}>THIMM</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#444', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '4px' }}>Admin</p>
        </div>

        <nav style={{ flex: 1, padding: '24px 0' }}>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display:       'block',
                padding:       '11px 24px',
                fontFamily:    'var(--font-body)',
                fontSize:      '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color:         isActive ? '#ffffff' : '#555',
                textDecoration:'none',
                borderLeft:    isActive ? '2px solid #fff' : '2px solid transparent',
                background:    isActive ? 'rgba(255,255,255,0.04)' : 'transparent',
                transition:    'color 0.2s, background 0.2s',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '0 24px', borderTop: '0.5px solid rgba(255,255,255,0.06)', paddingTop: '24px' }}>
          <button
            onClick={handleSignOut}
            style={{
              width:         '100%',
              background:    'transparent',
              border:        '0.5px solid rgba(255,255,255,0.2)',
              color:         '#555',
              fontFamily:    'var(--font-body)',
              fontSize:      '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding:       '10px',
              cursor:        'pointer',
              transition:    'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
          >
            Sair
          </button>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            style={{
              display:       'block',
              marginTop:     '12px',
              fontFamily:    'var(--font-body)',
              fontSize:      '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color:         '#333',
              textDecoration:'none',
              textAlign:     'center',
              transition:    'color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#888' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#333' }}
          >
            Ver site →
          </a>
        </div>
      </aside>

      {/* Content */}
      <main style={{ marginLeft: '220px', flex: 1, padding: '48px', minHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  )
}
