# DJ THIMM — Prompts para o Stitch
> Site profissional · Melodic Techno · Florianópolis, SC  
> Estilo: acessível e próximo do público · Paleta: preto + branco puro · Foco: bookings + música + marca

---

## Como usar este documento

Cole cada bloco de prompt no Stitch **um de cada vez**, na ordem indicada.  
Após cada seção gerada, revise, ajuste e passe para a próxima.  
Os prompts estão escritos em inglês (funciona melhor no Stitch) mas com instruções claras do que cada um gera.

---

## PROMPT 1 — Configuração global do projeto (cole primeiro)

```
Create a professional DJ website for DJ THIMM, a Melodic Techno DJ based in Florianópolis, Brazil.

Design system:
- Color palette: pure black (#0a0a0a background), pure white (#ffffff text and accents), mid-gray (#888888) for secondary text, and very dark gray (#141414) for card backgrounds
- Typography: Use "Bebas Neue" (Google Fonts) for all headings and the artist name. Use "DM Sans" (Google Fonts) for body text, nav links and UI elements
- Style: luxury minimalist, editorial, high contrast black and white
- Mood: accessible and welcoming, yet premium and professional — like an artist you can actually talk to
- No gradients, no neon colors, no purple/blue accents — strict black and white only
- Thin lines (0.5–1px) as decorative elements and dividers
- Generous white space on dark backgrounds
- Smooth fade-in animations on scroll for each section
- Fully responsive (mobile-first)
- One-page layout with smooth scroll between sections
- Sticky navigation bar: transparent on hero, solid dark on scroll
```

---

## PROMPT 2 — Hero Section (topo da página)

```
Build the HERO SECTION for DJ THIMM's website:

Layout:
- Full-screen height (100vh)
- Dark background (#0a0a0a) with a subtle noise texture overlay for depth
- Large centered layout, vertically centered content

Content:
- Small uppercase label at top: "MELODIC TECHNO · FLORIANÓPOLIS, BR" in white, letter-spacing 0.2em, font-size 12px, DM Sans
- Artist name "DJ THIMM" in massive Bebas Neue, font-size clamp(80px, 14vw, 180px), pure white, centered
- One-line tagline below: "Casamentos · Festas · Corporativos" in DM Sans, weight 300, gray (#888), font-size 18px
- Two CTA buttons side by side:
  · "VER AGENDA" — outlined white button (border 1px solid white), transparent bg, hover: bg white, text black
  · "CONTRATAR" — filled white button (bg white, text black), hover: bg transparent, text white
- Buttons: border-radius 2px, padding 14px 36px, font DM Sans weight 500, letter-spacing 0.1em, uppercase, font-size 13px

Visual details:
- Use a placeholder image as background (dark concert/stage lighting scene), with a strong dark overlay (rgba 0,0,0,0.75) so text is fully legible
- Thin horizontal white line (0.5px opacity 0.2) between the label and the name
- Animated entrance: name fades in and slides up 20px on load (0.8s ease), tagline after 0.3s delay, buttons after 0.6s delay
- Down-arrow icon at the very bottom center, softly pulsing, linking to next section
```

---

## PROMPT 3 — Navigation Bar

```
Build the NAVIGATION BAR for DJ THIMM's website:

Behavior:
- Fixed/sticky at top of page
- Transparent background when at hero section
- Becomes solid dark (#0a0a0a) with a thin bottom border (0.5px solid rgba 255,255,255,0.1) when user scrolls down
- Smooth background transition on scroll (CSS transition 0.3s)

Left side:
- Logo text "THIMM" in Bebas Neue, white, font-size 22px, letter-spacing 0.15em

Right side (desktop):
- Nav links: Sobre · Música · Shows · Fotos · Contato
- Font: DM Sans, 13px, uppercase, letter-spacing 0.1em, white, weight 400
- Hover: underline animation (width grows from 0 to 100% with CSS transition)
- Gap between links: 32px

Mobile:
- Hamburger icon (3 horizontal lines, white) replaces nav links
- Opens full-screen dark overlay menu with links stacked vertically, centered, large font (Bebas Neue 48px)
- Close button (X) top right
- Menu items animate in one by one with stagger (50ms each)
```

