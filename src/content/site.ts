export const resumeHref = '/Shrawan_Kumar_Resume_2026.pdf';

export const profile = {
  name: 'Shrawan Kumar',
  shortName: 'SK',
  role: 'Backend-first Full-Stack Developer',
  location: 'Vadodara, Gujarat',
  availability: 'Open to full-time opportunities',
  currentFocus:
    'Building scalable fintech workflows, responsive product interfaces, and reliable real-time systems.',
  primaryEmail: 'shravanc911@gmail.com',
  phone: '+91 8290114706',
  linkedin: 'https://www.linkedin.com/in/shrawankumar911/',
  github: 'https://github.com/shrawanc911',
  portfolio: 'https://shrawankumar.in',
} as const;

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Contact', href: '#contact' },
] as const;

export const heroStats = [
  { value: '5,654+', label: 'Stocks processed in portfolio workflows' },
  { value: '7+', label: 'Months of hands-on shipping experience' },
  { value: '2026', label: 'B.Tech graduation year' },
] as const;

export const heroHighlights = [
  'Owns features from API design and job queues to polished React screens.',
  'Comfortable with caching, background processing, WebSockets, and system-level thinking.',
  'Looking for backend-heavy full-time roles where product quality and scale both matter.',
] as const;

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  context: string;
  summary: string;
  highlights: string[];
}

export const experienceEntries: ExperienceEntry[] = [
  {
    role: 'Full-Stack Developer',
    company: 'Aarthik.ai',
    period: 'Current product focus',
    context: 'Fintech systems and AI-powered features',
    summary:
      'Shipping backend-heavy product work across live market data, portfolio analytics, and real-time user experiences.',
    highlights: [
      'Architected worker and cron pipelines for market data sync, portfolio computation, and news processing.',
      'Built Redis-backed caching, queue-driven jobs, and WebSocket delivery for responsive product behavior.',
      'Contributed frontend work in React and Tailwind when product polish needed to match backend performance.',
    ],
  },
  {
    role: 'MERN Stack Intern',
    company: 'PocketWise Technologies',
    period: 'February 2025',
    context: 'Team size: 5',
    summary:
      'Worked across frontend and backend using SQL, Express, React, and Node.js to keep features usable and production-ready.',
    highlights: [
      'Built and integrated APIs with database workflows across the product stack.',
      'Supported deployment and hosting tasks while maintaining a smooth user experience.',
      'Collaborated closely with a small product team to keep delivery moving quickly.',
    ],
  },
];

export interface EducationEntry {
  title: string;
  meta: string;
  period: string;
  detail: string;
}

export const educationEntries: EducationEntry[] = [
  {
    title: 'Parul University',
    meta: 'Bachelor of Technology',
    period: 'September 2022 - May 2026',
    detail: 'Current CGPA: 8.61',
  },
  {
    title: 'SPN Government Senior Secondary School',
    meta: 'PCM (RBSE)',
    period: 'June 2021 - April 2022',
    detail: 'Scored 81%',
  },
  {
    title: 'SPN Government Senior Secondary School',
    meta: 'Secondary (RBSE)',
    period: 'June 2019 - April 2020',
    detail: 'Scored 74.17%',
  },
];

export const credentials = [
  'Coursera: Introduction to Software, Programming and Database',
  'IBM: Git and GitHub Basics',
  'Co-curricular: Coding Club member and NCC participant',
] as const;

