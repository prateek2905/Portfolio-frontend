import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring } from 'motion/react'

/**
 * Infinite, bidirectional position. `target` is driven by wheel / touch / keys,
 * `pos` is a spring-smoothed MotionValue. 140ms idle snaps target to nearest integer.
 * Input is ignored while `locked` (About/Contact panel open).
 */
export function useCarousel(locked) {
  const target = useMotionValue(0)
  const pos = useSpring(target, { stiffness: 90, damping: 22, mass: 0.6 })
  const idle = useRef()

  useEffect(() => {
    const nudge = (v) => {
      if (locked) return
      target.set(target.get() + v)
      clearTimeout(idle.current)
      idle.current = setTimeout(() => target.set(Math.round(target.get())), 140)
    }
    let ty = null
    const wheel = (e) => {
      e.preventDefault()
      nudge(Math.max(-120, Math.min(120, e.deltaY)) * 0.0028)
    }
    const touchStart = (e) => { ty = e.touches[0].clientY }
    const touchMove = (e) => {
      if (ty == null) return
      const y = e.touches[0].clientY
      nudge((y - ty) * 0.006)
      ty = y
    }
    const key = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') nudge(1)
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') nudge(-1)
    }
    window.addEventListener('wheel', wheel, { passive: false })
    window.addEventListener('touchstart', touchStart, { passive: true })
    window.addEventListener('touchmove', touchMove, { passive: true })
    window.addEventListener('keydown', key)
    return () => {
      window.removeEventListener('wheel', wheel)
      window.removeEventListener('touchstart', touchStart)
      window.removeEventListener('touchmove', touchMove)
      window.removeEventListener('keydown', key)
      clearTimeout(idle.current)
    }
  }, [locked, target])

  return { pos, target }
}

export const wrapDelta = (i, p, N) => ((((i - p + N / 2) % N) + N) % N) - N / 2
export const mod = (x, m) => ((x % m) + m) % m
