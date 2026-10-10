import { useEffect, useRef, useState } from 'react'
import { motion, animate, useMotionValue, useTransform, useMotionValueEvent, AnimatePresence } from 'motion/react'
import { projects, profile, cardGradient } from '../data/projects'
import { useCarousel, wrapDelta, mod } from '../hooks/useCarousel'
import { useViewport } from '../hooks/useViewport'

const N = projects.length
const EASE = [0.2, 0.8, 0.2, 1]

function useGeo() {
  const { w, h, mob } = useViewport()
  const cw = mob ? w * 0.62 : Math.min(w * 0.27, 400)
  const cy = mob ? h * 0.38 : h * 0.5
  return {
    w, h, mob, cw, ch: cw * 0.75, cx: w * 0.5, cy,
    sx: mob ? w * 0.2 : w * 0.12, // horizontal step per card
    sy: mob ? h * 0.3 : h * 0.31, // vertical step per card
    tx: mob ? w * 0.5 : w * 0.8, // title column centre x
    ty: mob ? h * 0.78 : cy, // title column centre y
    tw: mob ? w * 0.8 : Math.min(380, w * 0.25),
    tsy: Math.max(h * 0.3, 320), // title/meta vertical step; >= block height so neighbours never overlap
  }
}

export default function Portfolio() {
  const [panel, setPanel] = useState(null)
  const [active, setActive] = useState(0)
  const { pos, target } = useCarousel(!!panel)
  const intro = useMotionValue(0)
  const g = useGeo()

  useMotionValueEvent(pos, 'change', (p) => setActive(mod(Math.round(p), N)))

  useEffect(() => {
    const c = animate(intro, 1, { duration: 1.4, ease: 'linear' })
    return () => c.stop()
  }, [intro])

  useEffect(() => {
    if (!panel) return
    const onKey = (e) => e.key === 'Escape' && setPanel(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [panel])

  return (
    <div
      className="fixed inset-0 touch-none select-none overflow-hidden font-mono text-ink"
      style={{ background: 'radial-gradient(50% 45% at 15% 105%, rgba(255,43,214,.2), transparent 70%), radial-gradient(40% 40% at 95% -5%, rgba(0,240,255,.14), transparent 70%), radial-gradient(60% 50% at 60% 40%, #2a1250 0%, #0e0f1c 70%)' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(rgba(0,240,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,.05) 1px,transparent 1px)', backgroundSize: '48px 48px', WebkitMaskImage: 'radial-gradient(70% 70% at 50% 50%,#000,transparent)', maskImage: 'radial-gradient(70% 70% at 50% 50%,#000,transparent)' }}
      />
      <Marquee pos={pos} w={g.w} />
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(40% 40% at 70% 50%, rgba(184,77,255,.14), transparent 70%)' }} />
      {projects.map((p, i) => <Card key={'c' + i} i={i} p={p} pos={pos} intro={intro} g={g} />)}
      {projects.map((p, i) => <Title key={'t' + i} i={i} p={p} pos={pos} intro={intro} g={g} />)}
      {!g.mob && projects.map((p, i) => <Meta key={'m' + i} i={i} p={p} pos={pos} intro={intro} g={g} />)}
      <Header pos={pos} target={target} onHome={() => { setPanel(null); target.set(0) }} onPanel={setPanel} />
      <Counter active={active} />
      <Footer active={active} />
      <CrtOverlay />
      <Panel panel={panel} onClose={() => setPanel(null)} />
    </div>
  )
}

/* CRT overlay: scanlines, vignette, sweeping scan beam */
function CrtOverlay() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-40 mix-blend-multiply" style={{ background: 'repeating-linear-gradient(0deg, rgba(0,0,0,.18) 0 1px, transparent 1px 3px)' }} />
      <div className="pointer-events-none absolute inset-0 z-40" style={{ boxShadow: 'inset 0 0 160px rgba(0,0,0,.65)' }} />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-[120px] animate-scan" style={{ background: 'linear-gradient(transparent, rgba(0,240,255,.07), transparent)' }} />
    </>
  )
}

/* Background marquee: infinite, wraps seamlessly */
function Marquee({ pos, w }) {
  const aRef = useRef(null)
  const bRef = useRef(null)
  const copyW = (r) => r.current?.firstElementChild?.offsetWidth || 1
  const xa = useTransform(pos, (p) => -mod(p * w * 0.06, copyW(aRef)))
  const xb = useTransform(pos, (p) => mod(p * w * 0.06, copyW(bRef)) - copyW(bRef))
  const base = 'absolute left-0 flex whitespace-nowrap font-display text-bg font-extrabold will-change-transform'
  return (
    <motion.div className="pointer-events-none absolute inset-0" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.6, ease: 'easeOut' }}>
      <motion.div ref={aRef} style={{ x: xa, textShadow: '-.012em 0 #00f0ff, .012em 0 #ff2bd6' }} className={base + ' -top-[4vw] text-neon opacity-[.13]'}>
        {Array.from({ length: 4 }, (_, k) => <span key={k}>{profile.first}&nbsp;</span>)}
      </motion.div>
      <motion.div ref={bRef} style={{ x: xb, WebkitTextStroke: '1.5px #00f0ff' }} className={base + ' -bottom-[3vw] text-transparent opacity-[.22]'}>
        {Array.from({ length: 4 }, (_, k) => <span key={k}>{profile.last}&nbsp;</span>)}
      </motion.div>
    </motion.div>
  )
}

/* Card: enters top-right, passes centre dead straight, exits bottom-left */
function Card({ i, p, pos, intro, g }) {
  const d = useTransform(pos, (v) => wrapDelta(i, v, N))
  const opacity = useTransform([d, intro], ([x, k]) => Math.max(0, 1 - Math.abs(x) * 0.38) * k)
  const display = useTransform(d, (x) => (Math.abs(x) > 2.7 ? 'none' : 'block'))
  const zIndex = useTransform(d, (x) => 10 - Math.round(Math.abs(x) * 2))
  const x = useTransform(d, (v) => g.cx + v * g.sx - g.cw / 2)
  const y = useTransform(d, (v) => g.cy - v * g.sy - g.cw * 0.375)
  const rotate = useTransform(d, (v) => v * -3.5 - 4 * Math.min(1, Math.abs(v))) // 0deg when focused
  const skewY = useTransform(d, (v) => -7 * Math.min(1, Math.abs(v))) // 0deg when focused
  const scale = useTransform(d, (v) => 1 - Math.min(Math.abs(v), 2.5) * 0.14)
  return (
    <motion.div
      style={{ x, y, rotate, skewY, scale, opacity, display, zIndex, width: g.cw, aspectRatio: '4/3' }}
      className="pointer-events-none absolute left-0 top-0 overflow-hidden rounded-md border border-cyber/55 shadow-card will-change-transform"
    >
      {p.image ? (
        <>
          {/* blurred fill behind, full uncropped image on top */}
          <img src={p.image} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-xl" />
          <img src={p.image} alt={p.name} className="absolute inset-0 h-full w-full object-contain" />
        </>
      ) : (
        <>
          <div className="absolute inset-0" style={{ background: cardGradient(i) }} />
          <div className="absolute left-1.5 top-1.5 z-[2] h-3.5 w-3.5 border-l-2 border-t-2 border-cyber" />
          <div className="absolute bottom-1.5 right-1.5 z-[2] h-3.5 w-3.5 border-b-2 border-r-2 border-hot" />
          <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(0deg, rgba(255,255,255,.04) 0 1px, transparent 1px 6px)' }} />
          <div className="absolute right-3 top-2.5 text-[11px] tracking-[.12em] text-white/70">[ screenshot.png ]</div>
        </>
      )}
      <div className="absolute bottom-1.5 left-3 font-display text-[clamp(40px,6vw,84px)] font-extrabold leading-none tracking-[-0.05em] text-white/90">
        {String(i + 1).padStart(2, '0')}
      </div>
    </motion.div>
  )
}

/* Right-hand title + description (neighbours fade top & bottom) */
function Title({ i, p, pos, intro, g }) {
  const d = useTransform(pos, (v) => wrapDelta(i, v, N))
  const opacity = useTransform([d, intro], ([v, k]) => {
    const ad = Math.abs(v)
    const vis = g.mob ? Math.max(0, 1 - ad) : Math.max(0, 1 - ad * 0.5)
    return (ad < 0.5 ? 1 : vis * (ad < 1.2 ? 0.28 : 0.1)) * k
  })
  // desktop: block spans exactly the card's top..bottom edges; mobile: centred under the card
  const y = useTransform(d, (v) => g.ty - v * g.tsy - (g.mob ? 0 : g.ch / 2))
  const display = useTransform(d, (v) => (Math.abs(v) > 2.7 ? 'none' : 'flex'))
  return (
    <motion.div style={{ x: g.tx - g.tw / 2, y, yPercent: g.mob ? -50 : 0, opacity, display, width: g.tw, height: g.mob ? 'auto' : g.ch }} className="pointer-events-none absolute left-0 top-0 flex flex-col justify-center text-center will-change-transform">
      <div className="text-xs text-cyber">// {p.cat}</div>
      {p.soon && (
        <div className="mx-auto mt-2 w-fit rounded-sm border border-hot px-2 py-0.5 text-[10px] font-bold uppercase tracking-[.16em] text-hot shadow-[0_0_10px_rgba(255,43,214,.45)]">
          Live soon...
        </div>
      )}
      <div className="mt-2 font-display text-[clamp(18px,1.6vw,24px)] font-extrabold leading-tight tracking-[-0.02em]" style={{ textShadow: '1.5px 0 #ff2bd6, -1.5px 0 #00f0ff' }}>{p.name}</div>
      <div className="mx-auto my-3 h-0.5 w-7 bg-gradient-to-r from-cyber to-hot" />
      <div className="text-balance text-[13px] leading-relaxed text-ink-100">
        {/* the ">" hangs outside the first word so it never shifts the centred text */}
        <span className="relative"><span className="absolute right-full pr-[1ch] text-hot">&gt;</span>{p.desc.split(' ')[0]}</span> {p.desc.split(' ').slice(1).join(' ')}
      </div>
    </motion.div>
  )
}

/* Left meta block (desktop only). Only the active item is visible at rest */
function Meta({ i, p, pos, intro, g }) {
  const d = useTransform(pos, (v) => wrapDelta(i, v, N))
  const opacity = useTransform([d, intro], ([v, k]) => Math.max(0, 1 - Math.abs(v) * 1.6) * k)
  const y = useTransform(d, (v) => g.cy - v * g.tsy - g.ch / 2)
  return (
    <motion.div style={{ x: g.w * 0.024, y, opacity, height: g.ch }} className="pointer-events-none absolute left-0 top-0 flex w-[28vw] flex-col justify-center text-sm">
      <div className="grid grid-cols-[90px_1fr] gap-x-3 gap-y-[18px]">
        <span className="text-cyber">› role</span><span className="text-ink-100">{p.role}</span>
        <span className="text-cyber">› year</span><span className="text-ink-100">{p.year}</span>
        <span className="text-cyber">› stack</span><span className="text-ink-100">{p.stack}</span>
      </div>
    </motion.div>
  )
}

/* Top-left logo (rotates with scroll, spinning ring, floats) + nav; top-right status */
function Header({ pos, target, onHome, onPanel }) {
  const rotate = useTransform(pos, (p) => p * 40)
  const scale = useTransform(pos, (p) => 1 + Math.min(0.15, Math.abs(target.get() - p) * 0.1))
  return (
    <>
      <motion.div
        className="absolute left-[clamp(16px,2.4vw,36px)] top-[clamp(14px,2.2vw,32px)] z-20 flex flex-col gap-[18px]"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
      >
        <motion.button style={{ rotate, scale }} onClick={onHome} aria-label="Home" className="relative h-[72px] w-[72px] cursor-pointer">
          <svg viewBox="0 0 72 72" className="absolute inset-0 animate-spin-slow"><circle cx="36" cy="36" r="34" fill="none" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="3 7" /></svg>
          <div className="absolute inset-[10px] grid animate-bob place-items-center rounded-sm border-[1.5px] border-cyber bg-bg-raised shadow-logo">
            <span className="text-[19px] font-medium tracking-[-0.06em]">pm<span className="animate-blink text-hot">_</span></span>
          </div>
        </motion.button>
        <nav className="flex flex-col gap-0.5 text-[clamp(12px,1.1vw,14px)] font-medium">
          <a href="#work" onClick={(e) => { e.preventDefault(); onHome() }} className="!text-cyber">&gt; ./work</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); onPanel('about') }} className="!text-ink-300 hover:!text-white">./about</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); onPanel('contact') }} className="!text-ink-300 hover:!text-white">./contact</a>
        </nav>
      </motion.div>
      <div className="absolute right-[clamp(16px,2.4vw,36px)] top-[clamp(14px,2.2vw,32px)] z-20 text-right text-xs leading-relaxed">
        <div className="flex items-center justify-end gap-2 text-ink-200">
          <span className="h-[7px] w-[7px] animate-pulse-dot rounded-full bg-[#39ff88] shadow-[0_0_10px_#39ff88]" />
          status: online · open to work
        </div>
        <a href={'mailto:' + profile.email} className="!text-ink-300">{profile.email}</a>
      </div>
    </>
  )
}

