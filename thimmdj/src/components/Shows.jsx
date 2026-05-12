import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from './ui/SectionLabel'
import EventModal from './EventModal'
import { supabase } from '../lib/supabase'

function ShowRow({ show, index, onOpen }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      style={{ position: 'relative', cursor: 'pointer' }}
      onClick={() => onOpen(show)}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
        e.currentTarget.querySelector('[data-accent]').style.opacity = 1
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.querySelector('[data-accent]').style.opacity = 0
      }}
    >
      <div data-accent style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: 'var(--color-text-primary)', opacity: 0, transition: 'opacity var(--duration-normal) var(--ease-out)' }} />

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBlock: '28px', paddingInline: '20px', borderBottom: '0.5px solid var(--color-border-subtle)', gap: '24px', flexWrap: 'wrap', transition: 'background var(--duration-normal) var(--ease-out)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flex: 1, minWidth: 0 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-h2)', color: 'var(--color-text-primary)', letterSpacing: '0.02em', lineHeight: 1, minWidth: '110px' }}>
            {show.date_label}
          </span>
          <div className="hidden sm:block" style={{ width: '0.5px', height: '40px', background: 'var(--color-border-default)', flexShrink: 0 }} />
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)', marginBottom: '4px' }}>
              {show.venue}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text-hint)' }}>
              {show.city}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
          {show.price && (
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-hint)' }}>{show.price}</span>
          )}
          <span
            style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 'var(--font-weight-medium)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', color: 'var(--color-text-primary)', border: '0.5px solid var(--color-border-strong)', padding: '10px 24px', whiteSpace: 'nowrap' }}
          >
            Ver detalhes →
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Shows() {
  const [shows,    setShows]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [selected, setSelected] = useState(null)
  const headerRef    = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  useEffect(() => {
    supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .order('date_iso', { ascending: true })
      .then(({ data }) => { setShows(data ?? []); setLoading(false) })
  }, [])

  return (
    <>
      <section id="shows" style={{ paddingBlock: 'var(--spacing-section-y)', background: 'var(--color-bg-surface)' }}>
        <div className="container">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '48px' }}
          >
            <SectionLabel>Agenda</SectionLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-h1)', lineHeight: 'var(--line-height-tight)', color: 'var(--color-text-primary)', letterSpacing: '0.02em' }}>
                PRÓXIMOS SHOWS
              </h2>
              <div className="hidden sm:block" style={{ flex: 1, height: '0.5px', background: 'var(--color-border-default)' }} />
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body)', color: 'var(--color-text-hint)', marginTop: '8px' }}>
              Onde você pode me encontrar
            </p>
          </motion.div>

          <div style={{ borderTop: '0.5px solid var(--color-border-subtle)' }}>
            {loading ? (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body)', color: 'var(--color-text-hint)', padding: '40px 0' }}>Carregando...</p>
            ) : shows.length > 0 ? (
              shows.map((show, i) => <ShowRow key={show.id} show={show} index={i} onOpen={setSelected} />)
            ) : (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body)', color: 'var(--color-text-hint)', fontStyle: 'italic', textAlign: 'center', padding: '64px 0' }}>
                Sem shows agendados no momento. Confira em breve.
              </p>
            )}
          </div>
        </div>
      </section>

      <EventModal event={selected} onClose={() => setSelected(null)} />
    </>
  )
}
