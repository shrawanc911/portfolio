import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
    { name: 'Node.js', desc: 'Event-driven runtime powering all backend services', icon: '⬢', color: '#539E43' },
    { name: 'Express', desc: 'REST APIs with middleware, auth, and rate limiting', icon: '⚡', color: '#E76F51' },
    { name: 'MongoDB', desc: 'Document store with indexing and aggregation pipelines', icon: '🍃', color: '#47A248' },
    { name: 'Redis', desc: 'Caching, pub/sub, OTP storage, and session management', icon: '◆', color: '#DC382D' },
    { name: 'WebSockets', desc: 'Real-time streaming for chatbot and live data', icon: '🔌', color: '#F4A261' },
    { name: 'BullMQ', desc: 'Job queues for heavy compute, mailing, and LTP sync', icon: '🐂', color: '#E76F51' },
    { name: 'React', desc: 'SPAs with context, hooks, and responsive design', icon: '⚛️', color: '#61DAFB' },
    { name: 'Tailwind CSS', desc: 'Utility-first responsive layouts across screen sizes', icon: '🎨', color: '#38BDF8' },
    { name: 'Vector DB', desc: 'Embedding + similarity search for news clustering', icon: '🧠', color: '#8B5CF6' },
    { name: 'Cron Jobs', desc: 'Scheduled tasks for news ingestion and data syncing', icon: '⏰', color: '#F59E0B' },
    { name: 'Docker', desc: 'Containerized services for consistent deployments', icon: '🐳', color: '#2496ED' },
    { name: 'System Design', desc: 'Distributed architectures with fault tolerance', icon: '🏗️', color: '#5F5F5F' },
];

export default function Skills() {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cards = gridRef.current?.querySelectorAll('.skill-card');
        if (cards) {
            gsap.fromTo(
                cards,
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 80%',
                    },
                }
            );
        }
    }, []);

    return (
        <section
            id="skills"
            className="reveal-section section-padding"
            style={{ backgroundColor: 'var(--color-subtle)' }}
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span
                        className="inline-block text-sm font-semibold tracking-widest uppercase mb-4"
                        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-code)' }}
                    >
                        Tech Stack
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Tools I ship with <span className="gradient-text">daily.</span>
                    </h2>
                    <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-secondary)' }}>
                        Battle-tested at production scale — from fintech data pipelines to
                        real-time AI features.
                    </p>
                </div>

                <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                    {skills.map(({ name, desc, icon, color }, i) => (
                        <div
                            key={i}
                            className="skill-card card-surface group p-6 sm:p-8 rounded-3xl border cursor-default transition-all duration-300 hover:-translate-y-2"
                            style={{
                                backgroundColor: 'var(--color-surface)',
                                borderColor: 'var(--color-border)',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = `0 8px 30px ${color}20`;
                                e.currentTarget.style.borderColor = `${color}30`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                                e.currentTarget.style.borderColor = 'var(--color-border)';
                            }}
                        >
                            <div className="text-3xl mb-4 transition-transform duration-300 group-hover:scale-110">
                                {icon}
                            </div>
                            <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                                {name}
                            </h3>
                            <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>
                                {desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