/* Giant counter bottom-left, re-animates on change */
function Counter({ active }) {
  return (
    <div className="pointer-events-none absolute bottom-[clamp(40px,5vw,70px)] left-[clamp(12px,2vw,32px)] z-30 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: '40%', skewY: 6 }} animate={{ opacity: 1, y: 0, skewY: 0 }} exit={{ opacity: 0, y: '-30%' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="animate-glitch font-display text-counter font-extrabold text-white [text-shadow:.02em_0_#ff2bd6,-.02em_0_#00f0ff]"
        >
          {String(active + 1).padStart(2, '0')}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* Inline SVG icons (Phosphor "regular" paths) so no icon dependency is needed */
const Icon = ({ d, className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 256 256" fill="currentColor" className={className} aria-hidden="true"><path d={d} /></svg>
)
const ICONS = {
  github: 'M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z',
  linkedin: 'M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z',
  close: 'M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z',
}

function Footer({ active }) {
  const link = 'flex items-center gap-1.5'
  return (
    <div className="absolute inset-x-0 bottom-0 z-[25] flex items-center justify-between gap-3 px-[clamp(16px,2.4vw,36px)] pb-[clamp(12px,1.6vw,22px)] text-xs">
      <div className="flex items-center gap-4">
        <a href={profile.social.github} className={link}><Icon d={ICONS.github} />git</a>
        <a href={profile.social.linkedin} className={link}><Icon d={ICONS.linkedin} />linkedin</a>
      </div>
      <div className="animate-flick tracking-[.1em] text-cyber">idx[{String(active + 1).padStart(2, '0')}/{String(N).padStart(2, '0')}] · ready_</div>
      <div className="flex items-center gap-2.5 tracking-[.08em] text-ink-300">
        scroll
        <span className="relative h-7 w-px overflow-hidden bg-ink-700"><span className="absolute inset-0 animate-drop bg-hot" /></span>
      </div>
    </div>
  )
}

/* About / Contact slide-in panel (Esc closes) */
function Panel({ panel, onClose }) {
  return (
    <AnimatePresence>
      {panel && (
        <motion.div key="bd" className="absolute inset-0 z-50 bg-[rgba(8,8,18,.6)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.aside
            onClick={(e) => e.stopPropagation()}
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.5, ease: EASE }}
            className="flex h-full w-[min(520px,100%)] flex-col gap-4 border-r border-cyber bg-bg-panel p-[clamp(24px,4vw,56px)] shadow-panel"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[.14em] text-cyber">&gt; cat {panel === 'about' ? 'About' : 'Contact'}.md</span>
              <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-md hover:bg-white/5"><Icon d={ICONS.close} /></button>
            </div>
            <h2 className="font-display text-[clamp(40px,7vw,80px)] font-extrabold leading-[.95] tracking-[-0.04em] [text-shadow:3px_0_#ff2bd6,-3px_0_#00f0ff]">
              {panel === 'about' ? profile.name : "Let's talk"}
            </h2>
            {panel === 'about' ? (
              <p className="whitespace-pre-line text-base leading-relaxed text-ink-200">{profile.about}</p>
            ) : (
              <ul className="flex flex-col gap-3 break-all text-base leading-relaxed">
                {profile.links.map((l) => <li key={l.href}><a href={l.href} target="_blank" rel="noreferrer">{l.label}</a></li>)}
              </ul>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
