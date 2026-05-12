import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EventModal({ event, onClose }) {
  useEffect(() => {
    if (!event) return
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [event, onClose])

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            style={{ background: '#141414', border: '0.5px solid rgba(255,255,255,0.12)', width: '100%', maxWidth: '560px', overflow: 'hidden' }}
          >
            {/* Flyer */}
            {event.flyer_url && (
              <div style={{ position: 'relative', aspectRatio: '16/7', overflow: 'hidden' }}>
                <img
                  src={event.flyer_url}
                  alt={event.venue}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(20,20,20,0.95) 100%)' }} />
              </div>
            )}

            <div style={{ padding: '32px' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '6px' }}>
                    {event.city}
                  </p>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: '#fff', letterSpacing: '0.02em', lineHeight: 1 }}>
                    {event.venue}
                  </h2>
                </div>
                <button onClick={onClose} aria-label="Fechar" style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '20px', lineHeight: 1, padding: '4px', flexShrink: 0 }}>✕</button>
              </div>

              {/* Divider */}
              <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.08)', marginBottom: '24px' }} />

              {/* Detalhes */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <Detail label="Data" value={event.date_label} />
                {event.price && <Detail label="Ingresso" value={event.price} />}
              </div>

              {event.description && (
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#aaa', lineHeight: 1.7, marginBottom: '28px' }}>
                  {event.description}
                </p>
              )}

              {/* CTA */}
              {event.ticket_url && event.ticket_url !== '#' ? (
                <a
                  href={event.ticket_url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display:       'block',
                    width:         '100%',
                    textAlign:     'center',
                    background:    '#ffffff',
                    color:         '#0a0a0a',
                    fontFamily:    'var(--font-display)',
                    fontSize:      '18px',
                    letterSpacing: '0.08em',
                    padding:       '16px',
                    textDecoration:'none',
                    transition:    'opacity 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                >
                  COMPRAR INGRESSO →
                </a>
              ) : (
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#444', textAlign: 'center', fontStyle: 'italic' }}>
                  Ingressos em breve
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Detail({ label, value }) {
  return (
    <div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#444', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '4px' }}>{label}</p>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: '#fff', letterSpacing: '0.02em' }}>{value}</p>
    </div>
  )
}
