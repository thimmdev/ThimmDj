# DJ THIMM — Guia de Desenvolvimento

Site one-page profissional para DJ THIMM. Stack: **React + Vite + Tailwind CSS v3 + Framer Motion**.

---

## Stack & Convenções

| Item | Decisão |
|---|---|
| Estilização | CSS Variables via `tokens.css` + inline `style={{}}` no JSX. Tailwind só para utilitários de layout (`hidden md:flex`, `grid`, etc.) |
| Animações | Framer Motion. Entrada: `opacity 0→1 + translateY 30→0`, easing `[0.16, 1, 0.3, 1]`, stagger 100–150 ms entre filhos |
| Fontes | Bebas Neue (display/títulos) · DM Sans (corpo/UI). Importadas via Google Fonts no `index.html` |
| Imagens | Grayscale 100% em tudo. Opacidade reduzida em backgrounds (≈ 35–40%) |
| Bordas | 0 px radius em tudo (exceto `--radius-sm: 2px` em botões) |
| Cores | Preto `#0a0a0a` (base) · Branco `#ffffff` (texto/acento) · Cinza `#888888` (secundário) · `#d4b483` só em estrelas de depoimento |
| Sombras | Nenhuma. Profundidade via tonal layering (superfícies `#0a0a0a → #141414`) |

---

## Tokens (src/styles/tokens.css)

Sempre usar variáveis CSS — nunca hardcodar valores que já existem como token.

```
Fundos:    --color-bg-base / --color-bg-surface / --color-bg-card
Texto:     --color-text-primary / --color-text-secondary / --color-text-hint
Bordas:    --color-border-subtle / --color-border-default / --color-border-strong
Fontes:    --font-display / --font-body
Tamanhos:  --font-size-hero / --font-size-h1 / --font-size-h2 / --font-size-h3
Espaços:   --spacing-container-x / --spacing-container-max / --spacing-section-y
Botões:    --color-btn-outline-* / --color-btn-filled-*
Animação:  --duration-normal / --ease-out / --reveal-y
```

---

## Arquitetura de Arquivos

```
src/
├── assets/
│   └── hero.png              ✅ pronto
├── components/
│   ├── ui/
│   │   ├── Button.jsx         → botão reutilizável (variant: "outline" | "filled")
│   │   └── SectionLabel.jsx   → label uppercase com linha lateral (ex: "SOBRE")
│   ├── Navbar.jsx             ✅ pronto
│   ├── Hero.jsx               ✅ pronto
│   ├── Bio.jsx                → seção "The Sound"
│   ├── Music.jsx              → "Latest Mixes" (grid 3 cards)
│   ├── Shows.jsx              → "Próximos Shows" (tabela de eventos)
│   ├── Gallery.jsx            → "Fotos" (masonry columns + lightbox)
│   ├── Testimonials.jsx       → "O Que Dizem" (grid 3 cards)
│   ├── Contact.jsx            → "Contato" (split layout + form)
│   └── Footer.jsx             → rodapé com logo, links e social
├── data/
│   ├── shows.js               → array de eventos {date, venue, city, ticketUrl}
│   ├── mixes.js               → array de mixes {label, title, cover, url}
│   ├── gallery.js             → array de fotos {src, alt}
│   └── testimonials.js        → array {stars, quote, name, event}
└── styles/
    └── tokens.css             ✅ pronto
```

---

## Componentes UI Reutilizáveis

### Button.jsx
```jsx
<Button variant="outline" href="#shows">Ver Agenda</Button>
<Button variant="filled" href="#contato">Contratar</Button>
```
- `variant="outline"` → borda branca, fundo transparente, hover inverte
- `variant="filled"` → fundo branco, texto preto, hover inverte
- Aceita `href` (renderiza `<a>`) ou sem href (renderiza `<button>`)
- Hover via `onMouseEnter/Leave` no style inline (não Tailwind)

