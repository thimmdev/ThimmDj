import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import SectionLabel from './ui/SectionLabel'
import gallery from '../data/gallery'


function Lightbox({ index, onClose, onPrev, onNext }) {
  const item = gallery[index]

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         'var(--z-overlay)',
        background:     'rgba(0,0,0,0.95)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
      }}
    >
      {/* Botão fechar */}
      <button
        onClick={onClose}
        aria-label="Fechar"
        style={{
          position:   'absolute',
          top:        '24px',
          right:      '24px',
          background: 'none',
          border:     'none',
          color:      'white',
          cursor:     'pointer',
          padding:    '8px',
          lineHeight: 1,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="4" y1="4" x2="20" y2="20"/>
          <line x1="20" y1="4" x2="4" y2="20"/>
        </svg>
      </button>

      {/* Seta esquerda */}
      <button
        onClick={e => { e.stopPropagation(); onPrev() }}
        aria-label="Foto anterior"
        style={{
          position:   'absolute',
          left:       '20px',
          background: 'none',
          border:     '0.5px solid rgba(255,255,255,0.25)',
          color:      'white',
          cursor:     'pointer',
          padding:    '12px 16px',
          lineHeight: 1,
          transition: 'background var(--duration-fast)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      {/* Imagem */}
      <motion.img
        key={index}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        src={item.src}
        alt={item.alt}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth:   '90vw',
          maxHeight:  '90vh',
          objectFit:  'contain',
          display:    'block',
          filter:     'grayscale(100%)',
        }}
      />

      {/* Seta direita */}
      <button
        onClick={e => { e.stopPropagation(); onNext() }}
        aria-label="Próxima foto"
        style={{
          position:   'absolute',
          right:      '20px',
          background: 'none',
          border:     '0.5px solid rgba(255,255,255,0.25)',
          color:      'white',
          cursor:     'pointer',
          padding:    '12px 16px',
          lineHeight: 1,
          transition: 'background var(--duration-fast)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

      {/* Contador */}
      <p style={{
        position:      'absolute',
        bottom:        '24px',
        left:          '50%',
        transform:     'translateX(-50%)',
        fontFamily:    'var(--font-body)',
        fontSize:      '12px',
        color:         'rgba(255,255,255,0.4)',
        letterSpacing: 'var(--tracking-wide)',
      }}>
        {index + 1} / {gallery.length}
      </p>
    </motion.div>
  )
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const headerRef    = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const trackRef     = useRef(null)

  const open  = useCallback(i  => setLightboxIndex(i), [])
  const close = useCallback(()  => setLightboxIndex(null), [])
  const prev  = useCallback(()  => setLightboxIndex(i => (i - 1 + gallery.length) % gallery.length), [])
  const next  = useCallback(()  => setLightboxIndex(i => (i + 1) % gallery.length), [])

  const scrollBy = dir => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: dir * 420, behavior: 'smooth' })
  }

  return (
    <>
      <section
        id="fotos"
        style={{ paddingBlock: 'var(--spacing-section-y)', background: 'var(--color-bg-card)', borderTop: '0.5px solid var(--color-border-subtle)' }}
      >
        <div className="container">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '40px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}
          >
            <div>
              <SectionLabel>Galeria</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-h1)', lineHeight: 'var(--line-height-tight)', color: 'var(--color-text-primary)', letterSpacing: '0.02em' }}>
                FOTOS
              </h2>
            </div>

            {/* Setas */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {[[-1, '←'], [1, '→']].map(([dir, label]) => (
                <button
                  key={dir}
                  onClick={() => scrollBy(dir)}
                  aria-label={dir === -1 ? 'Anterior' : 'Próxima'}
                  style={{
                    background:  'transparent',
                    border:      '0.5px solid var(--color-border-strong)',
                    color:       'var(--color-text-primary)',
                    fontFamily:  'var(--font-body)',
                    fontSize:    '16px',
                    padding:     '10px 18px',
                    cursor:      'pointer',
                    lineHeight:  1,
                    transition:  'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-text-primary)'; e.currentTarget.style.color = 'var(--color-bg-base)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-text-primary)' }}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Track — full width, sem container para sangrar nas bordas */}
        <div
          ref={trackRef}
          style={{
            display:              'flex',
            gap:                  '6px',
            overflowX:            'auto',
            overflowY:            'hidden',
            paddingInline:        'var(--spacing-container-x)',
            scrollbarWidth:       'none',
            msOverflowStyle:      'none',
            cursor:               'grab',
          }}
          onMouseDown={e => {
            const track = trackRef.current
            track.style.cursor = 'grabbing'
            const startX = e.pageX - track.offsetLeft
            const scrollLeft = track.scrollLeft
            const onMove = ev => { track.scrollLeft = scrollLeft - (ev.pageX - track.offsetLeft - startX) }
            const onUp   = ()  => { track.style.cursor = 'grab'; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
            window.addEventListener('mousemove', onMove)
            window.addEventListener('mouseup', onUp)
          }}
        >
          <style>{`#fotos-track::-webkit-scrollbar { display: none; }`}</style>
          {gallery.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              onClick={() => open(i)}
              style={{
                flexShrink:  0,
                width:       '320px',
                height:      '420px',
                overflow:    'hidden',
                cursor:      'pointer',
                position:    'relative',
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                draggable={false}
                style={{
                  width:      '100%',
                  height:     '100%',
                  objectFit:  'cover',
                  display:    'block',
                  filter:     'grayscale(100%)',
                  transition: 'transform 0.5s var(--ease-out)',
                  userSelect: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox index={lightboxIndex} onClose={close} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </>
  )
}
