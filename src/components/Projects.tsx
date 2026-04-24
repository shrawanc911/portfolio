import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink, X } from 'lucide-react';
import {
  featuredProjects,
  sideProjects,
  type FeaturedProject,
} from '../content/site';
import { prefersReducedMotion } from '../utils/motion';

gsap.registerPlugin(ScrollTrigger);

function FlowDiagram({ flow }: { flow: string[] }) {
  return (
    <div className="mt-8">
      <p className="eyebrow !mb-4 !text-left">Architecture flow</p>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {flow.map((step, index) => (
          <div
            key={step}
            className="rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.58)] p-4"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
              Step {String(index + 1).padStart(2, '0')}
            </span>
            <p className="mt-3 text-sm leading-7 text-[var(--color-secondary)]">
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<FeaturedProject | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const cards = sectionRef.current?.querySelectorAll('.project-card');
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
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!activeProject) {
      document.body.classList.remove('is-locked');
      window.__lenis?.start();
      return;
    }

    document.body.classList.add('is-locked');
    window.__lenis?.stop();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('is-locked');
      window.__lenis?.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProject]);

  return (
    <section id="projects" ref={sectionRef} className="reveal-section section-padding">
      <div className="section-shell">
        <div className="section-heading">
          <span className="eyebrow">Projects</span>
          <h2 className="section-title">
            Product systems I have
            <span className="gradient-text"> helped shape.</span>
          </h2>
          <p className="section-copy section-copy-wide">
            The featured work below leans into product-scale systems at Aarthik.ai.
            I have also included a few personal builds so the portfolio reflects both
            production work and self-driven shipping.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <button
              key={project.title}
              type="button"
              className="project-card card-surface group overflow-hidden p-6 text-left transition-transform duration-300 hover:-translate-y-1"
              onClick={() => setActiveProject(project)}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <span className="eyebrow !mb-3 !text-left">{project.company}</span>
                  <h3 className="text-2xl font-semibold text-[var(--color-primary)]">
                    {project.title}
                  </h3>
                </div>
                <ExternalLink
                  size={18}
                  className="mt-1 shrink-0 text-[var(--color-accent)] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>

              <p className="text-sm leading-7 text-[var(--color-secondary)]">
                <span className="font-semibold text-[var(--color-accent)]">
                  Challenge:{' '}
                </span>
                {project.challenge}
              </p>

              <p className="mt-4 text-sm leading-7 text-[var(--color-secondary)]">
                <span className="font-semibold text-[var(--color-primary)]">
                  Impact:{' '}
                </span>
                {project.impact}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="light-pill">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)]">
                View case study
                <ArrowUpRight size={16} />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-16">
          <div className="mb-8">
            <span className="eyebrow">More work</span>
            <h3 className="text-3xl font-semibold text-[var(--color-primary)]">
              Personal projects that helped sharpen my product instincts.
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {sideProjects.map((project) => (
              <article key={project.title} className="project-card card-surface p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                  {project.period}
                </p>
                <h4 className="mt-3 text-xl font-semibold text-[var(--color-primary)]">
                  {project.title}
                </h4>
                <p className="mt-4 text-sm leading-7 text-[var(--color-secondary)]">
                  {project.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="light-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] overflow-y-auto bg-[rgba(16,17,19,0.64)] backdrop-blur-sm"
              onClick={() => setActiveProject(null)}
            >
              <div className="flex min-h-full items-start justify-center p-4 sm:items-center sm:p-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="project-modal-title"
                  className="relative my-4 w-full max-w-4xl rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-bg)] p-6 shadow-[0_30px_80px_rgba(16,17,19,0.22)] sm:p-8 lg:p-10"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    className="absolute right-4 top-4 rounded-full bg-[var(--color-subtle)] p-2 transition-colors sm:right-6 sm:top-6"
                    onClick={() => setActiveProject(null)}
                  >
                    <X size={18} />
                  </button>

                  <span className="eyebrow !mb-3 !text-left">{activeProject.company}</span>
                  <h3
                    id="project-modal-title"
                    className="text-3xl font-semibold text-[var(--color-primary)] sm:text-4xl"
                  >
                    {activeProject.title}
                  </h3>

                  {activeProject.link && (
                    <a
                      href={activeProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] transition-colors"
                    >
                      Visit live
                      <ArrowUpRight size={16} />
                    </a>
                  )}

                  <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-4">
                      <div className="rounded-3xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.55)] p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                          Challenge
                        </p>
                        <p className="mt-3 text-base leading-8 text-[var(--color-secondary)]">
                          {activeProject.challenge}
                        </p>
                      </div>
                      <div className="rounded-3xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.55)] p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                          Solution
                        </p>
                        <p className="mt-3 text-base leading-8 text-[var(--color-secondary)]">
                          {activeProject.solution}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-3xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.55)] p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                          Outcome
                        </p>
                        <p className="mt-3 text-base leading-8 text-[var(--color-secondary)]">
                          {activeProject.impact}
                        </p>
                      </div>

                      <div className="rounded-3xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.55)] p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                          Stack
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {activeProject.tech.map((tech) => (
                            <span key={tech} className="light-pill">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
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
