import { useEffect, useState } from 'react'

const read = () => ({ w: window.innerWidth, h: window.innerHeight })

export function useViewport() {
  const [v, set] = useState(read)
  useEffect(() => {
    const onResize = () => set(read())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return { ...v, mob: v.w < 800 }
}
