import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import heroImgFallback from '../assets/hero.png'
import { supabase } from '../lib/supabase'

const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 30 },
  animate:   { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
})

const fadein = (delay = 0) => ({
  initial:   { opacity: 0 },
  animate:   { opacity: 1 },
  transition: { duration: 0.8, ease: 'easeOut', delay },
})

export default function Hero() {
  const [heroImg, setHeroImg] = useState(heroImgFallback)

  useEffect(() => {
    supabase.from('settings').select('value').eq('key', 'hero_image_url').single()
      .then(({ data }) => { if (data?.value) setHeroImg(data.value) })
  }, [])

  return (
    <section
      id="hero"
      style={{
        position:       'relative',
        height:         '100svh',
        minHeight:      '600px',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        alignItems:     'center',
        overflow:       'hidden',
        background:     'var(--color-bg-base)',
      }}
    >
      {/* Background image */}
      <motion.div
        {...fadein(0)}
        style={{
          position:  'absolute',
          inset:     0,
          zIndex:    0,
        }}
      >
        <img
          src={heroImg}
          alt="DJ THIMM performance"
          style={{
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            filter:     'grayscale(100%)',
            opacity:    0.38,
            display:    'block',
          }}
        />
        {/* Gradient overlay — heavier at bottom for text legibility */}
        <div
          style={{
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.72) 60%, rgba(10,10,10,0.95) 100%)',
          }}
        />
      </motion.div>

      {/* Grain texture overlay */}
      <div
        aria-hidden
        style={{
          position:        'absolute',
          inset:           0,
          zIndex:          1,
          pointerEvents:   'none',
          opacity:         0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize:  '200px',
        }}
      />

      {/* Content */}
      <div
        style={{
          position:      'relative',
          zIndex:        2,
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          textAlign:     'center',
          paddingInline: 'var(--spacing-container-x)',
          maxWidth:      'var(--spacing-container-max)',
          width:         '100%',
        }}
      >
        {/* Label */}
        <motion.p
          {...fadeUp(0.15)}
          style={{
            fontFamily:    'var(--font-body)',
            fontSize:      'var(--hero-label-size)',
            fontWeight:    'var(--font-weight-medium)',
            color:         'var(--color-text-primary)',
            textTransform: 'uppercase',
            letterSpacing: 'var(--hero-label-tracking)',
            opacity:       0.7,
            marginBottom:  '16px',
          }}
        >
          Melodic Techno · Florianópolis, BR
        </motion.p>

        {/* Thin divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.18 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{
            width:           '48px',
            height:          '0.5px',
            background:      'var(--color-text-primary)',
            marginBottom:    '24px',
            transformOrigin: 'center',
          }}
        />

        {/* Main title */}
        <motion.h1
          {...fadeUp(0.4)}
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'var(--font-size-hero)',
            lineHeight:    1,
            color:         'var(--color-text-primary)',
            letterSpacing: '0.03em',
            marginBottom:  '16px',
          }}
        >
          DJ THIMM
        </motion.h1>

        {/* Tagline */}
        <motion.p
          {...fadeUp(0.55)}
          style={{
            fontFamily:    'var(--font-body)',
            fontSize:      'var(--hero-tagline-size)',
            fontWeight:    'var(--font-weight-light)',
            color:         'var(--color-text-hint)',
            marginBottom:  '48px',
            letterSpacing: '0.02em',
          }}
        >
          Casamentos · Festas · Corporativos
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(0.7)}
          style={{
            display:        'flex',
            flexWrap:       'wrap',
            justifyContent: 'center',
            gap:            'var(--spacing-btn-gap)',
          }}
        >
          <a href="#shows" style={btnOutlineStyle}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--color-btn-outline-hover-bg)'
              e.currentTarget.style.color      = 'var(--color-btn-outline-hover-text)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color      = 'var(--color-btn-outline-text)'
            }}
          >
            Ver Agenda
          </a>
          <a href="#contato" style={btnFilledStyle}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--color-btn-filled-hover-bg)'
              e.currentTarget.style.color      = 'var(--color-btn-filled-hover-text)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--color-btn-filled-bg)'
              e.currentTarget.style.color      = 'var(--color-btn-filled-text)'
            }}
          >
            Contratar
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        {...fadein(1.1)}
        style={{
          position:  'absolute',
          bottom:    '40px',
          left:      '50%',
          transform: 'translateX(-50%)',
          zIndex:    2,
          display:   'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap:        '6px',
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width:        '1px',
            height:       '40px',
            background:   'linear-gradient(to bottom, transparent, rgba(255,255,255,0.35))',
          }}
        />
      </motion.div>
    </section>
  )
}

const btnBase = {
  display:       'inline-block',
  fontFamily:    'var(--font-body)',
  fontSize:      '13px',
  fontWeight:    'var(--font-weight-medium)',
  textTransform: 'uppercase',
  letterSpacing: 'var(--tracking-widest)',
  paddingBlock:  'var(--spacing-btn-y)',
  paddingInline: 'var(--spacing-btn-x)',
  borderRadius:  'var(--radius-sm)',
  textDecoration:'none',
  transition:    'background var(--duration-normal) var(--ease-out), color var(--duration-normal) var(--ease-out)',
  cursor:        'pointer',
  whiteSpace:    'nowrap',
}

const btnOutlineStyle = {
  ...btnBase,
  background: 'transparent',
  color:      'var(--color-btn-outline-text)',
  border:     '1px solid var(--color-btn-outline-border)',
}

const btnFilledStyle = {
  ...btnBase,
  background: 'var(--color-btn-filled-bg)',
  color:      'var(--color-btn-filled-text)',
  border:     '1px solid var(--color-btn-filled-bg)',
}
