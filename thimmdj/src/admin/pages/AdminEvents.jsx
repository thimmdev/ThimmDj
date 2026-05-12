import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { PageHeader, AdminBtn, AdminInput, AdminTextarea, AdminCard, StatusBadge, EmptyState, Modal } from '../components/AdminTable'
import ImageUpload from '../components/ImageUpload'

const empty = { date_label: '', date_iso: '', venue: '', city: '', description: '', ticket_url: '', price: '', flyer_url: '', is_active: true }

export default function AdminEvents() {
  const [events,  setEvents]  = useState([])
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(null)  // null | 'new' | event object
  const [form,    setForm]    = useState(empty)
  const [saving,  setSaving]  = useState(false)

  const load = async () => {
    const { data } = await supabase.from('events').select('*').order('date_iso', { ascending: true })
    setEvents(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openNew  = () => { setForm(empty); setModal('new') }
  const openEdit = ev => { setForm(ev); setModal(ev) }
  const closeModal = () => setModal(null)

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const save = async () => {
    setSaving(true)
    if (modal === 'new') {
      await supabase.from('events').insert([form])
    } else {
      await supabase.from('events').update(form).eq('id', form.id)
    }
    await load()
    setSaving(false)
    closeModal()
  }

  const remove = async id => {
    if (!confirm('Deletar este evento?')) return
    await supabase.from('events').delete().eq('id', id)
    await load()
  }

  const toggle = async (id, val) => {
    await supabase.from('events').update({ is_active: !val }).eq('id', id)
    await load()
  }

  return (
    <div>
      <PageHeader title="EVENTOS" action={<AdminBtn variant="filled" onClick={openNew}>+ Novo Evento</AdminBtn>} />

      {loading ? (
        <p style={{ color: '#444', fontFamily: 'var(--font-body)', fontSize: '14px' }}>Carregando...</p>
      ) : events.length === 0 ? (
        <EmptyState message="Nenhum evento cadastrado. Crie o primeiro!" />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', border: '0.5px solid rgba(255,255,255,0.07)' }}>
          {events.map(ev => (
            <div key={ev.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#111', padding: '16px 20px', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1, minWidth: 0 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#fff', minWidth: '80px' }}>{ev.date_label}</span>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#fff', fontWeight: 500 }}>{ev.venue}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#555' }}>{ev.city}</p>
                </div>
                <StatusBadge active={ev.is_active} />
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <AdminBtn onClick={() => toggle(ev.id, ev.is_active)}>{ev.is_active ? 'Desativar' : 'Ativar'}</AdminBtn>
                <AdminBtn onClick={() => openEdit(ev)}>Editar</AdminBtn>
                <AdminBtn variant="danger" onClick={() => remove(ev.id)}>Deletar</AdminBtn>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal title={modal === 'new' ? 'NOVO EVENTO' : 'EDITAR EVENTO'} onClose={closeModal}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <AdminInput label="Data (ex: 28 JUN)" value={form.date_label} onChange={e => set('date_label', e.target.value)} />
              <AdminInput label="Data ISO (yyyy-mm-dd)" type="date" value={form.date_iso ?? ''} onChange={e => set('date_iso', e.target.value)} />
            </div>
            <AdminInput label="Local / Venue" value={form.venue} onChange={e => set('venue', e.target.value)} />
            <AdminInput label="Cidade" value={form.city} onChange={e => set('city', e.target.value)} />
            <AdminTextarea label="Descrição (aparece no modal público)" rows={4} value={form.description ?? ''} onChange={e => set('description', e.target.value)} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <AdminInput label="Preço (ex: R$ 80 – R$ 150)" value={form.price ?? ''} onChange={e => set('price', e.target.value)} />
              <AdminInput label="URL Ingressos" value={form.ticket_url ?? ''} onChange={e => set('ticket_url', e.target.value)} />
            </div>
            <ImageUpload label="Flyer do evento" currentUrl={form.flyer_url} onUpload={url => set('flyer_url', url)} bucket="flyers" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" id="active" checked={form.is_active} onChange={e => set('is_active', e.target.checked)} style={{ accentColor: '#fff', cursor: 'pointer' }} />
              <label htmlFor="active" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#aaa', cursor: 'pointer' }}>Evento ativo (visível no site)</label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
              <AdminBtn onClick={closeModal}>Cancelar</AdminBtn>
              <AdminBtn variant="filled" onClick={save} disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</AdminBtn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
