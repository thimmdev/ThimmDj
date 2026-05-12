import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { PageHeader, AdminBtn, AdminCard } from '../components/AdminTable'
import ImageUpload from '../components/ImageUpload'

export default function AdminHero() {
  const [url,     setUrl]     = useState('')
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('settings').select('value').eq('key', 'hero_image_url').single()
      .then(({ data }) => { if (data) setUrl(data.value); setLoading(false) })
  }, [])

  const save = async () => {
    setSaving(true)
    await supabase.from('settings').upsert({ key: 'hero_image_url', value: url, updated_at: new Date().toISOString() })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <PageHeader title="IMAGEM DO HERO" />

      {loading ? (
        <p style={{ color: '#444', fontFamily: 'var(--font-body)', fontSize: '14px' }}>Carregando...</p>
      ) : (
        <AdminCard style={{ maxWidth: '600px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#555', marginBottom: '24px', lineHeight: 1.6 }}>
            Esta imagem aparece como fundo da seção Hero na página principal. Use uma foto de alta resolução (mínimo 1920×1080px) em tons escuros para melhor contraste.
          </p>

          <ImageUpload
            label="Foto do Hero"
            currentUrl={url}
            onUpload={newUrl => setUrl(newUrl)}
            bucket="hero"
          />

          {url && (
            <div style={{ marginTop: '20px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#444', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>URL atual</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#555', wordBreak: 'break-all' }}>{url}</p>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '28px' }}>
            <AdminBtn variant="filled" onClick={save} disabled={saving || !url}>
              {saving ? 'Salvando...' : 'Salvar'}
            </AdminBtn>
            {saved && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#aaa' }}>Salvo com sucesso ✓</p>
            )}
          </div>
        </AdminCard>
      )}
    </div>
  )
}
