import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            position:       'fixed',
            inset:          0,
            zIndex:         'var(--z-loading)',
            background:     '#000000',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
          }}
        >
          <motion.h1
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      '60px',
              color:         '#ffffff',
              letterSpacing: '0.2em',
            }}
          >
            THIMM
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
