const styles = {
  base: {
    display:       'inline-block',
    fontFamily:    'var(--font-body)',
    fontSize:      '13px',
    fontWeight:    'var(--font-weight-medium)',
    textTransform: 'uppercase',
    letterSpacing: 'var(--tracking-widest)',
    paddingBlock:  'var(--spacing-btn-y)',
    paddingInline: 'var(--spacing-btn-x)',
    borderRadius:  'var(--radius-sm)',
    textDecoration: 'none',
    cursor:        'pointer',
    whiteSpace:    'nowrap',
    transition:    'background var(--duration-normal) var(--ease-out), color var(--duration-normal) var(--ease-out), border-color var(--duration-normal) var(--ease-out)',
    lineHeight:    1,
  },
  outline: {
    background: 'transparent',
    color:      'var(--color-btn-outline-text)',
    border:     '1px solid var(--color-btn-outline-border)',
  },
  outlineHover: {
    background: 'var(--color-btn-outline-hover-bg)',
    color:      'var(--color-btn-outline-hover-text)',
  },
  filled: {
    background: 'var(--color-btn-filled-bg)',
    color:      'var(--color-btn-filled-text)',
    border:     '1px solid var(--color-btn-filled-bg)',
  },
  filledHover: {
    background: 'var(--color-btn-filled-hover-bg)',
    color:      'var(--color-btn-filled-hover-text)',
    border:     '1px solid var(--color-btn-outline-border)',
  },
}

export default function Button({ variant = 'outline', href, onClick, children, style: extraStyle }) {
  const variantStyle  = styles[variant]
  const hoverStyle    = styles[`${variant}Hover`]
  const combined      = { ...styles.base, ...variantStyle, ...extraStyle }

  const handleEnter = e => Object.assign(e.currentTarget.style, hoverStyle)
  const handleLeave = e => Object.assign(e.currentTarget.style, variantStyle)

  if (href) {
    return (
      <a href={href} style={combined} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} style={combined} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {children}
    </button>
  )
}