export interface FeaturedProject {
  title: string;
  company: string;
  challenge: string;
  solution: string;
  impact: string;
  tech: string[];
  tags: string[];
  flow: string[];
  link?: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    title: 'Portfolio Computing Engine',
    company: 'Aarthik.ai',
    challenge:
      'Users needed reliable portfolio scores, P&L, and performance metrics synced with live market data every 15 minutes.',
    solution:
      'Built a worker-based pipeline that batches LTP fetches for 5,654+ stocks, computes portfolio metrics, updates Redis, and preserves consistency with transactional writes.',
    impact:
      'Turned a heavy data pipeline into a predictable, repeatable service that supports near-real-time portfolio views.',
    tech: ['Node.js', 'BullMQ', 'Redis', 'MongoDB'],
    tags: ['Workers', 'Batch processing', 'Transactions', 'Fintech'],
    flow: [
      'Cron trigger starts sync cycle',
      'Batch market prices are fetched and normalized',
      'Workers compute account-level metrics',
      'Redis and MongoDB are updated atomically',
      'Fresh results are pushed back to the product',
    ],
    link: 'https://aarthik.ai',
  },
  {
    title: 'AI Chatbot with Streaming Responses',
    company: 'Aarthik.ai',
    challenge:
      'The chat experience needed instant feedback even when LLM responses were slow and had to run off the main request path.',
    solution:
      'Queued LLM jobs in the background, streamed tokens over WebSockets, and used Redis pub/sub to coordinate title generation and cross-service updates.',
    impact:
      'Kept the chat UI responsive while preserving a clean backend contract for long-running AI tasks.',
    tech: ['WebSockets', 'BullMQ', 'Redis Pub/Sub', 'OpenAI'],
    tags: ['Streaming', 'Queues', 'Real-time', 'AI'],
    flow: [
      'REST request creates a background job',
      'Worker calls the LLM and receives token chunks',
      'Redis pub/sub shares progress between services',
      'WebSocket emits streaming updates to the client',
      'Chat metadata is finalized once generation completes',
    ],
    link: 'https://aarthik.ai',
  },
  {
    title: 'Explore News Intelligence Pipeline',
    company: 'Aarthik.ai',
    challenge:
      'Thousands of finance news articles needed clustering, deduplication, and summarization on a recurring schedule.',
    solution:
      'Created an RSS-to-vector pipeline that batches ingestion, embeds articles, groups them by similarity, summarizes clusters, and resets storage for the next cycle.',
    impact:
      'Automated a previously noisy workflow into a repeatable content system for richer financial discovery.',
    tech: ['Cron jobs', 'MongoDB', 'Vector search', 'ChatGPT'],
    tags: ['Pipelines', 'Embeddings', 'NLP', 'Automation'],
    flow: [
      'RSS feeds are collected on schedule',
      'Articles are upserted and grouped by batch',
      'Embeddings are created for similarity search',
      'Clusters are summarized into digestible insights',
      'Temporary vector data is cleaned for the next run',
    ],
    link: 'https://aarthik.ai/explore',
  },
  {
    title: 'Watchlist and Stock Search',
    company: 'Aarthik.ai',
    challenge:
      'The product needed fast stock search, duplicate prevention across lists, and smooth watchlist CRUD at scale.',
    solution:
      'Combined Redis-cached queries, preloaded ISIN maps, context-driven state, and lazy loading so the interface stayed quick without overfetching.',
    impact:
      'Improved day-to-day usability by keeping search and watchlist interactions responsive even as data volume grew.',
    tech: ['React', 'Redis', 'MongoDB', 'Context API'],
    tags: ['Caching', 'UX', 'Search', 'Full stack'],
    flow: [
      'Search request checks Redis before the database',
      'ISIN maps prevent duplicate entries across lists',
      'Selected watchlists lazy-load deeper details',
      'UI state stays synchronized with lightweight updates',
      'Updated lists are reflected immediately in the client',
    ],
    link: 'https://aarthik.ai',
  },
];

export interface SideProject {
  title: string;
  period: string;
  summary: string;
  tech: string[];
}

export const sideProjects: SideProject[] = [
  {
    title: 'Six Digits',
    period: 'February 2025 - March 2025',
    summary:
      'A MERN trading platform with a responsive landing page, blog section, and financial insight modules designed for cross-device usability.',
    tech: ['SQL', 'Express.js', 'Node.js', 'React.js'],
  },
  {
    title: 'Univibe',
    period: 'March 2025 - April 2025',
    summary:
      'A community-focused university portal with events, posting, role-based access control, authentication, and real-time collaboration features.',
    tech: ['MongoDB', 'Express.js', 'Node.js', 'React.js'],
  },
  {
    title: 'Weather Vision',
    period: 'November 2024 - December 2024',
    summary:
      'A weather exploration app that helps users search cities quickly and review live forecast information through a clean interface.',
    tech: ['HTML5', 'CSS', 'JavaScript', 'React.js'],
  },
];

export interface ContactLink {
  kind: 'email' | 'phone' | 'linkedin' | 'github' | 'portfolio';
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

export const contactLinks: ContactLink[] = [
  {
    kind: 'email',
    label: 'Email',
    value: profile.primaryEmail,
    href: `mailto:${profile.primaryEmail}`,
  },
  {
    kind: 'phone',
    label: 'Phone',
    value: profile.phone,
    href: 'tel:+918290114706',
  },
  {
    kind: 'linkedin',
    label: 'LinkedIn',
    value: '/in/shrawankumar911',
    href: profile.linkedin,
    external: true,
  },
  {
    kind: 'github',
    label: 'GitHub',
    value: '@shrawanc911',
    href: profile.github,
    external: true,
  },
  {
    kind: 'portfolio',
    label: 'Portfolio',
    value: 'shrawankumar.in',
    href: profile.portfolio,
    external: true,
  },
];
