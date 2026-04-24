import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Download, Mail, Sparkles } from 'lucide-react';
import {
  heroHighlights,
  heroStats,
  profile,
  resumeHref,
} from '../content/site';
import { prefersReducedMotion, scrollToSection } from '../utils/motion';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-badge', { opacity: 0, y: -18 }, { opacity: 1, y: 0, duration: 0.55 })
        .fromTo('.hero-title', { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 0.95 }, '-=0.25')
        .fromTo('.hero-copy', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.45')
        .fromTo('.hero-actions', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.35')
        .fromTo('.hero-panel', { opacity: 0, x: 26 }, { opacity: 1, x: 0, duration: 0.75 }, '-=0.5')
        .fromTo('.hero-stat', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.1 }, '-=0.4');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#101113] text-white">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(244,162,97,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(235,94,40,0.32),transparent_30%),linear-gradient(135deg,#0d0f12_0%,#16181c_55%,#0d0f12_100%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:84px_84px] opacity-25" />

      <div className="section-shell relative z-10 grid min-h-[100svh] items-center gap-12 pb-16 pt-32 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pb-20 lg:pt-36">
        <div className="max-w-3xl">
          <div className="hero-badge inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/75">
            <Sparkles size={14} className="text-[var(--color-accent)]" />
            {profile.availability}
          </div>

          <p className="hero-copy mt-7 text-sm uppercase tracking-[0.32em] text-white/55">
            {profile.role}
          </p>

          <h1 className="hero-title mt-5 max-w-4xl text-[clamp(3rem,8vw,6.3rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
            Building products
            <span className="block text-white/66">that stay fast as they grow.</span>
          </h1>

          <p className="hero-copy mt-6 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
            I am {profile.name}, a final-year engineer focused on backend systems,
            clean developer workflows, and responsive interfaces that feel sharp on
            every screen size.
          </p>

          <div className="hero-actions mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => scrollToSection('#projects')}
              className="button-primary px-6 py-4 text-sm md:text-base"
            >
              View Projects
              <ArrowRight size={18} />
            </button>
            <a href={resumeHref} download className="button-secondary px-6 py-4 text-sm md:text-base">
              <Download size={18} />
              Download Resume
            </a>
            <button
              type="button"
              onClick={() => scrollToSection('#contact')}
              className="button-secondary px-6 py-4 text-sm md:text-base"
            >
              <Mail size={18} />
              Contact Me
            </button>
          </div>

          <ul className="mt-8 grid gap-3 text-sm leading-7 text-white/68 md:grid-cols-3">
            {heroHighlights.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 backdrop-blur-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-panel">
          <div className="card-dark relative overflow-hidden p-6 sm:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(244,162,97,0.8),transparent)]" />

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/45">
              Current focus
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              {profile.currentFocus}
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/66 sm:text-base">
              Most of my recent work lives at the intersection of live financial
              data, background processing, and user experience that still feels
              simple.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="hero-stat rounded-2xl border border-white/8 bg-white/4 p-4"
                >
                  <p className="text-2xl font-semibold text-white sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/58">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {['Node.js', 'Redis', 'MongoDB', 'React', 'BullMQ', 'WebSockets'].map((item) => (
                <span key={item} className="dark-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
