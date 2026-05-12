const linkStyle = {
  fontFamily:    'var(--font-body)',
  fontSize:      '12px',
  textTransform: 'uppercase',
  letterSpacing: 'var(--tracking-wide)',
  color:         'var(--color-text-hint)',
  textDecoration:'none',
  transition:    'color var(--duration-fast) var(--ease-out)',
}

const navLinks = [
  { label: 'Sobre',   href: '#sobre'   },
  { label: 'Música',  href: '#musica'  },
  { label: 'Shows',   href: '#shows'   },
  { label: 'Fotos',   href: '#fotos'   },
  { label: 'Contato', href: '#contato' },
]

const socials = [
  {
    label: 'Instagram',
    href:  'https://instagram.com/djthimm',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Soundcloud',
    href:  'https://soundcloud.com/djthimm',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.175 12.225c-.017.06-.028.12-.028.187 0 .067.011.127.028.187.017.06.044.11.082.152.038.043.088.08.148.105.06.025.126.038.198.038h.428v-1.437h-.428c-.072 0-.138.013-.198.038-.06.025-.11.062-.148.105-.038.043-.065.092-.082.153zm2.44-.65h-.393v2.5h.393c.196 0 .355-.159.355-.355V11.93c0-.196-.159-.355-.355-.355zM11 6c-3.314 0-6 2.686-6 6 0 .34.029.674.085 1h11.83c.056-.326.085-.66.085-1 0-3.314-2.686-6-6-6zm8 7H5v.5c0 2.485 2.015 4.5 4.5 4.5h5c2.485 0 4.5-2.015 4.5-4.5V13z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background:  '#000000',
        paddingTop:  '60px',
        paddingBottom:'40px',
        borderTop:   '0.5px solid var(--color-border-subtle)',
      }}
    >
      <div className="container">
        {/* Grid principal */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-12"
          style={{ paddingBottom: '48px', borderBottom: '0.5px solid var(--color-border-subtle)' }}
        >
          {/* Marca */}
          <div>
            <h4
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      '28px',
                color:         'var(--color-text-primary)',
                letterSpacing: 'var(--tracking-wider)',
                textTransform: 'uppercase',
              }}
            >
              THIMM
            </h4>
            <p
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '12px',
                color:         'var(--color-text-hint)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-wide)',
                marginTop:     '8px',
              }}
            >
              DJ · Melodic Techno · Florianópolis, SC
            </p>
          </div>

          {/* Links de navegação */}
          <div
            className="flex sm:flex-col sm:items-center gap-4 flex-wrap"
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                style={linkStyle}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-text-primary)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-hint)' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex flex-col sm:items-end gap-4">
            <p
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '11px',
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-wider)',
                color:         'var(--color-text-hint)',
              }}
            >
              Redes Sociais
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  style={{
                    color:      'var(--color-text-primary)',
                    transition: 'opacity var(--duration-fast) var(--ease-out)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.5' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            display:       'flex',
            justifyContent:'space-between',
            alignItems:    'center',
            paddingTop:    '32px',
            flexWrap:      'wrap',
            gap:           '8px',
          }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-text-hint)' }}>
            © {year} DJ THIMM. Todos os direitos reservados.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-text-hint)' }}>
            Site por{' '}
            <a
              href="#"
              style={{ color: 'var(--color-text-hint)', textDecoration: 'none', transition: 'color var(--duration-fast)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-text-primary)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-hint)' }}
            >
              Thiago Machado
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
