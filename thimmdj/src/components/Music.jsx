import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from './ui/SectionLabel'
import { supabase } from '../lib/supabase'

function MixCard({ mix, index }) {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      style={{ cursor: 'pointer' }}
      onClick={() => mix.track_url && mix.track_url !== '#' && window.open(mix.track_url, '_blank')}
    >
      {/* Thumbnail */}
      <div
        style={{
          position:     'relative',
          aspectRatio:  '1 / 1',
          overflow:     'hidden',
          marginBottom: '20px',
          background:   'var(--color-bg-card)',
          border:       '0.5px solid var(--color-border-subtle)',
          transition:   'border-color 0.3s var(--ease-out), transform 0.3s var(--ease-out)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
          e.currentTarget.style.transform   = 'scale(1.01)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--color-border-subtle)'
          e.currentTarget.style.transform   = 'scale(1)'
        }}
      >
        <img
          src={mix.cover_url}
          alt={mix.title}
          loading="lazy"
          style={{
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            filter:     'grayscale(100%)',
            display:    'block',
            transition: 'transform 0.6s var(--ease-out)',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
        />
        {/* Play overlay */}
        <div
          style={{
            position:       'absolute',
            inset:          0,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            background:     'rgba(255,255,255,0.06)',
            opacity:        0,
            transition:     'opacity var(--duration-normal) var(--ease-out)',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = 1 }}
          onMouseLeave={e => { e.currentTarget.style.opacity = 0 }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="27" stroke="white" strokeWidth="1"/>
            <polygon points="23,18 40,28 23,38" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Meta */}
      <p
        style={{
          fontFamily:    'var(--font-body)',
          fontSize:      'var(--font-size-label)',
          fontWeight:    'var(--font-weight-medium)',
          textTransform: 'uppercase',
          letterSpacing: 'var(--tracking-wider)',
          color:         'var(--color-text-hint)',
          marginBottom:  '6px',
        }}
      >
        {mix.label}
      </p>
      <h3
        style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'var(--font-size-h3)',
          color:         'var(--color-text-primary)',
          letterSpacing: '0.02em',
        }}
      >
        {mix.title}
      </h3>
    </motion.div>
  )
}

export default function Music() {
  const [mixes,    setMixes]   = useState([])
  const [loading,  setLoading] = useState(true)
  const headerRef   = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  useEffect(() => {
    supabase
      .from('mixes')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => { setMixes(data ?? []); setLoading(false) })
  }, [])

  return (
    <section
      id="musica"
      style={{
        paddingBlock: 'var(--spacing-section-y)',
        background:   'var(--color-bg-base)',
        borderTop:    '0.5px solid var(--color-border-subtle)',
      }}
    >
      <div className="container">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '56px' }}
        >
          <SectionLabel>Música</SectionLabel>
          <h2
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'var(--font-size-h1)',
              lineHeight:    'var(--line-height-tight)',
              color:         'var(--color-text-primary)',
              letterSpacing: '0.02em',
            }}
          >
            LATEST MIXES
          </h2>
        </motion.div>

        {loading ? (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body)', color: 'var(--color-text-hint)', padding: '40px 0' }}>Carregando...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {mixes.map((mix, i) => (
              <MixCard key={mix.id} mix={mix} index={i} />
            ))}
          </div>
        )}

        <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
          <a
            href="https://soundcloud.com/djthimm"
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '13px',
              fontWeight:    'var(--font-weight-medium)',
              textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-widest)',
              color:         'var(--color-text-primary)',
              border:        '0.5px solid var(--color-border-strong)',
              padding:       '14px 36px',
              textDecoration:'none',
              transition:    'background var(--duration-normal) var(--ease-out), color var(--duration-normal) var(--ease-out)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--color-text-primary)'
              e.currentTarget.style.color      = 'var(--color-bg-base)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color      = 'var(--color-text-primary)'
            }}
          >
            Ver todos os sets no SoundCloud →
          </a>
        </div>
      </div>
    </section>
  )
}
