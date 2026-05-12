import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { PageHeader, AdminBtn, AdminInput, StatusBadge, EmptyState, Modal } from '../components/AdminTable'
import ImageUpload from '../components/ImageUpload'

const empty = { title: '', label: '', cover_url: '', track_url: '', sort_order: 0, is_active: true }

export default function AdminMixes() {
  const [mixes,   setMixes]   = useState([])
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(null)
  const [form,    setForm]    = useState(empty)
  const [saving,  setSaving]  = useState(false)

  const load = async () => {
    const { data } = await supabase.from('mixes').select('*').order('sort_order')
    setMixes(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openNew  = () => { setForm(empty); setModal('new') }
  const openEdit = m  => { setForm(m); setModal(m) }
  const close    = () => setModal(null)
  const set = (k, v)  => setForm(prev => ({ ...prev, [k]: v }))

  const save = async () => {
    setSaving(true)
    if (modal === 'new') {
      await supabase.from('mixes').insert([form])
    } else {
      await supabase.from('mixes').update(form).eq('id', form.id)
    }
    await load(); setSaving(false); close()
  }

  const remove = async id => {
    if (!confirm('Deletar este mix?')) return
    await supabase.from('mixes').delete().eq('id', id)
    await load()
  }

  return (
    <div>
      <PageHeader title="MIXES" action={<AdminBtn variant="filled" onClick={openNew}>+ Novo Mix</AdminBtn>} />

      {loading ? (
        <p style={{ color: '#444', fontFamily: 'var(--font-body)', fontSize: '14px' }}>Carregando...</p>
      ) : mixes.length === 0 ? (
        <EmptyState message="Nenhum mix cadastrado." />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {mixes.map(m => (
            <div key={m.id} style={{ background: '#111', border: '0.5px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
              {m.cover_url && (
                <img src={m.cover_url} alt={m.title} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', filter: 'grayscale(100%)', display: 'block' }} />
              )}
              <div style={{ padding: '16px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{m.label}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#fff', marginBottom: '12px' }}>{m.title}</p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <StatusBadge active={m.is_active} />
                  <span style={{ flex: 1 }} />
                  <AdminBtn onClick={() => openEdit(m)}>Editar</AdminBtn>
                  <AdminBtn variant="danger" onClick={() => remove(m.id)}>✕</AdminBtn>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal title={modal === 'new' ? 'NOVO MIX' : 'EDITAR MIX'} onClose={close}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <AdminInput label="Título" value={form.title} onChange={e => set('title', e.target.value)} />
            <AdminInput label="Label (ex: RECORDED AT AFTERLIFE)" value={form.label} onChange={e => set('label', e.target.value)} />
            <AdminInput label="Link SoundCloud / YouTube" value={form.track_url ?? ''} onChange={e => set('track_url', e.target.value)} />
            <AdminInput label="Ordem de exibição" type="number" value={form.sort_order} onChange={e => set('sort_order', parseInt(e.target.value) || 0)} />
            <ImageUpload label="Cover do mix" currentUrl={form.cover_url} onUpload={url => set('cover_url', url)} bucket="covers" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" id="mix-active" checked={form.is_active} onChange={e => set('is_active', e.target.checked)} style={{ accentColor: '#fff', cursor: 'pointer' }} />
              <label htmlFor="mix-active" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#aaa', cursor: 'pointer' }}>Ativo (visível no site)</label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
              <AdminBtn onClick={close}>Cancelar</AdminBtn>
              <AdminBtn variant="filled" onClick={save} disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</AdminBtn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