---

## PROMPT 4 — Sobre / Bio Section

```
Build the SOBRE (About) SECTION for DJ THIMM:

Layout:
- Two-column grid on desktop (50% / 50%), single column on mobile
- Section padding: 120px top and bottom
- Background: #0a0a0a

Left column:
- Section label: small uppercase text "SOBRE" with a thin horizontal line (40px) to the left, white, opacity 0.4, DM Sans 11px, letter-spacing 0.2em
- Headline in Bebas Neue: "UM DJ QUE FALA A LÍNGUA DO SEU EVENTO" — font-size 52px, white, line-height 1.1
- Body text in DM Sans, 16px, color #aaaaaa, line-height 1.8:
  "[PLACEHOLDER BIO] — DJ THIMM é um DJ de Melodic Techno baseado em Florianópolis, SC. Com uma abordagem versátil, atua em casamentos, festas e eventos corporativos, criando atmosferas únicas para cada ocasião. Sua música conta histórias — e cada set é pensado para o momento certo."
- Two stat highlights below the bio, side by side:
  · "[X]+ shows realizados"
  · "[X]+ anos de experiência"
  · Stats in Bebas Neue 42px white, labels in DM Sans 12px gray

Right column:
- Placeholder for a professional DJ photo (portrait format, dark background)
- Photo has a thin 1px white border offset slightly (like a frame)
- Subtle grain overlay on the photo

Animations:
- Left column slides in from left on scroll
- Right column fades in on scroll (0.2s delay)
```

---

## PROMPT 5 — Música / Mixes Section

```
Build the MÚSICA (Music) SECTION for DJ THIMM:

Layout:
- Full width, background #0f0f0f (slightly lighter than page bg for contrast)
- Section padding: 120px top and bottom

Header:
- Section label "MÚSICA" with thin line, same style as Sobre section
- Subheading: "Ouça os sets mais recentes" in DM Sans, 16px, gray

Content:
- 3 SoundCloud embed placeholder cards in a grid (3 columns desktop, 1 column mobile)
- Each card:
  · Dark card background (#1a1a1a)
  · Top: placeholder waveform image (gray rectangle, 100% width, height 80px) representing the SoundCloud embed
  · Below: track name in Bebas Neue 20px white
  · Genre/duration tag in DM Sans 12px gray
  · Card has 1px border rgba(255,255,255,0.08), border-radius 2px
  · Hover: border becomes rgba(255,255,255,0.25), subtle scale(1.01) transform

- Below the grid: a CTA button "VER TODOS OS SETS NO SOUNDCLOUD →" — outlined white button, links to SoundCloud profile

Note: The SoundCloud embeds will be added later. For now use placeholder cards with the design structure ready for iframe embed.
```

---

## PROMPT 6 — Shows / Agenda Section

```
Build the SHOWS (Events) SECTION for DJ THIMM:

Layout:
- Background: #0a0a0a
- Section padding: 120px top and bottom

Header:
- Section label "PRÓXIMOS SHOWS" with thin line
- Subheading: "Onde você pode me encontrar" in DM Sans 16px gray

Content — Event list:
- 4 placeholder event rows, each row contains:
  · Date: Bebas Neue 32px white (ex: "28 JUN")
  · Divider: thin vertical line 1px rgba white 0.2
  · Event name: DM Sans 18px white weight 500 (ex: "Fest Placeholder · Nome do Evento")
  · Location: DM Sans 14px gray (ex: "Florianópolis, SC")
  · Button: "INGRESSOS →" small outlined white button, aligned right
- Each row separated by thin horizontal line (0.5px, opacity 0.1)
- Hover on row: entire row gets a very subtle white left border (2px) and bg rgba(255,255,255,0.03)

Below list:
- If no upcoming events, show: "Sem shows agendados no momento. Confira em breve." centered, gray, italic

Note: Events will be updated manually. Design the structure as a clean, editable list.
```

---

## PROMPT 7 — Galeria de Fotos Section

