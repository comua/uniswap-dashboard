import { motion } from 'framer-motion'
import React, { FC, PropsWithChildren } from 'react'

interface IPageTransitionProps {
  className?: string
}

const transition = {
  duration: 1,
  zIndex: { duration: 0.01 },
  ease: [0.83, 0, 0.17, 1],
}

const AnimationSettings = {
  initial: {
    opacity: 1,
    zIndex: 1,
    x: '100svw',
    transition: transition,
  },
  animate: { opacity: 1, x: 0, transition: transition },
  exit: {
    opacity: 0,
    x: '-30svw',
    zIndex: -10,
    transition: transition,
  },
}

export const PageTransition: FC<PropsWithChildren<IPageTransitionProps>> = ({
  children,
  className,
}) => {
  return (
    <motion.div className={className} {...AnimationSettings}>
      {children}
    </motion.div>
  )
}
