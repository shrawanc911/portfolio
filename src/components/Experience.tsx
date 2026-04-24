import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Briefcase, GraduationCap } from 'lucide-react';
import {
  credentials,
  educationEntries,
  experienceEntries,
} from '../content/site';
import { prefersReducedMotion } from '../utils/motion';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const cards = sectionRef.current?.querySelectorAll('.experience-card');
    if (!cards?.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="reveal-section section-padding">
      <div className="section-shell">
        <div className="section-heading">
          <span className="eyebrow">Experience</span>
          <h2 className="section-title">
            Product work, internships,
            <span className="gradient-text"> and academic momentum.</span>
          </h2>
          <p className="section-copy section-copy-wide">
            I am still early in my career, but the work is already grounded in
            real shipping: product ownership, backend systems, and frontend
            polish when the user experience needs it.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            {experienceEntries.map((entry) => (
              <article key={`${entry.company}-${entry.role}`} className="experience-card card-surface p-6 md:p-8">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.62)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-secondary)]">
                      <Briefcase size={14} />
                      {entry.context}
                    </div>
                    <h3 className="text-2xl font-semibold text-[var(--color-primary)]">
                      {entry.role}
                    </h3>
                    <p className="mt-1 text-base font-medium text-[var(--color-accent)]">
                      {entry.company}
                    </p>
                  </div>
                  <span className="rounded-full bg-[rgba(235,94,40,0.1)] px-3 py-1 text-sm font-medium text-[var(--color-accent)]">
                    {entry.period}
                  </span>
                </div>

                <p className="text-base leading-7 text-[var(--color-secondary)]">
                  {entry.summary}
                </p>

                <ul className="mt-5 grid gap-3 text-sm leading-7 text-[var(--color-secondary)] md:grid-cols-2">
                  {entry.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.55)] px-4 py-3"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="space-y-5">
            <aside className="experience-card card-surface p-6 md:p-8">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.62)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-secondary)]">
                <GraduationCap size={14} />
                Education
              </div>

              <div className="space-y-5">
                {educationEntries.map((entry) => (
                  <div
                    key={`${entry.title}-${entry.period}`}
                    className="rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.55)] p-4"
                  >
                    <h3 className="text-lg font-semibold text-[var(--color-primary)]">
                      {entry.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[var(--color-accent)]">
                      {entry.meta}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[var(--color-secondary)]">
                      {entry.period}
                    </p>
                    <p className="text-sm leading-6 text-[var(--color-secondary)]">
                      {entry.detail}
                    </p>
                  </div>
                ))}
              </div>
            </aside>

            <aside className="experience-card card-surface p-6 md:p-8">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.62)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-secondary)]">
                <Award size={14} />
                Credentials
              </div>

              <ul className="space-y-3 text-sm leading-7 text-[var(--color-secondary)]">
                {credentials.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.55)] px-4 py-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
