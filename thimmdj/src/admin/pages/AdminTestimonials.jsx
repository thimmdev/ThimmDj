import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { PageHeader, AdminBtn, AdminInput, AdminTextarea, AdminSelect, StatusBadge, EmptyState, Modal } from '../components/AdminTable'

const empty = { quote: '', name: '', event_type: '', stars: 5, sort_order: 0, is_active: true }

export default function AdminTestimonials() {
  const [items,   setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(null)
  const [form,    setForm]    = useState(empty)
  const [saving,  setSaving]  = useState(false)

  const load = async () => {
    const { data } = await supabase.from('testimonials').select('*').order('sort_order')
    setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openNew  = () => { setForm(empty); setModal('new') }
  const openEdit = t  => { setForm(t); setModal(t) }
  const close    = () => setModal(null)
  const set = (k, v)  => setForm(prev => ({ ...prev, [k]: v }))

  const save = async () => {
    setSaving(true)
    if (modal === 'new') {
      await supabase.from('testimonials').insert([form])
    } else {
      await supabase.from('testimonials').update(form).eq('id', form.id)
    }
    await load(); setSaving(false); close()
  }

  const remove = async id => {
    if (!confirm('Deletar este depoimento?')) return
    await supabase.from('testimonials').delete().eq('id', id)
    await load()
  }

  return (
    <div>
      <PageHeader title="DEPOIMENTOS" action={<AdminBtn variant="filled" onClick={openNew}>+ Novo Depoimento</AdminBtn>} />

      {loading ? (
        <p style={{ color: '#444', fontFamily: 'var(--font-body)', fontSize: '14px' }}>Carregando...</p>
      ) : items.length === 0 ? (
        <EmptyState message="Nenhum depoimento cadastrado." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', border: '0.5px solid rgba(255,255,255,0.07)' }}>
          {items.map(t => (
            <div key={t.id} style={{ background: '#111', padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ color: '#d4b483', fontSize: '13px' }}>{'★'.repeat(t.stars)}</span>
                  <StatusBadge active={t.is_active} />
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#aaa', fontStyle: 'italic', marginBottom: '6px', lineHeight: 1.6 }}>"{t.quote}"</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#555' }}>— {t.name} · {t.event_type}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <AdminBtn onClick={() => openEdit(t)}>Editar</AdminBtn>
                <AdminBtn variant="danger" onClick={() => remove(t.id)}>Deletar</AdminBtn>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal title={modal === 'new' ? 'NOVO DEPOIMENTO' : 'EDITAR DEPOIMENTO'} onClose={close}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <AdminTextarea label="Depoimento" rows={4} value={form.quote} onChange={e => set('quote', e.target.value)} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <AdminInput label="Nome do cliente" value={form.name} onChange={e => set('name', e.target.value)} />
              <AdminInput label="Tipo de evento (ex: Casamento, 2024)" value={form.event_type} onChange={e => set('event_type', e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <AdminSelect label="Estrelas" value={form.stars} onChange={e => set('stars', parseInt(e.target.value))}>
                {[5,4,3,2,1].map(n => <option key={n} value={n} style={{ background: '#141414' }}>{n} ★</option>)}
              </AdminSelect>
              <AdminInput label="Ordem de exibição" type="number" value={form.sort_order} onChange={e => set('sort_order', parseInt(e.target.value) || 0)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" id="dep-active" checked={form.is_active} onChange={e => set('is_active', e.target.checked)} style={{ accentColor: '#fff', cursor: 'pointer' }} />
              <label htmlFor="dep-active" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#aaa', cursor: 'pointer' }}>Ativo (visível no site)</label>
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
