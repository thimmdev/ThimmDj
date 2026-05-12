import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from './ui/SectionLabel'
import { supabase } from '../lib/supabase'

const inputStyle = {
  width:           '100%',
  background:      'transparent',
  border:          'none',
  borderBottom:    '0.5px solid var(--color-form-field-border, rgba(255,255,255,0.20))',
  color:           'var(--color-text-primary)',
  fontFamily:      'var(--font-body)',
  fontSize:        'var(--form-field-font-size)',
  paddingBlock:    'var(--form-field-padding-y)',
  paddingInline:   0,
  outline:         'none',
  transition:      'border-color var(--duration-normal) var(--ease-out)',
}

const labelStyle = {
  fontFamily:    'var(--font-body)',
  fontSize:      'var(--font-size-label)',
  fontWeight:    'var(--font-weight-medium)',
  textTransform: 'uppercase',
  letterSpacing: 'var(--tracking-wider)',
  color:         'var(--color-text-muted)',
  marginBottom:  '4px',
  display:       'block',
}

function Field({ label, error, children }) {
  const id = label.toLowerCase().replace(/\s+/g, '-')
  const child = children && typeof children === 'object'
    ? { ...children, props: { ...children.props, id, 'aria-describedby': error ? `${id}-error` : undefined, 'aria-invalid': error ? 'true' : undefined } }
    : children
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      {child}
      {error && (
        <p id={`${id}-error`} role="alert" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#ff6b6b', marginTop: '4px', letterSpacing: '0.05em' }}>
          {error}
        </p>
      )}
    </div>
  )
}

function validate(form) {
  const errors = {}
  if (!form.name.trim())  errors.name  = 'Nome é obrigatório'
  if (!form.email.trim()) errors.email = 'E-mail é obrigatório'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'E-mail inválido'
  if (!form.type)         errors.type  = 'Selecione o tipo de evento'
  return errors
}

export default function Contact() {
  const headerRef    = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const formRef      = useRef(null)
  const formInView   = useInView(formRef, { once: true, margin: '-80px' })

  const [form,       setForm]       = useState({ name: '', email: '', type: '', date: '', message: '' })
  const [errors,     setErrors]     = useState({})
  const [success,    setSuccess]    = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleFocus = e => { e.target.style.borderBottomColor = 'var(--color-border-focus)' }
  const handleBlur  = e => { e.target.style.borderBottomColor = 'rgba(255,255,255,0.20)' }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitting(true)
    await supabase.from('contacts').insert([{
      name:       form.name,
      email:      form.email,
      event_type: form.type,
      event_date: form.date || null,
      message:    form.message,
    }])
    setSubmitting(false)
    setSuccess(true)
    setForm({ name: '', email: '', type: '', date: '', message: '' })
  }

  return (
    <section
      id="contato"
      style={{
        paddingBlock: 'var(--spacing-section-y)',
        background:   'var(--color-bg-surface)',
        borderTop:    '0.5px solid var(--color-border-subtle)',
      }}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-16 md:gap-24">

          {/* Coluna esquerda */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ marginBottom: '32px' }}>
              <SectionLabel>Booking</SectionLabel>
              <h2
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'var(--font-size-h1)',
                  lineHeight:    'var(--line-height-tight)',
                  color:         'var(--color-text-primary)',
                  letterSpacing: '0.02em',
                }}
              >
                CONTATO
              </h2>
            </div>

            <h3
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'var(--font-size-h2)',
                lineHeight:    'var(--line-height-tight)',
                color:         'var(--color-text-primary)',
                letterSpacing: '0.02em',
                marginBottom:  '16px',
                textTransform: 'uppercase',
              }}
            >
              Vamos fazer seu evento inesquecível
            </h3>

            <p
              style={{
                fontFamily:   'var(--font-body)',
                fontSize:     'var(--font-size-body-sm)',
                lineHeight:   'var(--line-height-relaxed)',
                color:        'var(--color-text-hint)',
                marginBottom: '40px',
              }}
            >
              Preencha o formulário ao lado ou entre em contato diretamente.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: 'auto' }}>
              <a
                href="https://instagram.com/djthimm"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      '14px',
                  color:         'var(--color-text-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-wide)',
                  textDecoration:'none',
                  transition:    'opacity var(--duration-fast) var(--ease-out)',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.6' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                Instagram (@djthimm)
              </a>
              <a
                href="https://soundcloud.com/djthimm"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      '14px',
                  color:         'var(--color-text-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-wide)',
                  textDecoration:'none',
                  transition:    'opacity var(--duration-fast) var(--ease-out)',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.6' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                Soundcloud (/djthimm)
              </a>
              <a
                href="https://wa.me/5548999999999"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      '14px',
                  color:         'var(--color-text-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-wide)',
                  textDecoration:'none',
                  transition:    'opacity var(--duration-fast) var(--ease-out)',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.6' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Formulário */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            {success && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text-primary)', border: '0.5px solid var(--color-border-default)', padding: '16px', marginBottom: '8px', letterSpacing: '0.05em' }}>
                Mensagem enviada! Entrarei em contato em breve.
              </p>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <Field label="Nome completo" error={errors.name}>
                <input
                  name="name"
                  type="text"
                  placeholder="Digite seu nome"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{ ...inputStyle, borderBottomColor: errors.name ? '#ff6b6b' : 'rgba(255,255,255,0.20)' }}
                />
              </Field>

              <Field label="E-mail" error={errors.email}>
                <input
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{ ...inputStyle, borderBottomColor: errors.email ? '#ff6b6b' : 'rgba(255,255,255,0.20)' }}
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Field label="Tipo de evento" error={errors.type}>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{ ...inputStyle, cursor: 'pointer', borderBottomColor: errors.type ? '#ff6b6b' : 'rgba(255,255,255,0.20)' }}
                  >
                    <option value="" style={{ background: '#0f0f0f' }}>Selecione o tipo</option>
                    <option value="casamento" style={{ background: '#0f0f0f' }}>Casamento</option>
                    <option value="corporativo" style={{ background: '#0f0f0f' }}>Corporativo</option>
                    <option value="festa" style={{ background: '#0f0f0f' }}>Festa</option>
                    <option value="outro" style={{ background: '#0f0f0f' }}>Outro</option>
                  </select>
                </Field>

                <Field label="Data do evento">
                  <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{ ...inputStyle, colorScheme: 'dark' }}
                  />
                </Field>
              </div>

              <Field label="Mensagem">
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Conte mais sobre seu evento..."
                  value={form.message}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    ...inputStyle,
                    resize:     'none',
                    borderBottom: 'none',
                    border:     '0.5px solid var(--color-border-default)',
                    padding:    '16px',
                  }}
                />
              </Field>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width:         '100%',
                  background:    'var(--color-btn-filled-bg)',
                  color:         'var(--color-btn-filled-text)',
                  border:        '1px solid var(--color-btn-filled-bg)',
                  fontFamily:    'var(--font-display)',
                  fontSize:      '18px',
                  letterSpacing: '0.05em',
                  padding:       '18px',
                  cursor:        submitting ? 'not-allowed' : 'pointer',
                  opacity:       submitting ? 0.6 : 1,
                  transition:    'background var(--duration-normal) var(--ease-out), color var(--duration-normal) var(--ease-out)',
                }}
                onMouseEnter={e => { if (!submitting) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-text-primary)' } }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-btn-filled-bg)'; e.currentTarget.style.color = 'var(--color-btn-filled-text)' }}
              >
                {submitting ? 'ENVIANDO...' : 'ENVIAR MENSAGEM'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
