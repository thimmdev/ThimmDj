export function PageHeader({ title, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: '#fff', letterSpacing: '0.05em' }}>
        {title}
      </h1>
      {action}
    </div>
  )
}

export function AdminBtn({ onClick, variant = 'outline', children, type = 'button', disabled }) {
  const filled  = { background: '#fff', color: '#0a0a0a', border: '1px solid #fff' }
  const outline = { background: 'transparent', color: '#fff', border: '0.5px solid rgba(255,255,255,0.35)' }
  const danger  = { background: 'transparent', color: '#ff6b6b', border: '0.5px solid rgba(255,107,107,0.35)' }
  const base    = variant === 'filled' ? filled : variant === 'danger' ? danger : outline

  return (
    <button
      type={type} onClick={onClick} disabled={disabled}
      style={{
        ...base,
        fontFamily: 'var(--font-body)', fontSize: '12px', textTransform: 'uppercase',
        letterSpacing: '0.1em', padding: '9px 20px', cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1, transition: 'opacity 0.2s',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  )
}

export function AdminInput({ label, error, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && <label style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{label}</label>}
      <input
        {...props}
        style={{
          background: 'transparent', border: 'none',
          borderBottom: `0.5px solid ${error ? '#ff6b6b' : 'rgba(255,255,255,0.2)'}`,
          color: '#fff', fontFamily: 'var(--font-body)', fontSize: '14px',
          padding: '10px 0', outline: 'none', width: '100%',
          transition: 'border-color 0.2s',
          ...props.style,
        }}
        onFocus={e => { e.target.style.borderBottomColor = '#fff'; props.onFocus?.(e) }}
        onBlur={e  => { e.target.style.borderBottomColor = error ? '#ff6b6b' : 'rgba(255,255,255,0.2)'; props.onBlur?.(e) }}
      />
      {error && <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#ff6b6b' }}>{error}</p>}
    </div>
  )
}

export function AdminTextarea({ label, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && <label style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{label}</label>}
      <textarea
        {...props}
        style={{
          background: '#141414', border: '0.5px solid rgba(255,255,255,0.1)',
          color: '#fff', fontFamily: 'var(--font-body)', fontSize: '14px',
          padding: '12px', outline: 'none', resize: 'vertical', width: '100%',
          transition: 'border-color 0.2s', lineHeight: 1.6,
          ...props.style,
        }}
        onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.4)' }}
        onBlur={e  => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
      />
    </div>
  )
}

export function AdminSelect({ label, children, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && <label style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{label}</label>}
      <select
        {...props}
        style={{
          background: '#141414', border: '0.5px solid rgba(255,255,255,0.2)',
          color: '#fff', fontFamily: 'var(--font-body)', fontSize: '14px',
          padding: '10px 8px', outline: 'none', cursor: 'pointer', width: '100%',
          ...props.style,
        }}
      >
        {children}
      </select>
    </div>
  )
}

export function AdminCard({ children, style }) {
  return (
    <div style={{ background: '#141414', border: '0.5px solid rgba(255,255,255,0.07)', padding: '24px', ...style }}>
      {children}
    </div>
  )
}

export function StatusBadge({ active }) {
  return (
    <span style={{
      fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase',
      letterSpacing: '0.1em', padding: '3px 8px',
      background: active ? 'rgba(255,255,255,0.08)' : 'rgba(255,107,107,0.08)',
      color: active ? '#aaa' : '#ff6b6b',
      border: `0.5px solid ${active ? 'rgba(255,255,255,0.12)' : 'rgba(255,107,107,0.2)'}`,
    }}>
      {active ? 'Ativo' : 'Inativo'}
    </span>
  )
}

export function EmptyState({ message = 'Nenhum item cadastrado.' }) {
  return (
    <div style={{ padding: '64px', textAlign: 'center', border: '0.5px solid rgba(255,255,255,0.06)' }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#444', fontStyle: 'italic' }}>{message}</p>
    </div>
  )
}

export function Modal({ title, onClose, children }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
      onClick={onClose}
    >
      <div
        style={{ background: '#141414', border: '0.5px solid rgba(255,255,255,0.12)', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '32px' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#fff', letterSpacing: '0.05em' }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '20px', lineHeight: 1 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function ImageUpload({ label, currentUrl, onUpload, bucket }) {
  const [uploading, setUploading] = useState(false)
  const [urlInput,  setUrlInput]  = useState('')
  const { supabase } = require('../../lib/supabase')

  const handleFile = async e => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const ext  = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`
    const { data, error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true })
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path)
      onUpload(publicUrl)
    }
    setUploading(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {label && <label style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{label}</label>}
      {currentUrl && (
        <img src={currentUrl} alt="preview" style={{ width: '100%', maxHeight: '160px', objectFit: 'cover', filter: 'grayscale(100%)', border: '0.5px solid rgba(255,255,255,0.1)' }} />
      )}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <label style={{
          fontFamily: 'var(--font-body)', fontSize: '12px', textTransform: 'uppercase',
          letterSpacing: '0.1em', color: '#fff', border: '0.5px solid rgba(255,255,255,0.35)',
          padding: '9px 16px', cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.5 : 1,
        }}>
          {uploading ? 'Enviando...' : 'Upload'}
          <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} disabled={uploading} />
        </label>
        <span style={{ color: '#444', fontSize: '12px' }}>ou</span>
        <input
          placeholder="URL da imagem"
          value={urlInput}
          onChange={e => setUrlInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { onUpload(urlInput); setUrlInput('') } }}
          style={{ flex: 1, background: 'transparent', border: 'none', borderBottom: '0.5px solid rgba(255,255,255,0.2)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '13px', padding: '8px 0', outline: 'none' }}
        />
        <button onClick={() => { if (urlInput) { onUpload(urlInput); setUrlInput('') } }}
          style={{ background: 'transparent', border: '0.5px solid rgba(255,255,255,0.35)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '11px', textTransform: 'uppercase', padding: '8px 14px', cursor: 'pointer' }}>
          Ok
        </button>
      </div>
    </div>
  )
}
