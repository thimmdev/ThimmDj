import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from './ui/SectionLabel'
import heroImg from '../assets/hero.png'

const stats = [
  { value: '200+', label: 'Shows realizados' },
  { value: '8+',   label: 'Anos de experiência' },
]

function AnimatedBlock({ delay = 0, children, style, className }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Bio() {
  return (
    <section
      id="sobre"
      style={{ paddingBlock: 'var(--spacing-section-y)', background: 'var(--color-bg-base)', overflowX: 'hidden' }}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* Coluna esquerda — texto + stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <AnimatedBlock delay={0}>
              <SectionLabel>Sobre</SectionLabel>
              <h2
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'var(--font-size-h1)',
                  lineHeight:    'var(--line-height-tight)',
                  color:         'var(--color-text-primary)',
                  letterSpacing: '0.02em',
                  marginBottom:  '24px',
                }}
              >
                UM DJ QUE FALA A LÍNGUA DO SEU EVENTO
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '16px',
                  lineHeight: 'var(--line-height-relaxed)',
                  color:      'var(--color-text-secondary)',
                  fontWeight: 'var(--font-weight-light)',
                }}
              >
                DJ THIMM é um DJ de Melodic Techno baseado em Florianópolis, SC.
                Com uma abordagem versátil, atua em casamentos, festas e eventos corporativos,
                criando atmosferas únicas para cada ocasião. Sua música conta histórias —
                e cada set é pensado para o momento certo.
              </p>
            </AnimatedBlock>

            {/* Filosofia + Técnica */}
            <AnimatedBlock delay={0.2}>
              <div
                className="grid sm:grid-cols-2"
                style={{
                  gap:        '32px',
                  borderTop:  '0.5px solid var(--color-border-default)',
                  paddingTop: '32px',
                }}
              >
                <div>
                  <p style={subLabelStyle}>Filosofia</p>
                  <p style={bodySmStyle}>
                    Cada set é uma obra arquitetônica. THIMM seleciona meticulosamente
                    faixas que servem como pilares para uma narrativa maior.
                  </p>
                </div>
                <div>
                  <p style={subLabelStyle}>Técnica</p>
                  <p style={bodySmStyle}>
                    Especialista em jornadas estendidas, sua abordagem técnica foca em
                    camadas fluidas e manipulação de frequências harmônicas.
                  </p>
                </div>
              </div>
            </AnimatedBlock>

            {/* Stats */}
            <AnimatedBlock delay={0.35}>
              <div
                className="grid grid-cols-2"
                style={{
                  borderTop:  '0.5px solid var(--color-border-default)',
                  paddingTop: '32px',
                  gap:        '24px',
                }}
              >
                {stats.map(s => (
                  <div key={s.label}>
                    <p
                      style={{
                        fontFamily:    'var(--font-display)',
                        fontSize:      'var(--font-size-stat)',
                        color:         'var(--color-text-primary)',
                        lineHeight:    1,
                        marginBottom:  '6px',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {s.value}
                    </p>
                    <p
                      style={{
                        fontFamily:    'var(--font-body)',
                        fontSize:      'var(--font-size-meta)',
                        textTransform: 'uppercase',
                        letterSpacing: 'var(--tracking-wide)',
                        color:         'var(--color-text-hint)',
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedBlock>
          </div>

          {/* Coluna direita — foto com borda offset */}
          <AnimatedBlock delay={0.2} style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div
              style={{
                position:      'relative',
                width:         '100%',
                paddingBottom: '16px',
                paddingRight:  '16px',
              }}
            >
              {/* Borda offset (frame decorativo) */}
              <div
                style={{
                  position: 'absolute',
                  top:      '12px',
                  left:     '12px',
                  right:    '-12px',
                  bottom:   '-12px',
                  border:   '1px solid rgba(255,255,255,0.15)',
                  zIndex:   0,
                }}
              />
              {/* Foto */}
              <div style={{ position: 'relative', zIndex: 1, overflow: 'hidden' }}>
                <img
                  src={heroImg}
                  alt="DJ THIMM"
                  loading="lazy"
                  style={{
                    width:      '100%',
                    display:    'block',
                    objectFit:  'cover',
                    aspectRatio:'3 / 4',
                    filter:     'grayscale(100%)',
                  }}
                />
                {/* Grain overlay */}
                <div
                  aria-hidden
                  style={{
                    position:        'absolute',
                    inset:           0,
                    opacity:         0.04,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize:  '200px',
                    pointerEvents:   'none',
                  }}
                />
              </div>
            </div>
          </AnimatedBlock>

        </div>
      </div>
    </section>
  )
}

const subLabelStyle = {
  fontFamily:    'var(--font-body)',
  fontSize:      'var(--font-size-label)',
  fontWeight:    'var(--font-weight-medium)',
  textTransform: 'uppercase',
  letterSpacing: 'var(--tracking-wider)',
  color:         'var(--color-text-hint)',
  marginBottom:  '10px',
}

const bodySmStyle = {
  fontFamily: 'var(--font-body)',
  fontSize:   'var(--font-size-body)',
  lineHeight: 'var(--line-height-normal)',
  color:      'var(--color-text-secondary)',
}
