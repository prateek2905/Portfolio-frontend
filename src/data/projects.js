import cosketch from '../assets/cosketch.png'
import ghbot from '../assets/ghbot.png'
import payflowtrack from '../assets/payflowtrack.png'
import journaling from '../assets/journaling.png'
import vr from '../assets/vr.png'
import redacted from '../assets/redacted.svg'
import esports from '../assets/esports.png'

// Source: resume. If `image` is set, it renders in the card instead of the gradient.
export const projects = [
  {
    name: 'DRDO Intranet Portal',
    cat: 'Work · Intranet',
    year: '2025 – now',
    desc: 'Full-stack intranet portal for 200+ internal users: real-time messaging, file sharing, complaint tracking and reports. Deployed on internal servers with zero external exposure.',
    role: 'Software Engineer, DRDO',
    image: redacted,
    stack: 'HTML, CSS, Node.js',
  },
  {
    name: 'VR Disaster Response Simulator',
    cat: 'Work · VR',
    year: '2025 – now',
    desc: 'Immersive Unity simulator recreating a real-world location to train personnel in emergency rescue, with OpenXR for cross-device VR support.',
    role: 'Software Engineer, DRDO',
    image: vr,
    stack: 'Unity, C#, OpenXR',
  },
  {
    name: 'Wishd',
    cat: 'Work · Platform',
    year: '2024 – now',
    desc: 'Global event gifting and registry platform for Bilzo Labs. SSR guest pages load in under 2 seconds on 4G.',
    role: 'Freelance Software Engineer',
    stack: 'Nuxt 3, Fastify, MongoDB Atlas, AWS',
  },
  {
    name: 'Bilzo Consumer App',
    cat: 'Work · Frontend',
    year: '2024 – now',
    desc: 'Contributed to the consumer-facing application frontend, building UI features and wiring client-side flows to existing backend services.',
    role: 'Freelance Software Engineer',
    stack: 'React, Next.js',
  },
  {
    name: 'CoSketch',
    cat: 'Project · Real-time',
    year: '2024',
    desc: 'Collaborative whiteboard with shared rooms and live shape sync. Realtime server rebuilt in Go with a lock-free, channel-based hub.',
    role: 'Creator',
    image: cosketch,
    stack: 'Next.js, Go, PostgreSQL, Prisma, WebSockets',
  },
  {
    name: 'GitHub Automation Bot',
    cat: 'Project · Automation',
    year: 'Side project',
    desc: 'Event-driven bot that reacts to GitHub webhooks using rules set in a dashboard: auto-label, comment or ping Slack. Persist-then-ACK ingest, a retrying worker and two-level idempotency keep every action exactly-once. Live at prateek-gh-bot.vercel.app.',
    role: 'Creator',
    image: ghbot,
    stack: 'React, Node.js, Express, Prisma, PostgreSQL, GitHub App',
  },
  {
    name: 'PayFlowTrack',
    cat: 'Project · Fintech',
    year: 'Side project',
    desc: 'Peer-to-peer payments app with spending analytics and budgets. Atomic MongoDB-session transfers, tagged transactions, and hand-built SVG charts for daily spend and category breakdown.',
    role: 'Creator',
    image: payflowtrack,
    stack: 'React, Node.js, Express, MongoDB, JWT, Tailwind',
  },
  {
    name: 'Esports Coach',
    cat: 'Project · AI',
    year: 'Live soon',
    soon: true,
    desc: 'RAG-powered coaching webapp: log in with your game ID, pull your stats and match history, and get a Gemini-generated report on how to improve. Redis caches logins and game data for fast responses.',
    role: 'Creator',
    image: esports,
    stack: 'React, Tailwind, RAG, Redis, Gemini API',
  },
  {
    name: 'Journaling Habits',
    cat: 'Project · Mobile',
    year: 'Live soon',
    soon: true,
    desc: 'Offline-first Flutter bullet journal on a hand-drawn grid-paper look: tasks, moments, a habit grid, sleep chart, Apple Health / Health Connect sleep sync and home-screen widgets.',
    role: 'Creator',
    image: journaling,
    stack: 'Flutter, Dart, Hive, Provider, WidgetKit',
  },
]

// Card gradient placeholder: odd cards cyan, even cards magenta, both fading to deep indigo
export const cardGradient = (i) =>
  `linear-gradient(135deg, oklch(.62 .27 ${i % 2 ? 205 + (i % 3) * 10 : 335 + (i % 3) * 8}) 0%, oklch(.2 .12 ${285 + (i % 4) * 8}) 100%)`

export const profile = {
  name: 'Prateek Mishra',
  first: 'PRATEEK',
  last: 'MISHRA',
  role: 'Software Engineer',
  email: 'prateekmishra2927@gmail.com',
  about:
    'Full-stack software engineer at DRDO, building secure, scalable web platforms and immersive simulations.\n\nI work across Next.js, React, Nuxt and Node.js, and like realtime collaborative systems, server-rendered consumer platforms and locked-down intranet tools.\n\nFreelancing with Bilzo Labs on the side. B.E. Computer Science, Chandigarh University. GATE qualified (CS&IT).',
  links: [
    { label: 'prateekmishra2927@gmail.com', href: 'mailto:prateekmishra2927@gmail.com' },
    { label: 'linkedin.com/in/prateek-mishra-6478171b6', href: 'https://linkedin.com/in/prateek-mishra-6478171b6' },
    { label: 'github.com/prateek2905', href: 'https://github.com/prateek2905' },
  ],
  social: {
    github: 'https://github.com/prateek2905',
    linkedin: 'https://linkedin.com/in/prateek-mishra-6478171b6',
  },
}
