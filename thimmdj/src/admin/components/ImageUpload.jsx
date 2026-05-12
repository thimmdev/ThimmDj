import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ImageUpload({ label, currentUrl, onUpload, bucket }) {
  const [uploading, setUploading] = useState(false)
  const [urlInput,  setUrlInput]  = useState('')

  const handleFile = async e => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const ext  = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true })
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path)
      onUpload(publicUrl)
    }
    setUploading(false)
  }

  const handleUrl = () => {
    if (urlInput.trim()) { onUpload(urlInput.trim()); setUrlInput('') }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {label && (
        <label style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          {label}
        </label>
      )}
      {currentUrl && (
        <img src={currentUrl} alt="preview" style={{ width: '100%', maxHeight: '160px', objectFit: 'cover', filter: 'grayscale(100%)', border: '0.5px solid rgba(255,255,255,0.1)', display: 'block' }} />
      )}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{
          fontFamily: 'var(--font-body)', fontSize: '12px', textTransform: 'uppercase',
          letterSpacing: '0.1em', color: uploading ? '#555' : '#fff',
          border: '0.5px solid rgba(255,255,255,0.35)', padding: '9px 16px',
          cursor: uploading ? 'not-allowed' : 'pointer', flexShrink: 0,
        }}>
          {uploading ? 'Enviando...' : 'Upload'}
          <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} disabled={uploading} />
        </label>
        <span style={{ color: '#333', fontSize: '12px', fontFamily: 'var(--font-body)' }}>ou</span>
        <input
          placeholder="Colar URL da imagem"
          value={urlInput}
          onChange={e => setUrlInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleUrl() }}
          style={{ flex: 1, minWidth: '160px', background: 'transparent', border: 'none', borderBottom: '0.5px solid rgba(255,255,255,0.2)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '13px', padding: '8px 0', outline: 'none' }}
        />
        <button onClick={handleUrl} style={{ background: 'transparent', border: '0.5px solid rgba(255,255,255,0.35)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '11px', textTransform: 'uppercase', padding: '8px 14px', cursor: 'pointer', flexShrink: 0 }}>
          Ok
        </button>
      </div>
    </div>
  )
}
