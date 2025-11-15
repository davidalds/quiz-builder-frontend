import { motion } from 'framer-motion'
import { LoaderCircle } from 'lucide-react'

const MLoaderCircle = motion.create(LoaderCircle)

function LoadingComponent() {
  return (
    <MLoaderCircle
      size={'40px'}
      animate={{ rotate: 360 }}
      transition={{ type: 'spring', repeat: Infinity }}
      className="text-foreground"
    />
  )
}

export default LoadingComponent
