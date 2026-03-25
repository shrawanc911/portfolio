import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Eye } from 'lucide-react';

export default function Hero() {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(badgeRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 })
            .fromTo(headingRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1 }, '-=0.3')
            .fromTo(subtextRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
            .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
            .fromTo(glowRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }, '-=1');
    }, []);

    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6"
            style={{ backgroundColor: '#0A0A0A' }}
        >
            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                }}
            />

            {/* === Dramatic bottom gradient glow — organic flowing shapes === */}
            <div ref={glowRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0 }}>
                {/* Main large orange blob — bottom center */}
                <div
                    className="absolute"
                    style={{
                        bottom: '-10%',
                        left: '10%',
                        right: '10%',
                        height: '55%',
                        background: 'radial-gradient(ellipse 100% 80% at 50% 100%, rgba(255,107,44,0.35) 0%, rgba(255,60,10,0.15) 40%, transparent 70%)',
                        filter: 'blur(40px)',
                    }}
                />
                {/* Left orange wave */}
                <div
                    className="absolute"
                    style={{
                        bottom: '0',
                        left: '-5%',
                        width: '45%',
                        height: '50%',
                        background: 'radial-gradient(ellipse 80% 70% at 30% 100%, rgba(255,120,30,0.3) 0%, transparent 60%)',
                        borderRadius: '50% 50% 0 0',
                        filter: 'blur(30px)',
                    }}
                />
                {/* Right amber wave */}
                <div
                    className="absolute"
                    style={{
                        bottom: '-5%',
                        right: '-10%',
                        width: '50%',
                        height: '60%',
                        background: 'radial-gradient(ellipse 70% 80% at 70% 100%, rgba(255,140,0,0.25) 0%, rgba(200,80,0,0.1) 40%, transparent 65%)',
                        borderRadius: '40% 50% 0 0',
                        filter: 'blur(35px)',
                    }}
                />
                {/* Top-right subtle red accent */}
                <div
                    className="absolute hidden sm:block"
                    style={{
                        top: '5%',
                        right: '0',
                        width: '30%',
                        height: '40%',
                        background: 'radial-gradient(ellipse at 100% 0%, rgba(200,50,0,0.12) 0%, transparent 60%)',
                        filter: 'blur(50px)',
                    }}
                />
                {/* Bright orange hot spot at bottom center */}
                <div
                    className="absolute"
                    style={{
                        bottom: '0',
                        left: '30%',
                        right: '30%',
                        height: '20%',
                        background: 'radial-gradient(ellipse at 50% 100%, rgba(255,100,20,0.5) 0%, transparent 70%)',
                        filter: 'blur(20px)',
                    }}
                />
            </div>

            {/* Content — centered */}
            <div className="relative z-10 text-center max-w-4xl mx-auto">
                {/* Top badge */}
                <div
                    ref={badgeRef}
                    className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 rounded-full mb-8 sm:mb-10"
                    style={{
                        opacity: 0,
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}
                >
                    <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold text-white"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                        Open to Work
                    </span>
                    <span className="text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Full-Stack Developer
                    </span>
                </div>

                {/* Main heading */}
                <h1
                    ref={headingRef}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
                    style={{ fontFamily: 'var(--font-heading)', opacity: 0 }}
                >
                    <span style={{ color: '#FFFFFF' }}>Hey, I'm </span>
                    <span className="gradient-text">Shrawan</span>
                    <br />
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>I build what scales.</span>
                </h1>

                {/* Subtitle */}
                <p
                    ref={subtextRef}
                    className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.55)', opacity: 0 }}
                >
                    Backend-focused developer who architects scalable systems,
                    real-time pipelines, and high-performance APIs.
                </p>

                {/* CTA buttons */}
                <div
                    ref={ctaRef}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                    style={{ opacity: 0 }}
                >
                    <a
                        href="#projects"
                        className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-white font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 cursor-pointer"
                        style={{
                            background: 'linear-gradient(135deg, #FF6B2C, #FF9A5C)',
                            boxShadow: '0 4px 24px rgba(255,107,44,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        View My Work
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </a>
                    <a
                        href="#contact"
                        className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base border transition-all duration-300 hover:scale-105 cursor-pointer"
                        style={{
                            borderColor: 'rgba(255,255,255,0.15)',
                            color: '#FFFFFF',
                            backgroundColor: 'rgba(255,255,255,0.04)',
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <Eye size={16} />
                        Get in Touch
                    </a>
                </div>
            </div>

            {/* Subtle bright line at very bottom */}
            <div
                className="absolute bottom-0 left-[15%] right-[15%] h-px"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,107,44,0.5), transparent)',
                }}
            />
        </section>
    );
}
