import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowDownToLine,
    ShieldCheck,
    ListOrdered,
    Cog,
    Send,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        Icon: ArrowDownToLine,
        title: 'Receive Request',
        desc: 'REST API or WebSocket event hits the gateway — rate-limited, logged, and routed.',
        code: 'app.post("/api/v1/portfolio/compute", authMiddleware, handler)',
    },
    {
        Icon: ShieldCheck,
        title: 'Validate & Authenticate',
        desc: 'JWT verification, request schema validation, permission checks — before anything touches the database.',
        code: 'verifyJWT(token) → validateSchema(body) → checkAccess(userId)',
    },
    {
        Icon: ListOrdered,
        title: 'Queue Heavy Work',
        desc: 'CPU-heavy tasks (LTP sync, portfolio compute, LLM calls) go to BullMQ with priority and retry config.',
        code: 'queue.add("computePortfolio", { userId, batchId }, { priority: 1, attempts: 3 })',
    },
    {
        Icon: Cog,
        title: 'Worker Processes',
        desc: 'Isolated workers pick up jobs, run batch operations, update Redis and MongoDB atomically using transactions.',
        code: 'worker.process(async (job) => { await session.withTransaction(...) })',
    },
    {
        Icon: Send,
        title: 'Push Response',
        desc: 'Results stream to the client via WebSocket (chatbot tokens) or trigger cache invalidation for the next read.',
        code: 'ws.emit("stream:token", { chunk, done: false }) → redis.publish(channel)',
    },
];

export default function Workflow() {
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const items = timelineRef.current?.querySelectorAll('.workflow-item');
        if (items) {
            gsap.fromTo(
                items,
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.7,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: timelineRef.current, start: 'top 75%' },
                }
            );
        }

        const line = timelineRef.current?.querySelector('.timeline-line-fill') as HTMLElement;
        if (line) {
            gsap.fromTo(
                line,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: 'top 70%',
                        end: 'bottom 30%',
                        scrub: 1,
                    },
                }
            );
        }
    }, []);

    return (
        <section
            id="workflow"
            className="reveal-section section-padding"
            style={{ backgroundColor: 'var(--color-subtle)' }}
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <span
                        className="inline-block text-sm font-semibold tracking-widest uppercase mb-4"
                        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-code)' }}
                    >
                        How I Build
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Request lifecycle, <span className="gradient-text">visualized.</span>
                    </h2>
                    <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-secondary)' }}>
                        Every system I build follows this battle-tested pattern — from
                        API gateway to worker response.
                    </p>
                </div>

                <div ref={timelineRef} className="relative">
                    <div
                        className="absolute left-5 sm:left-6 md:left-8 top-0 bottom-0 w-0.5"
                        style={{ backgroundColor: 'var(--color-border)' }}
                    >
                        <div
                            className="timeline-line-fill absolute inset-0 w-full"
                            style={{
                                background: 'linear-gradient(180deg, var(--color-accent), var(--color-accent-secondary))',
                                transformOrigin: 'top',
                            }}
                        />
                    </div>

                    <div className="space-y-8">
                        {steps.map(({ Icon, title, desc, code }, i) => (
                            <div key={i} className="workflow-item flex gap-4 sm:gap-6 md:gap-8 items-start">
                                <div
                                    className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-xl sm:rounded-2xl border flex items-center justify-center shrink-0"
                                    style={{
                                        backgroundColor: 'var(--color-surface)',
                                        borderColor: 'var(--color-border)',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                    }}
                                >
                                    <Icon size={18} className="sm:hidden" color="var(--color-accent)" />
                                    <Icon size={22} className="hidden sm:block" color="var(--color-accent)" />
                                </div>

                                <div
                                    className="flex-1 p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:shadow-lg"
                                    style={{
                                        backgroundColor: 'var(--color-surface)',
                                        borderColor: 'var(--color-border)',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(255,107,44,0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--color-border)';
                                    }}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <span
                                            className="text-xs font-bold px-2 py-1 rounded-lg"
                                            style={{
                                                backgroundColor: 'rgba(255,107,44,0.1)',
                                                color: 'var(--color-accent)',
                                                fontFamily: 'var(--font-code)',
                                            }}
                                        >
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <h3 className="text-base sm:text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                                            {title}
                                        </h3>
                                    </div>
                                    <p className="text-sm mb-3" style={{ color: 'var(--color-secondary)' }}>
                                        {desc}
                                    </p>
                                    <pre
                                        className="text-[10px] sm:text-xs px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl overflow-x-auto"
                                        style={{
                                            backgroundColor: 'var(--color-subtle)',
                                            fontFamily: 'var(--font-code)',
                                            color: 'var(--color-accent)',
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {code}
                                    </pre>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
