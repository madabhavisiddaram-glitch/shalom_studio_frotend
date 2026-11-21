import { motion } from 'framer-motion'

/** Wraps each route with a gentle fade transition */
export default function Page({ children }) {
  return (
    <motion.main
      id="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  )
}
