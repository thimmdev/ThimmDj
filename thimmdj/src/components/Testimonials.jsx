import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from './ui/SectionLabel'
import { supabase } from '../lib/supabase'

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: '2px', marginBottom: '20px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: 'var(--color-accent-gold)', fontSize: '14px' }}>★</span>
      ))}
    </div>
  )
}

function TestimonialCard({ item, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      style={{
        background:  'var(--color-bg-card)',
        border:      '0.5px solid var(--color-border-subtle)',
        padding:     'var(--spacing-card-padding)',
        display:     'flex',
        flexDirection: 'column',
        transition:  'transform 0.3s var(--ease-out), border-color 0.3s var(--ease-out)',
        cursor:      'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform   = 'translateY(-4px)'
        e.currentTarget.style.borderColor = 'var(--color-border-strong)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform   = 'translateY(0)'
        e.currentTarget.style.borderColor = 'var(--color-border-subtle)'
      }}
    >
      <Stars count={item.stars} />

      <p
        style={{
          fontFamily:  'var(--font-body)',
          fontSize:    '15px',
          lineHeight:  'var(--line-height-relaxed)',
          color:       '#cccccc',
          fontStyle:   'italic',
          flex:        1,
          marginBottom:'28px',
        }}
      >
        "{item.quote}"
      </p>

      <div>
        <p
          style={{
            fontFamily:  'var(--font-body)',
            fontSize:    '13px',
            fontWeight:  'var(--font-weight-medium)',
            color:       'var(--color-text-primary)',
          }}
        >
          — {item.name}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize:   'var(--font-size-meta)',
            color:      'var(--color-text-hint)',
            marginTop:  '2px',
          }}
        >
          {item.event_type}
        </p>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const headerRef    = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  useEffect(() => {
    supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => setTestimonials(data ?? []))
  }, [])

  return (
    <section
      id="depoimentos"
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
          style={{ marginBottom: '48px' }}
        >
          <SectionLabel>Depoimentos</SectionLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <h2
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'var(--font-size-h1)',
                lineHeight:    'var(--line-height-tight)',
                color:         'var(--color-text-primary)',
                letterSpacing: '0.02em',
              }}
            >
              O QUE DIZEM
            </h2>
            <div className="hidden sm:block" style={{ flex: 1, height: '0.5px', background: 'var(--color-border-default)' }} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <TestimonialCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
