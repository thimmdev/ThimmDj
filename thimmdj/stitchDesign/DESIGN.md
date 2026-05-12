---
name: Melodic Noir
colors:
  surface: '#141313'
  surface-dim: '#141313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353434'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c7c6c6'
  on-secondary: '#303031'
  secondary-container: '#464747'
  on-secondary-container: '#b5b5b5'
  tertiary: '#ffffff'
  on-tertiary: '#2f3131'
  tertiary-container: '#e2e2e2'
  on-tertiary-container: '#636565'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#141313'
  on-background: '#e5e2e1'
  surface-variant: '#353434'
typography:
  display:
    fontFamily: Bebas Neue
    fontSize: 120px
    fontWeight: '400'
    lineHeight: 100px
    letterSpacing: 0.05em
  headline-lg:
    fontFamily: Bebas Neue
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Bebas Neue
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 48px
  headline-md:
    fontFamily: Bebas Neue
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 32px
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
spacing:
  unit: 4px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
  section-gap: 160px
---

## Brand & Style

This design system is built for the high-end electronic music space, specifically tailored to the Melodic Techno subgenre. The brand personality is architectural, disciplined, and cinematic. It avoids the chaotic energy of mainstream EDM in favor of a "Luxury Minimalist" aesthetic that mirrors the precise, rhythmic nature of the artist's music.

The visual style is strictly monochromatic, utilizing an editorial approach to layout. It leverages high-contrast typography and extreme whitespace to create a sense of premium exclusivity. The emotional response should be one of professional authority and sophisticated nocturnal energy. No decorative elements are permitted unless they serve a structural or functional purpose.

## Colors

The palette is restricted to a pure grayscale spectrum to maintain an uncompromising editorial feel. 

- **Primary Background:** #0a0a0a (Pure Black) serves as the foundation, providing a deep, immersive stage for content.
- **Surface/Section:** #141414 (Dark Gray) is used for containers, cards, and subtle section differentiation to provide depth without breaking the dark mode immersion.
- **Primary Text/Accents:** #ffffff (Pure White) is used for maximum legibility and high-impact branding.
- **Secondary Text:** #888888 (Mid-Gray) provides hierarchy for metadata, descriptions, and supporting information.
- **Dividers:** White at low opacity or 1px solid mid-gray to maintain the thin-line aesthetic.

## Typography

This design system uses a sharp typographic contrast to establish hierarchy. 

**Bebas Neue** is the voice of the artist. It must be used for all headers, titles, and branding. Because of its condensed nature, it should be set with slight tracking (letter spacing) in display sizes to enhance the luxury feel.

**DM Sans** provides a clean, geometric counterpoint for all functional UI elements. It is chosen for its high legibility in dark environments. 

Hierarchy is strictly enforced: large-scale display type for impact, and small, uppercase labels for navigation and metadata. Line heights are kept tight for headings and generous for body copy to ensure breathability.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model centered within the viewport. A 12-column grid is used for desktop, reflowing to a 4-column grid for mobile.

Whitespace is treated as a core design element rather than "empty space." Section gaps are intentionally large (160px+) to isolate content blocks and force focus. 

- **Dividers:** Use 0.5px to 1px solid lines to separate content horizontally. Lines should span the full container width to reinforce the grid.
- **Alignment:** Content is predominantly left-aligned to mirror editorial magazine layouts. 
- **Margins:** Generous outer margins (80px) ensure the content feels framed and premium.

## Elevation & Depth

In keeping with the luxury minimalist style, this design system avoids shadows entirely. Depth is achieved through **Tonal Layering** and **Thin Outlines**.

- **Level 0:** Base background (#0a0a0a).
- **Level 1:** Cards and section backgrounds (#141414).
- **Level 2:** Modals or overlays, which use the same #141414 but are defined by a 1px solid white border to separate them from the background.

There are no blurs or transparency effects. The interface is intentionally flat, relying on the contrast between black, gray, and white to define the stack.

## Shapes

The shape language is strictly **Sharp (0px radius)**. 

Every UI element—including buttons, cards, input fields, and images—must have hard 90-degree corners. This reinforces the architectural, structural nature of the brand and evokes a professional, engineered feel characteristic of high-end studio equipment and modern brutalist architecture.

## Components

### Buttons
- **Primary:** Solid white background with black DM Sans text (Bold, Uppercase). No border.
- **Secondary:** Transparent background with a 1px white border. White text.
- **Hover State:** Subtle transition. For secondary buttons, the background fills with white and text flips to black. For primary buttons, opacity reduces to 90%.

### Cards
- Background: #141414.
- Border: Optional 0.5px mid-gray border for extreme definition.
- Padding: 32px standard.

### Input Fields
- Underline style preferred over boxed. A 1px white bottom border that glows slightly or becomes 2px on focus.
- Placeholder text in #888888.

### Track List / Tables
- Row height: 64px.
- Thin 0.5px divider between tracks.
- Hover state: Background changes to #141414.

### Navigation
- Top-aligned, fixed. 
- Links in DM Sans, 14px, uppercase with 0.1em letter spacing.
- Active state indicated by a simple 1px underline.