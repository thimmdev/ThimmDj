import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Sobre',   href: '#sobre'   },
  { label: 'Música',  href: '#musica'  },
  { label: 'Shows',   href: '#shows'   },
  { label: 'Fotos',   href: '#fotos'   },
  { label: 'Contato', href: '#contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Trava o scroll quando menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <>
      <header
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          right:           0,
          height:          'var(--nav-height)',
          zIndex:          'var(--z-nav)',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
          paddingInline:   'var(--spacing-container-x)',
          background:      scrolled ? 'var(--color-nav-bg-solid)' : 'var(--color-nav-bg-transparent)',
          borderBottom:    scrolled ? '0.5px solid var(--color-nav-border)' : '0.5px solid transparent',
          transition:      'var(--nav-transition)',
          backdropFilter:  scrolled ? 'blur(12px)' : 'none',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'var(--nav-logo-size)',
            color:         'var(--color-text-primary)',
            letterSpacing: 'var(--tracking-wider)',
          }}
        >
          THIMM
        </a>

        {/* Links desktop */}
        <nav
          style={{
            display:    'flex',
            gap:        '32px',
            alignItems: 'center',
          }}
          className="hidden md:flex"
        >
          {navLinks.map(link => (
            <a key={link.href} href={link.href} style={linkStyle} className="nav-link">
              {link.label}
            </a>
          ))}
          <a href="#contato" style={ctaStyle}>
            Contratar
          </a>
        </nav>

        {/* Hambúrguer mobile */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="flex md:hidden"
          style={{ color: 'var(--color-text-primary)', padding: '8px' }}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <line x1="3" y1="3" x2="19" y2="19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="19" y1="3" x2="3" y2="19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <line x1="3" y1="6"  x2="19" y2="6"  stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="3" y1="11" x2="19" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="3" y1="16" x2="19" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </header>

      {/* Menu mobile overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        aria-hidden={!menuOpen}
        style={{
          position:   'fixed',
          inset:      0,
          zIndex:     999,
          background: 'var(--color-bg-overlay)',
          display:    'flex',
          flexDirection: 'column',
          alignItems:    'center',
          justifyContent:'center',
          gap:        '40px',
          opacity:    menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={handleLinkClick}
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      '52px',
              color:         'var(--color-text-primary)',
              letterSpacing: 'var(--tracking-wider)',
              opacity:       menuOpen ? 1 : 0,
              transform:     menuOpen ? 'translateY(0)' : 'translateY(16px)',
              transition:    `opacity 0.4s ease ${i * 60}ms, transform 0.4s ease ${i * 60}ms`,
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contato"
          onClick={handleLinkClick}
          style={{
            ...ctaStyle,
            fontSize: '16px',
            padding:  '14px 40px',
            marginTop:'8px',
          }}
        >
          Contratar
        </a>
      </div>
    </>
  )
}

const linkStyle = {
  fontFamily:     'var(--font-body)',
  fontSize:       'var(--font-size-nav)',
  fontWeight:     'var(--font-weight-medium)',
  color:          'var(--color-text-primary)',
  textTransform:  'uppercase',
  letterSpacing:  'var(--tracking-wide)',
  textDecoration: 'none',
  position:       'relative',
  paddingBottom:  '2px',
}

const ctaStyle = {
  fontFamily:    'var(--font-body)',
  fontSize:      'var(--font-size-nav)',
  fontWeight:    'var(--font-weight-medium)',
  color:         'var(--color-text-primary)',
  textTransform: 'uppercase',
  letterSpacing: 'var(--tracking-wide)',
  border:        '0.5px solid rgba(255,255,255,0.5)',
  padding:       '8px 20px',
  borderRadius:  'var(--radius-sm)',
  transition:    'background 0.2s ease, color 0.2s ease',
  textDecoration: 'none',
}