import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { PageHeader, AdminBtn, AdminCard, Modal } from '../components/AdminTable'

export default function AdminContacts() {
  const [contacts, setContacts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [selected, setSelected] = useState(null)

  const load = async () => {
    const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false })
    setContacts(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const markRead = async id => {
    await supabase.from('contacts').update({ read: true }).eq('id', id)
    setContacts(prev => prev.map(c => c.id === id ? { ...c, read: true } : c))
  }

  const remove = async id => {
    if (!confirm('Deletar este contato?')) return
    await supabase.from('contacts').delete().eq('id', id)
    await load()
    setSelected(null)
  }

  const open = async contact => {
    setSelected(contact)
    if (!contact.read) await markRead(contact.id)
  }

  const unread = contacts.filter(c => !c.read).length

  return (
    <div>
      <PageHeader title="FORMULÁRIOS" />

      {unread > 0 && (
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', padding: '12px 16px', marginBottom: '24px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#aaa' }}>
          {unread} mensagem{unread > 1 ? 's' : ''} não lida{unread > 1 ? 's' : ''}
        </div>
      )}

      {loading ? (
        <p style={{ color: '#444', fontFamily: 'var(--font-body)', fontSize: '14px' }}>Carregando...</p>
      ) : contacts.length === 0 ? (
        <div style={{ padding: '64px', textAlign: 'center', border: '0.5px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#444', fontStyle: 'italic' }}>Nenhuma mensagem recebida ainda.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {contacts.map(c => (
            <div
              key={c.id}
              onClick={() => open(c)}
              style={{
                background:  c.read ? '#0e0e0e' : '#141414',
                padding:     '14px 20px',
                cursor:      'pointer',
                display:     'flex',
                alignItems:  'center',
                gap:         '16px',
                flexWrap:    'wrap',
                borderLeft:  c.read ? '2px solid transparent' : '2px solid rgba(255,255,255,0.4)',
                transition:  'background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a' }}
              onMouseLeave={e => { e.currentTarget.style.background = c.read ? '#0e0e0e' : '#141414' }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '2px' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: c.read ? '#888' : '#fff', fontWeight: c.read ? 400 : 500 }}>{c.name}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#444' }}>{c.email}</p>
                  {c.event_type && <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#444', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{c.event_type}</p>}
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#555', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {c.message || '(sem mensagem)'}
                </p>
              </div>
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#444' }}>
                  {new Date(c.created_at).toLocaleDateString('pt-BR')}
                </p>
                {c.event_date && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#444', marginTop: '2px' }}>
                    Evento: {new Date(c.event_date + 'T12:00:00').toLocaleDateString('pt-BR')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <Modal title="MENSAGEM" onClose={() => setSelected(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field label="Nome" value={selected.name} />
              <Field label="Email" value={selected.email} />
              <Field label="Tipo de evento" value={selected.event_type || '—'} />
              <Field label="Data do evento" value={selected.event_date ? new Date(selected.event_date + 'T12:00:00').toLocaleDateString('pt-BR') : '—'} />
            </div>
            <div>
              <p style={fieldLabel}>Mensagem</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#ccc', lineHeight: 1.7, background: '#0a0a0a', padding: '16px', whiteSpace: 'pre-wrap' }}>
                {selected.message || '(sem mensagem)'}
              </p>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#444' }}>
              Recebido em {new Date(selected.created_at).toLocaleString('pt-BR')}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <AdminBtn variant="danger" onClick={() => remove(selected.id)}>Deletar</AdminBtn>
              <a
                href={`mailto:${selected.email}?subject=Re: Seu evento - DJ THIMM`}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '12px', textTransform: 'uppercase',
                  letterSpacing: '0.1em', color: '#fff', border: '1px solid #fff',
                  padding: '9px 20px', textDecoration: 'none',
                }}
              >
                Responder por Email →
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

function Field({ label, value }) {
  return (
    <div>
      <p style={fieldLabel}>{label}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#ccc' }}>{value}</p>
    </div>
  )
}

const fieldLabel = { fontFamily: 'var(--font-body)', fontSize: '11px', color: '#444', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }
