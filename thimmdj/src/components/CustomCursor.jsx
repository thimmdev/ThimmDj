import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const mouse     = useRef({ x: 0, y: 0 })
  const pos       = useRef({ x: 0, y: 0 })
  const rafId     = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const onMove = e => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    const onEnter = () => cursor.classList.add('hovered')
    const onLeave = () => cursor.classList.remove('hovered')

    const animate = () => {
      const lerp = 0.15
      pos.current.x += (mouse.current.x - pos.current.x) * lerp
      pos.current.y += (mouse.current.y - pos.current.y) * lerp
      cursor.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      rafId.current = requestAnimationFrame(animate)
    }

    const interactives = document.querySelectorAll('a, button, input, select, textarea, [role="button"]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', onMove)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <style>{`
        #custom-cursor {
          position: fixed;
          top: -6px;
          left: -6px;
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          pointer-events: none;
          z-index: var(--z-cursor);
          mix-blend-mode: difference;
          will-change: transform;
          transition: width 0.2s var(--ease-out), height 0.2s var(--ease-out), top 0.2s var(--ease-out), left 0.2s var(--ease-out), opacity 0.2s;
        }
        #custom-cursor.hovered {
          width: 32px;
          height: 32px;
          top: -16px;
          left: -16px;
          opacity: 0.5;
        }
        @media (hover: none) {
          #custom-cursor { display: none; }
        }
      `}</style>
      <div id="custom-cursor" ref={cursorRef} />
    </>
  )
}
