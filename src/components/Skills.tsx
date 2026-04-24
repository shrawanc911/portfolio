import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Braces,
  Database,
  Monitor,
  Server,
  type LucideIcon,
} from 'lucide-react';
import { prefersReducedMotion } from '../utils/motion';

gsap.registerPlugin(ScrollTrigger);

const skillGroups: {
  title: string;
  description: string;
  Icon: LucideIcon;
  items: string[];
}[] = [
  {
    title: 'Backend engineering',
    description:
      'APIs, auth, queues, jobs, and backend services that stay organized as complexity grows.',
    Icon: Braces,
    items: ['Node.js', 'Express.js', 'JWT auth', 'BullMQ', 'REST APIs', 'Worker pipelines'],
  },
  {
    title: 'Data and state',
    description:
      'Storage and caching choices that keep reads fast and the system easier to reason about.',
    Icon: Database,
    items: ['MongoDB', 'MySQL', 'Redis', 'Caching', 'Aggregation', 'Vector search'],
  },
  {
    title: 'Frontend delivery',
    description:
      'Responsive interfaces that are clean, predictable, and wired to the backend with care.',
    Icon: Monitor,
    items: ['React', 'Tailwind CSS', 'Context API', 'Responsive UI', 'WebSockets', 'State flows'],
  },
  {
    title: 'Workflow and platform',
    description:
      'The supporting layer that helps features ship consistently and stay maintainable.',
    Icon: Server,
    items: ['Cron jobs', 'Docker', 'Git/GitHub', 'Deployment', 'System design', 'Debugging'],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const cards = sectionRef.current?.querySelectorAll('.skill-card');
    if (!cards?.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="reveal-section section-padding"
      style={{ backgroundColor: 'var(--color-subtle)' }}
    >
      <div className="section-shell">
        <div className="section-heading">
          <span className="eyebrow">Tech stack</span>
          <h2 className="section-title">
            Tools I reach for
            <span className="gradient-text"> when things need to ship.</span>
          </h2>
          <p className="section-copy section-copy-wide">
            The stack changes by product need, but these are the tools I use most
            when I am building backend-heavy experiences with responsive frontends.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map(({ title, description, Icon, items }) => (
            <article key={title} className="skill-card card-surface p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(235,94,40,0.12)] text-[var(--color-accent)]">
                <Icon size={22} />
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-primary)]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-secondary)]">
                {description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="light-pill">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
