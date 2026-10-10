// Source: resume. If `image` is set, it renders in the card instead of the gradient.
export const projects = [
  {
    name: 'DRDO Intranet Portal',
    cat: 'Work · Intranet',
    year: '2025 – now',
    desc: 'Full-stack intranet portal for 200+ internal users: real-time messaging, file sharing, complaint tracking and reports. Deployed on internal servers with zero external exposure.',
    role: 'Software Engineer, DRDO',
    stack: 'HTML, CSS, Node.js',
  },
  {
    name: 'VR Disaster Response Simulator',
    cat: 'Work · VR',
    year: '2025 – now',
    desc: 'Immersive Unity simulator recreating a real-world location to train personnel in emergency rescue, with OpenXR for cross-device VR support.',
    role: 'Software Engineer, DRDO',
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
    stack: 'Next.js, Go, PostgreSQL, Prisma, WebSockets',
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
