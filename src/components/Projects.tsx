import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    title: string;
    problem: string;
    solution: string;
    tech: string[];
    tags: string[];
    flow: string[];
    link?: string;
}

const projects: Project[] = [
    {
        title: 'Portfolio Computing Engine',
        problem:
            'Users needed real-time portfolio scores, P&L, and performance metrics — synced with live market data every 15 minutes.',
        solution:
            'Built a worker-based pipeline that fetches LTP of 5,654+ stocks via batch operations, computes portfolio metrics, updates Redis, and keeps historical data consistent with holdings data. Used transactions for atomic operations.',
        tech: ['Node.js', 'BullMQ', 'Redis', 'MongoDB'],
        tags: ['Workers', 'Batch Ops', 'Transactions', 'LTP Sync'],
        flow: ['Cron Trigger', 'Batch LTP Fetch', 'Worker Pool', 'Portfolio Compute', 'Redis Update', 'Client Push'],
        link: 'https://aarthik.ai',
    },
    {
        title: 'AI Chatbot with Streaming',
        problem:
            'Users expected instant, streaming AI responses — but the LLM API was slow and had to run in the background.',
        solution:
            'REST API enqueues a worker job → worker calls LLM API → streams tokens to frontend via WebSocket. Auto-generates chat titles on first message using Redis pub/sub for cross-service communication.',
        tech: ['WebSockets', 'BullMQ', 'Redis Pub/Sub', 'OpenAI'],
        tags: ['Streaming', 'Pub/Sub', 'Workers', 'Real-time'],
        flow: ['REST Request', 'Job Queue', 'LLM Worker', 'Token Stream', 'WebSocket Push', 'Title Generate'],
        link: 'https://aarthik.ai',
    },
    {
        title: 'Explore — News Aggregation Pipeline',
        problem:
            'Thousands of financial news articles needed to be clustered, deduplicated, and summarized automatically — every few hours.',
        solution:
            'Cron job fetches RSS feeds → assigns batch IDs → upserts to MongoDB → embeds articles in Vector DB for 0.7-similarity clustering → summarizes clusters via ChatGPT → cleans up vector storage for the next cycle.',
        tech: ['Cron Jobs', 'Vector DB', 'MongoDB', 'ChatGPT'],
        tags: ['Vector Search', 'Clustering', 'NLP', 'Pipeline'],
        flow: ['Cron Start', 'RSS Fetch', 'Batch Assign', 'Vector Embed', 'Cluster Build', 'GPT Summarize'],
        link: 'https://aarthik.ai/explore',
    },
    {
        title: 'Watchlist & Stock Search',
        problem:
            'Users needed fast stock search with instant results, CRUD watchlists, and smart detection of duplicate stocks across lists.',
        solution:
            'Full-stack implementation — Redis-cached search queries, context providers for state management, ISINs fetched at load for O(1) duplicate checks, lazy-loading full data only when user opens a specific watchlist.',
        tech: ['React', 'Redis', 'MongoDB', 'Context API'],
        tags: ['Full-Stack', 'Caching', 'UX', 'Performance'],
        flow: ['Search Query', 'Redis Cache Check', 'DB Fallback', 'Cache Store', 'UI Render', 'Watchlist Sync'],
        link: 'https://aarthik.ai',
    },
    {
        title: 'Screener & Market Tools',
        problem:
            'Traders needed real-time screeners filtered by VWAP, RSI, and other technical indicators with fundamental data overlay.',
        solution:
            'Ingested fundamental data (financials, balance sheets, quarterly results) for 5,654+ Indian stocks. Built filterable screener UI with lazy loading. Created MMI (Market Mood Index) tool tracking live market sentiment.',
        tech: ['Node.js', 'MongoDB', 'Dhan API', 'React'],
        tags: ['Fintech', 'Data Pipeline', 'Screener', 'Live Data'],
        flow: ['API Ingest', 'Data Transform', 'MongoDB Store', 'Filter Engine', 'Paginated Response', 'Chart Render'],
        link: 'https://aarthik.ai',
    },
    {
        title: 'Auth & Admin Dashboard',
        problem:
            'Needed secure OTP-based login, Google OAuth, and internal analytics dashboard tracking all user activity.',
        solution:
            'OTP stored in Redis with TTL, mailing handled by workers. Admin routes track total users, chats, resyncs, portfolio values, tracked assets — all with pagination. Added broker disconnect with transactional rollback.',
        tech: ['JWT', 'Redis', 'Google OAuth', 'BullMQ'],
        tags: ['Security', 'Analytics', 'Admin', 'Auth'],
        flow: ['Login Request', 'OTP Generate', 'Redis Store', 'Mail Worker', 'JWT Issue', 'Session Create'],
        link: 'https://aarthik.ai',
    },
];