### SectionLabel.jsx
```jsx
<SectionLabel>Sobre</SectionLabel>
```
- Linha `--border-label: 40px` à esquerda + texto uppercase 11px + tracking 0.15em
- Cor `--color-text-hint` (#888)
- Já definido como `.section-label` em tokens.css — componente só encapsula

---

## Roadmap de Implementações

### Fase 1 — Componentes UI Base ✅
- [x] `src/components/ui/Button.jsx`
- [x] `src/components/ui/SectionLabel.jsx`

### Fase 2 — Seções de Conteúdo ✅
- [x] `src/data/` — shows, mixes, gallery, testimonials
- [x] `src/components/Bio.jsx`
- [x] `src/components/Music.jsx`
- [x] `src/components/Shows.jsx`
- [x] `src/components/Gallery.jsx`
- [x] `src/components/Testimonials.jsx`
- [x] `src/components/Contact.jsx`
- [x] `src/components/Footer.jsx`

### Fase 3 — Interatividade & Polish ✅
- [x] **Lightbox** em `Gallery.jsx` — overlay 95%, setas ←→, Esc, counter, AnimatePresence
- [x] **Cursor customizado** — `CustomCursor.jsx`, lerp 0.15, `mix-blend-mode: difference`, expande 32px no hover
- [x] **Loading screen** — `LoadingScreen.jsx`, "THIMM" pulsando, fade out após 1.6s
- [x] **Hover Testimonials** — `translateY(-4px)` + border mais forte
- [x] **Hover Music cards** — `scale(1.01)` + border `rgba(255,255,255,0.25)`
- [x] **Navbar underline animado** — `.nav-link::after` 0→100% no hover
- [x] **Shows estado vazio** — mensagem italicizada quando `shows.length === 0`
- [x] **Music CTA SoundCloud** — botão outline centralizado abaixo dos mixes
- [x] **Bio reestruturada** — grid 50/50, stats (200+ shows / 8+ anos), foto com borda offset + grain
- [x] **Contact WhatsApp** — link `wa.me` placeholder
- [x] **Validação do form** — erros por campo, `aria-invalid`, `role="alert"`, feedback de sucesso inline
- [x] **Footer crédito** — "Site por Thiago Machado" alinhado à direita

### Fase 4 — Qualidade & Deploy ✅
- [x] `index.html` — SEO completo, OG tags, Twitter Card, favicon SVG, `lang="pt-BR"`, `theme-color`
- [x] Google Fonts — `preconnect` + link no `<head>` (Bebas Neue + DM Sans)
- [x] Acessibilidade — `aria-label` no hambúrguer e lightbox, `aria-modal` no menu mobile, `htmlFor` em todos os inputs, `aria-invalid` + `role="alert"` nos erros do form, `alt` em todas as imagens
- [x] Lazy-load — `loading="lazy"` em Music e Gallery (Hero fica eager — above the fold)
- [x] Responsividade — `--spacing-section-y` reduz para 64px via media query global, linhas decorativas somem em mobile (`hidden sm:block`), frame offset da Bio usa `overflowX: hidden`, `whiteSpace: nowrap` removido dos títulos

### Fase 5 — Conteúdo Real (pré-publicação)
> Substituições manuais antes de ir ao ar:
- [ ] Bio: substituir texto placeholder pelo texto real do artista
- [ ] Fotos: trocar `hero.png` placeholder pelas fotos profissionais na galeria e nos covers dos mixes
- [ ] SoundCloud: substituir cards placeholder pelos embeds reais (`<iframe>` do SoundCloud)
- [ ] Shows: atualizar `src/data/shows.js` com datas e locais reais
- [ ] Depoimentos: substituir por depoimentos reais em `src/data/testimonials.js`
- [ ] WhatsApp: inserir número real no link `wa.me`
- [ ] Domínio: configurar domínio (ex: `djthimm.com.br`) no Vercel/Netlify

---

## Padrão de Seção

Toda seção segue esta estrutura:

```jsx
<section id="slug" style={{ paddingBlock: 'var(--spacing-section-y)', background: 'var(--color-bg-base)' }}>
  <div className="container">        {/* .container do tokens.css */}
    <SectionLabel>Label</SectionLabel>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-h1)' }}>
      TÍTULO
    </h2>
    {/* conteúdo */}
  </div>
</section>
```

Seções alternadas usam `--color-bg-surface` (`#0f0f0f`) para criar profundidade sutil.

---

## Referência Visual

- `stitchDesign/screen.png` — screenshot completo do design
- `stitchDesign/code.html` — HTML de referência com estrutura e classes
- `stitchDesign/DESIGN.md` — design system completo (paleta, tipografia, componentes)

---

## IDs das Seções (ancora do Navbar)

| Seção | ID |
|---|---|
| Hero | `#hero` |
| Bio / The Sound | `#sobre` |
| Mixes / Música | `#musica` |
| Próximos Shows | `#shows` |
| Fotos | `#fotos` |
| Depoimentos | (sem link no nav) |
| Contato / Booking | `#contato` |
