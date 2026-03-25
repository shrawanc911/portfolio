import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Braces, Gauge, LayoutGrid } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
    {
        Icon: Braces,
        title: 'Full-Stack Mindset',
        desc: 'From React frontends to Node.js backends — I own the full picture, shipping features end-to-end.',
    },
    {
        Icon: Gauge,
        title: 'Performance First',
        desc: 'Redis caching, batch operations, worker threads — every optimization matters at scale.',
    },
    {
        Icon: LayoutGrid,
        title: 'System Architect',
        desc: 'Designing pipelines with workers, queues, cron jobs, and pub/sub for real-time data flow.',
    },
];

const counters = [
    { label: 'Stocks Data Processed', target: 5654, suffix: '+' },
    { label: 'Months of Shipping', target: 7, suffix: '+' },
    { label: 'Systems Architected', target: 12, suffix: '+' },
];

function AnimatedCounter({
    target,
    suffix,
}: {
    target: number;
    suffix: string;
}) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const triggered = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            onEnter: () => {
                if (triggered.current) return;
                triggered.current = true;
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: () => setCount(Math.floor(obj.val)),
                });
            },
        });
    }, [target]);

    return (
        <span ref={ref} className="text-4xl sm:text-5xl font-bold gradient-text">
            {count.toLocaleString()}
            {suffix}
        </span>
    );
}

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cards = sectionRef.current?.querySelectorAll('.highlight-card');
        if (cards) {
            gsap.fromTo(
                cards,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                }
            );
        }
    }, []);

    return (
        <section id="about" ref={sectionRef} className="reveal-section section-padding">
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-16">
                    <span
                        className="inline-block text-sm font-semibold tracking-widest uppercase mb-4"
                        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-code)' }}
                    >
                        About Me
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Building the engine
                        <br />
                        <span className="gradient-text">behind the product.</span>
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-secondary)' }}>
                        I'm a final-year B.Tech student and full-stack developer at{' '}
                        <a
                            href="https://aarthik.ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold underline decoration-dotted underline-offset-4"
                            style={{ color: 'var(--color-accent)' }}
                        >
                            Aarthik.ai
                        </a>
                        , where I architect backend systems handling real-time financial data,
                        portfolio computing, and AI-powered features — from workers and queues
                        to WebSocket streaming and vector search.
                    </p>
                </div>

                {/* Highlight cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-20">
                    {highlights.map(({ Icon, title, desc }, i) => (
                        <div
                            key={i}
                            className="highlight-card card-surface group p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1"
                            style={{
                                backgroundColor: 'var(--color-surface)',
                                borderColor: 'var(--color-border)',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(255,107,44,0.1)';
                                e.currentTarget.style.borderColor = 'rgba(255,107,44,0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                                e.currentTarget.style.borderColor = 'var(--color-border)';
                            }}
                        >
                            <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                                style={{ background: 'rgba(255,107,44,0.1)' }}
                            >
                                <Icon size={24} color="var(--color-accent)" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                                {title}
                            </h3>
                            <p style={{ color: 'var(--color-secondary)', lineHeight: 1.7 }}>{desc}</p>
                        </div>
                    ))}
                </div>

                {/* Animated counters */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-6 sm:p-8 md:p-12 rounded-3xl border"
                    style={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                >
                    {counters.map(({ label, target, suffix }, i) => (
                        <div key={i} className="text-center py-4 sm:py-0">
                            <AnimatedCounter target={target} suffix={suffix} />
                            <p className="text-xs sm:text-sm mt-2 font-medium" style={{ color: 'var(--color-secondary)' }}>
                                {label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