```
Build the FOTOS (Gallery) SECTION for DJ THIMM:

Layout:
- Background: #111111
- Section padding: 120px top and bottom
- Section label "FOTOS" with thin line

Photo grid:
- Asymmetric masonry-style grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- 9 placeholder images total (dark rectangles with different heights: mix of portrait and landscape ratios)
- Each photo:
  · On hover: white overlay (rgba 255,255,255,0.05) + slight scale(1.03) with transition 0.3s
  · Opens lightbox on click (full-screen dark overlay with the photo centered, close on click outside or ESC)
- Thin gaps between photos (8px)
- No border-radius — sharp edges for editorial feel

Lightbox:
- Dark overlay (#000 opacity 0.95)
- Photo centered with max-width 90vw, max-height 90vh
- White X button top right to close
- Left/right arrow navigation between photos
- ESC key closes

Note: Placeholders will be replaced with real photos later. Use gray rectangles for now.
```

---

## PROMPT 8 — Depoimentos Section

```
Build the DEPOIMENTOS (Testimonials) SECTION for DJ THIMM:

Layout:
- Background: #0a0a0a
- Section padding: 120px top and bottom
- Section label "O QUE DIZEM" with thin line

Content:
- 3 testimonial cards in a row (desktop), stacked on mobile
- Each card:
  · Background: #141414
  · Border: 1px solid rgba(255,255,255,0.07)
  · Border-radius: 2px
  · Padding: 32px
  · Top: 5 white stars (★★★★★) in small size (14px), with slight gold tint (#d4b483) — the only off-white accent on the site
  · Quote text in DM Sans 15px, color #cccccc, line-height 1.8, italic
    · Card 1: "[PLACEHOLDER] Incrível! O THIMM leu a energia da festa perfeitamente. Todo mundo na pista do começo ao fim. Super recomendo!"
    · Card 2: "[PLACEHOLDER] Contratei para o meu casamento e foi melhor do que esperávamos. Música impecável, profissional do início ao fim."
    · Card 3: "[PLACEHOLDER] Evento corporativo com mais de 200 pessoas. O ambiente ficou exatamente como precisávamos. Parceiro de confiança."
  · Bottom: client name in DM Sans 13px white weight 500 + event type in 12px gray
    · "— Ana P. · Casamento, 2024"
    · "— Marcos V. · Formatura, 2024"
    · "— Empresa XYZ · Evento Corporativo, 2024"

Hover: card lifts slightly (translateY -4px) with transition 0.3s
```

---

## PROMPT 9 — Contato / Booking Section

```
Build the CONTATO (Contact/Booking) SECTION for DJ THIMM:

Layout:
- Background: #0f0f0f
- Section padding: 120px top and bottom

Left column (40%):
- Section label "CONTATO" with thin line
- Headline in Bebas Neue 52px white: "VAMOS FAZER SEU EVENTO INESQUECÍVEL"
- Short text in DM Sans 15px gray: "Preencha o formulário ao lado ou entre em contato diretamente. Responderei em até 24 horas."
- Social/contact links below:
  · Instagram: @djthimm
  · SoundCloud: /djthimm
  · WhatsApp: link to wa.me with placeholder number
  · Each link with a small icon (use Unicode or simple SVG), white, hover underline

Right column (60%):
- Contact form with fields:
  · Nome completo (text input)
  · E-mail (email input)
  · Tipo de evento: dropdown with options [Casamento, Festa / Balada, Evento Corporativo, Outro]
  · Data do evento (date input)
  · Mensagem (textarea, 4 rows)
  · Submit button: "ENVIAR MENSAGEM" — full white button, black text, full width, Bebas Neue 18px, letter-spacing 0.1em, padding 18px
  · Button hover: white border + transparent bg + white text

Form field style:
  · Background: transparent
  · Border: 0.5px solid rgba(255,255,255,0.2) bottom only (underline style, no box)
  · Text: white, DM Sans 15px
  · Placeholder: gray #555
  · Focus: border-bottom becomes full white (1px)
  · No border-radius
  · Padding: 12px 0

Note: Form is visual only for now — add backend/Formspree integration later.
```

