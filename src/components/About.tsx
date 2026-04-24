import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Braces, Gauge, LayoutGrid } from 'lucide-react';
import { profile } from '../content/site';
import { prefersReducedMotion } from '../utils/motion';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    Icon: Braces,
    title: 'Full-stack mindset',
    desc: 'I like owning the whole feature path, from API contracts and data flow to the UI that makes the work usable.',
  },
  {
    Icon: Gauge,
    title: 'Performance first',
    desc: 'Caching, batch jobs, and lean client state are usually where the product starts to feel noticeably better.',
  },
  {
    Icon: LayoutGrid,
    title: 'System design',
    desc: 'I enjoy breaking product problems into queues, workers, schedules, and real-time channels that stay understandable.',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const cards = sectionRef.current?.querySelectorAll('.highlight-card');
    if (!cards?.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="reveal-section section-padding">
      <div className="section-shell">
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div>
            <span className="eyebrow">About me</span>
            <h2 className="section-title">
              I like building the part
              <span className="gradient-text"> behind the magic.</span>
            </h2>
            <p className="section-copy mt-6">
              I am a final-year B.Tech student based in {profile.location},
              currently doing backend-first product work with Aarthik.ai. The
              projects that excite me most are the ones where architecture and
              user experience affect each other: data-heavy systems, real-time
              features, and interfaces that still need to feel simple.
            </p>
            <p className="section-copy mt-4">
              My sweet spot is taking an engineering problem that could become
              messy, then shaping it into queues, APIs, caching layers, and
              frontend states that are easier to ship and easier to trust.
            </p>
          </div>

          <aside className="card-surface p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-secondary)]">
              Right now
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-[var(--color-primary)] sm:text-3xl">
              Shipping fintech workflows and learning how product decisions ripple
              through the whole stack.
            </h3>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['5,654+', 'Stocks handled in portfolio data flows'],
                ['8.61', 'Current B.Tech CGPA'],
                ['3', 'Personal projects highlighted below'],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.58)] p-4"
                >
                  <p className="text-3xl font-semibold text-[var(--color-primary)]">
                    {value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-secondary)]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {highlights.map(({ Icon, title, desc }) => (
            <div key={title} className="highlight-card card-surface p-6 md:p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(235,94,40,0.12)] text-[var(--color-accent)]">
                <Icon size={22} />
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-primary)]">
                {title}
              </h3>
              <p className="mt-3 text-base leading-7 text-[var(--color-secondary)]">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