function FlowDiagram({ flow }: { flow: string[] }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const nodes = containerRef.current?.querySelectorAll('.flow-node');
        const lines = containerRef.current?.querySelectorAll('.flow-line');

        if (nodes) {
            gsap.fromTo(
                nodes,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.4, stagger: 0.12, ease: 'back.out(1.7)' }
            );
        }
        if (lines) {
            gsap.fromTo(
                lines,
                { scaleX: 0 },
                { scaleX: 1, duration: 0.3, stagger: 0.12, delay: 0.2, ease: 'power2.out' }
            );
        }

        const dots = containerRef.current?.querySelectorAll('.flow-dot');
        if (dots) {
            dots.forEach((dot) => {
                gsap.fromTo(
                    dot,
                    { left: '0%', opacity: 0 },
                    {
                        left: '100%',
                        opacity: 1,
                        duration: 1.5,
                        repeat: -1,
                        ease: 'none',
                        delay: Math.random() * 0.5,
                    }
                );
            });
        }
    }, []);

    return (
        <div ref={containerRef} className="mt-8">
            <p
                className="text-sm font-semibold mb-6"
                style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-code)' }}
            >
                Architecture Flow
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-0 flex-wrap justify-center">
                {flow.map((step, i) => (
                    <div key={i} className="flex flex-col sm:flex-row items-center">
                        <div
                            className="flow-node px-4 py-3 rounded-2xl border text-sm font-medium text-center min-w-[100px]"
                            style={{
                                backgroundColor:
                                    i === 0 || i === flow.length - 1
                                        ? 'rgba(255,107,44,0.1)'
                                        : 'var(--color-surface)',
                                borderColor:
                                    i === 0 || i === flow.length - 1
                                        ? 'rgba(255,107,44,0.3)'
                                        : 'var(--color-border)',
                                color:
                                    i === 0 || i === flow.length - 1
                                        ? 'var(--color-accent)'
                                        : 'var(--color-primary)',
                                fontFamily: 'var(--font-code)',
                                fontSize: '13px',
                            }}
                        >
                            {step}
                        </div>
                        {i < flow.length - 1 && (
                            <div
                                className="relative flow-line hidden sm:block"
                                style={{
                                    width: '32px',
                                    height: '2px',
                                    background: 'var(--color-border)',
                                    transformOrigin: 'left',
                                }}
                            >
                                <div
                                    className="flow-dot absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                                    style={{ backgroundColor: 'var(--color-accent)' }}
                                />
                            </div>
                        )}
                        {i < flow.length - 1 && (
                            <div
                                className="sm:hidden w-0.5 h-6 flow-line"
                                style={{ background: 'var(--color-border)' }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Projects() {
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Lock scroll when modal is open — stop Lenis + block event propagation
    useEffect(() => {
        if (activeProject) {
            window.__lenis?.stop();
        } else {
            window.__lenis?.start();
        }
        return () => {
            window.__lenis?.start();
        };
    }, [activeProject]);

    // Block wheel/touch events from reaching Lenis
    useEffect(() => {
        const el = overlayRef.current;
        if (!el || !activeProject) return;

        const stopWheel = (e: WheelEvent) => e.stopPropagation();
        const stopTouch = (e: TouchEvent) => e.stopPropagation();

        el.addEventListener('wheel', stopWheel, { passive: false });
        el.addEventListener('touchstart', stopTouch, { passive: true });
        el.addEventListener('touchmove', stopTouch, { passive: true });

        return () => {
            el.removeEventListener('wheel', stopWheel);
            el.removeEventListener('touchstart', stopTouch);
            el.removeEventListener('touchmove', stopTouch);
        };
    }, [activeProject]);

    useEffect(() => {
        const cards = cardsRef.current?.querySelectorAll('.project-card');
        if (cards) {
            gsap.fromTo(
                cards,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
                }
            );
        }
    }, []);

    return (
        <section id="projects" className="reveal-section section-padding">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span
                        className="inline-block text-sm font-semibold tracking-widest uppercase mb-4"
                        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-code)' }}
                    >
                        Projects — aarthik.ai
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Systems I've <span className="gradient-text">architected.</span>
                    </h2>
                    <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: 'var(--color-secondary)' }}>
                        Real production systems at{' '}
                        <a
                            href="https://aarthik.ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold underline decoration-dotted underline-offset-4"
                            style={{ color: 'var(--color-accent)' }}
                        >
                            aarthik.ai
                        </a>{' '}
                        — each solving a different engineering challenge.
                    </p>
                </div>

                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {projects.map((project, i) => (
                        <div
                            key={i}
                            className="project-card card-surface group p-5 sm:p-8 rounded-2xl sm:rounded-3xl border cursor-pointer transition-all duration-300 hover:-translate-y-1"
                            style={{
                                backgroundColor: 'var(--color-surface)',
                                borderColor: 'var(--color-border)',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                            }}
                            onClick={() => setActiveProject(project)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,107,44,0.1)';
                                e.currentTarget.style.borderColor = 'rgba(255,107,44,0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                                e.currentTarget.style.borderColor = 'var(--color-border)';
                            }}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                                    {project.title}
                                </h3>
                                <ExternalLink
                                    size={18}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1 shrink-0"
                                    color="var(--color-accent)"
                                />
                            </div>

                            <p className="text-sm mb-3" style={{ color: 'var(--color-secondary)' }}>
                                <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>
                                    Problem:{' '}
                                </span>
                                {project.problem}
                            </p>

                            <p className="text-sm mb-5" style={{ color: 'var(--color-secondary)' }}>
                                <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>
                                    Solution:{' '}
                                </span>
                                {project.solution.length > 120
                                    ? project.solution.substring(0, 120) + '...'
                                    : project.solution}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag, j) => (
                                    <span
                                        key={j}
                                        className="text-xs px-3 py-1.5 rounded-full font-medium"
                                        style={{
                                            backgroundColor: 'rgba(255,107,44,0.08)',
                                            color: 'var(--color-accent)',
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <button
                                className="text-sm font-semibold transition-colors duration-300 cursor-pointer"
                                style={{ color: 'var(--color-accent)' }}
                            >
                                View Architecture →
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Architecture modal — rendered via portal so it's always viewport-centered */}
            {createPortal(
                <AnimatePresence>
                    {activeProject && (
                        <motion.div
                            ref={overlayRef}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] overflow-y-auto"
                            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                            onClick={() => setActiveProject(null)}
                        >
                            <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                    className="w-full max-w-3xl p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border relative my-4"
                                    style={{
                                        backgroundColor: 'var(--color-bg)',
                                        borderColor: 'var(--color-border)',
                                        boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button
                                        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full transition-colors cursor-pointer"
                                        style={{ backgroundColor: 'var(--color-subtle)' }}
                                        onClick={() => setActiveProject(null)}
                                    >
                                        <X size={18} />
                                    </button>

                                    <h3
                                        className="text-2xl sm:text-3xl font-bold mb-2"
                                        style={{ fontFamily: 'var(--font-heading)' }}
                                    >
                                        {activeProject.title}
                                    </h3>

                                    {activeProject.link && (
                                        <a
                                            href={activeProject.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-sm font-medium mb-6 transition-colors"
                                            style={{ color: 'var(--color-accent)' }}
                                        >
                                            Visit live ↗
                                        </a>
                                    )}

                                    <div className="space-y-3 mb-6">
                                        <p style={{ color: 'var(--color-secondary)' }}>
                                            <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>
                                                Problem:{' '}
                                            </span>
                                            {activeProject.problem}
                                        </p>
                                        <p style={{ color: 'var(--color-secondary)' }}>
                                            <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>
                                                Solution:{' '}
                                            </span>
                                            {activeProject.solution}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {activeProject.tech.map((t, i) => (
                                            <span
                                                key={i}
                                                className="text-sm px-4 py-2 rounded-xl font-medium"
                                                style={{
                                                    backgroundColor: 'var(--color-subtle)',
                                                    fontFamily: 'var(--font-code)',
                                                }}
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <FlowDiagram flow={activeProject.flow} />
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
}
