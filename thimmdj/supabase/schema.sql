-- ============================================================
-- DJ THIMM — Schema Supabase
-- Cole no SQL Editor do painel Supabase e execute
-- ============================================================

-- EVENTS (shows com detalhes ricos)
create table if not exists events (
  id          uuid primary key default gen_random_uuid(),
  date_label  text not null,          -- ex: "28 JUN"
  date_iso    date,                   -- data real para ordenação
  venue       text not null,
  city        text not null,
  description text,                   -- detalhes do evento (modal público)
  ticket_url  text,
  price       text,                   -- ex: "R$ 80 – R$ 150"
  flyer_url   text,                   -- imagem do flyer
  is_active   boolean default true,
  created_at  timestamptz default now()
);

-- MIXES
create table if not exists mixes (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  label      text not null,           -- ex: "RECORDED AT AFTERLIFE"
  cover_url  text,
  track_url  text,                    -- link SoundCloud / YouTube
  sort_order int default 0,
  is_active  boolean default true,
  created_at timestamptz default now()
);

-- TESTIMONIALS
create table if not exists testimonials (
  id         uuid primary key default gen_random_uuid(),
  quote      text not null,
  name       text not null,
  event_type text not null,           -- ex: "Casamento, 2024"
  stars      int default 5 check (stars between 1 and 5),
  sort_order int default 0,
  is_active  boolean default true,
  created_at timestamptz default now()
);

-- CONTACTS (formulários recebidos)
create table if not exists contacts (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  event_type text,
  event_date date,
  message    text,
  read       boolean default false,
  created_at timestamptz default now()
);

-- SETTINGS (hero image, etc.)
create table if not exists settings (
  key        text primary key,
  value      text not null,
  updated_at timestamptz default now()
);

-- Valor padrão do hero
insert into settings (key, value)
values ('hero_image_url', '')
on conflict (key) do nothing;

-- ============================================================
-- RLS (Row Level Security)
-- Leitura pública para eventos, mixes, depoimentos, settings
-- Escrita apenas para usuários autenticados
-- ============================================================

alter table events       enable row level security;
alter table mixes        enable row level security;
alter table testimonials enable row level security;
alter table contacts     enable row level security;
alter table settings     enable row level security;

-- Leitura pública
create policy "public read events"       on events       for select using (true);
create policy "public read mixes"        on mixes        for select using (true);
create policy "public read testimonials" on testimonials for select using (true);
create policy "public read settings"     on settings     for select using (true);

-- Escrita apenas autenticado
create policy "auth write events"       on events       for all using (auth.role() = 'authenticated');
create policy "auth write mixes"        on mixes        for all using (auth.role() = 'authenticated');
create policy "auth write testimonials" on testimonials for all using (auth.role() = 'authenticated');
create policy "auth write contacts"     on contacts     for all using (auth.role() = 'authenticated');
create policy "auth write settings"     on settings     for all using (auth.role() = 'authenticated');

-- Contacts: insert público (formulário de contato)
create policy "public insert contacts"  on contacts     for insert with check (true);

-- ============================================================
-- STORAGE BUCKETS
-- Criar manualmente no painel: Storage → New bucket
-- Nome: "covers"  (público)
-- Nome: "hero"    (público)
-- Nome: "flyers"  (público)
-- ============================================================
