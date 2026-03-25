import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowUpRight, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Brand icons (removed from lucide-react in recent versions)
const LinkedinIcon = ({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const GithubIcon = ({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const links = [
    {
        Icon: Mail,
        label: 'Email',
        href: 'mailto:shravanc911@gmail.com',
        value: 'shravanc911@gmail.com',
    },
    {
        Icon: LinkedinIcon,
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/shrawankumar911/',
        value: '/in/shrawankumar911',
    },
    {
        Icon: GithubIcon,
        label: 'GitHub',
        href: 'https://github.com/shrawanc911',
        value: '@shrawanc911',
    },
    {
        Icon: Globe,
        label: 'Portfolio',
        href: 'https://shrawankumar.in',
        value: 'shrawankumar.in',
    },
];

export default function Contact() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const els = sectionRef.current?.querySelectorAll('.contact-reveal');
        if (els) {
            gsap.fromTo(
                els,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                }
            );
        }
    }, []);

    return (
        <section id="contact" ref={sectionRef} className="reveal-section section-padding">
            <div className="max-w-3xl mx-auto text-center">
                <span
                    className="contact-reveal inline-block text-sm font-semibold tracking-widest uppercase mb-4"
                    style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-code)' }}
                >
                    Get in Touch
                </span>
                <h2
                    className="contact-reveal text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
                    style={{ fontFamily: 'var(--font-heading)' }}
                >
                    Let's build something{' '}
                    <span className="gradient-text">scalable.</span>
                </h2>
                <p className="contact-reveal text-base sm:text-lg mb-8 sm:mb-12" style={{ color: 'var(--color-secondary)' }}>
                    Looking for a developer who can architect your backend, ship your frontend,
                    and think about the whole system? Let's talk.
                </p>

                <div className="contact-reveal mb-16">
                    <a
                        href="mailto:shrawan@shrawankumar.in"
                        className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full text-white font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        style={{
                            background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-secondary))',
                            boxShadow: '0 8px 30px rgba(255,107,44,0.3)',
                        }}
                    >
                        Let's Talk
                        <ArrowUpRight size={20} />
                    </a>
                </div>

                <div className="contact-reveal grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {links.map(({ Icon, label, href, value }, i) => (
                        <a
                            key={i}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-full border transition-all duration-300 hover:-translate-y-1"
                            style={{
                                backgroundColor: 'var(--color-surface)',
                                borderColor: 'var(--color-border)',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255,107,44,0.2)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255,107,44,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-border)';
                                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                            }}
                        >
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: 'rgba(255,107,44,0.08)' }}
                            >
                                <Icon size={18} color="var(--color-accent)" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-medium" style={{ color: 'var(--color-secondary)' }}>
                                    {label}
                                </p>
                                <p className="text-sm font-semibold">{value}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
