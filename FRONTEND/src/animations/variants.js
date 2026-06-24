// Fade simple
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
  transition: { duration: 0.3 }
}

// Slide depuis le bas
export const slideUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: 40 },
  transition: { duration: 0.4 }
}

// Slide depuis la gauche
export const slideLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -60 },
  transition: { duration: 0.4 }
}

// Zoom in (modals)
export const zoomIn = {
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1 },
  exit:    { opacity: 0, scale: 0.85 },
  transition: { duration: 0.3 }
}

// Cards en cascade
export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
}