---

## PROMPT 10 — Footer

```
Build the FOOTER for DJ THIMM's website:

Layout:
- Background: #000000 (pure black, slightly different from page bg)
- Padding: 60px top, 40px bottom
- Top border: 0.5px solid rgba(255,255,255,0.1)

Content — three columns on desktop, stacked on mobile:

Left:
- "THIMM" in Bebas Neue 28px white, letter-spacing 0.15em
- "DJ · Melodic Techno · Florianópolis, SC" in DM Sans 12px gray, margin-top 8px

Center:
- Nav links (same as header): Sobre · Música · Shows · Fotos · Contato
- Stacked vertically, DM Sans 12px gray, letter-spacing 0.1em, hover: white

Right:
- "REDES SOCIAIS" label in DM Sans 11px gray uppercase letter-spacing 0.15em
- Instagram, SoundCloud, YouTube icons — white, 20px, inline, gap 16px
- Hover: opacity 0.6

Bottom bar:
- Thin horizontal line separating bottom bar
- "© 2025 DJ THIMM. Todos os direitos reservados." — DM Sans 11px gray, centered
- "Site por [seu nome/agência]" — DM Sans 11px gray, right aligned (or centered on mobile)
```

---

## PROMPT 11 — Detalhes finais e polish (use por último)

```
Review and polish the entire DJ THIMM website with these final refinements:

1. Scroll animations: every section should have a subtle fade-in + translateY(30px → 0) animation triggered when it enters the viewport. Use Intersection Observer. Stagger child elements by 100ms.

2. Custom scrollbar: thin (4px), dark track (#1a1a1a), white thumb, only visible on desktop.

3. Page loading: add a simple fullscreen loading screen that shows "THIMM" in Bebas Neue 60px centered on black, then fades out after 1.2s revealing the site.

4. Cursor: on desktop, replace default cursor with a small white circle (12px) that follows the mouse smoothly with slight lag (lerp interpolation). On hover over clickable elements, circle expands to 32px with lower opacity.

5. Section transitions: ensure consistent vertical rhythm — every section has exactly 120px padding top/bottom on desktop, 64px on mobile.

6. Smooth scroll: enable CSS scroll-behavior: smooth for all anchor links.

7. Meta tags: add proper SEO meta tags:
   · title: "DJ THIMM | Melodic Techno · Florianópolis"
   · description: "DJ THIMM — DJ de Melodic Techno em Florianópolis. Casamentos, festas e eventos corporativos. Contrate agora."
   · og:image placeholder for social sharing

8. Favicon: use the letter "T" on black background as a simple text favicon.

9. Accessibility: ensure all images have alt text, form labels are properly associated, and color contrast meets WCAG AA.

10. Performance: lazy-load all images and iframes (SoundCloud embeds).
```

---

## Dicas para o Stitch

- **Cole um prompt por vez.** Não coloque tudo junto — o Stitch trabalha melhor seção por seção.
- **Após cada geração**, diga algo como: *"Looks good, now add the next section"* ou *"Adjust the font size of the headline to be bigger"*.
- **Para trocar placeholders**, diga: *"Replace the bio placeholder with: [seu texto real]"*
- **Para adicionar o SoundCloud**, diga: *"Replace the music card placeholders with these SoundCloud iframes: [cole o código embed do SoundCloud]"*
- **Para suas fotos reais**, diga: *"Replace gallery placeholders with these images: [cole as URLs ou faça upload]*

---

## Checklist antes de publicar

- [ ] Substituir placeholder bio pelo texto real
- [ ] Inserir fotos profissionais na galeria
- [ ] Adicionar embeds reais do SoundCloud
- [ ] Preencher datas e locais dos shows
- [ ] Adicionar depoimentos reais de clientes
- [ ] Conectar formulário de contato (Formspree, EmailJS ou similar)
- [ ] Adicionar link real do WhatsApp
- [ ] Configurar domínio (ex: djthimm.com.br)
- [ ] Testar em celular (iPhone e Android)
- [ ] Fazer upload do logo real
