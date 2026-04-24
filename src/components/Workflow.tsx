import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDownToLine,
  Cog,
  ListOrdered,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { prefersReducedMotion } from '../utils/motion';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    Icon: ArrowDownToLine,
    title: 'Receive request',
    desc: 'A REST call or WebSocket event reaches the edge layer, where it is logged, validated, and routed.',
    code: 'app.post("/api/v1/portfolio/compute", authMiddleware, handler)',
  },
  {
    Icon: ShieldCheck,
    title: 'Validate and authenticate',
    desc: 'Auth checks and schema validation happen before anything touches state, queues, or storage.',
    code: 'verifyJWT(token) -> validateSchema(body) -> checkAccess(userId)',
  },
  {
    Icon: ListOrdered,
    title: 'Queue heavy work',
    desc: 'Anything expensive or slow is pushed into BullMQ so request latency stays predictable.',
    code: 'queue.add("computePortfolio", { userId, batchId }, { priority: 1, attempts: 3 })',
  },
  {
    Icon: Cog,
    title: 'Worker processes',
    desc: 'Workers handle compute-heavy tasks, coordinate cache updates, and keep writes consistent.',
    code: 'worker.process(async (job) => { await session.withTransaction(...) })',
  },
  {
    Icon: Send,
    title: 'Push response',
    desc: 'The client gets a live response, fresh cache, or streaming token updates depending on the product need.',
    code: 'ws.emit("stream:token", { chunk, done: false }) -> redis.publish(channel)',
  },
];

export default function Workflow() {
  const timelineRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const items = timelineRef.current?.querySelectorAll('.workflow-item');
    const line = timelineRef.current?.querySelector('.timeline-line-fill') as HTMLElement | null;

    const ctx = gsap.context(() => {
      if (items?.length) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.65,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: { trigger: timelineRef.current, start: 'top 75%' },
          }
        );
      }

      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 72%',
              end: 'bottom 32%',
              scrub: 1,
            },
          }
        );
      }
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="workflow"
      ref={timelineRef}
      className="reveal-section section-padding"
      style={{ backgroundColor: 'var(--color-subtle)' }}
    >
      <div className="section-shell max-w-5xl">
        <div className="section-heading">
          <span className="eyebrow">Workflow</span>
          <h2 className="section-title">
            How a request usually
            <span className="gradient-text"> moves through my systems.</span>
          </h2>
          <p className="section-copy section-copy-wide">
            Whether I am building a portfolio engine, a chatbot, or a watchlist
            feature, the shape tends to stay the same: validate early, queue heavy
            work, keep state explicit, and return something useful fast.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute bottom-0 left-[19px] top-0 w-0.5 sm:left-6 md:left-8"
            style={{ backgroundColor: 'var(--color-border)' }}
          >
            <div
              className="timeline-line-fill absolute inset-0 w-full"
              style={{
                background:
                  'linear-gradient(180deg, var(--color-accent), var(--color-accent-secondary))',
                transformOrigin: 'top',
              }}
            />
          </div>

          <div className="space-y-8">
            {steps.map(({ Icon, title, desc, code }, index) => (
              <div key={title} className="workflow-item flex items-start gap-4 sm:gap-6 md:gap-8">
                <div
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border sm:h-12 sm:w-12 md:h-16 md:w-16 md:rounded-2xl"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    boxShadow: '0 2px 8px rgba(19,17,15,0.06)',
                  }}
                >
                  <Icon size={18} className="sm:hidden" color="var(--color-accent)" />
                  <Icon size={22} className="hidden sm:block" color="var(--color-accent)" />
                </div>

                <div
                  className="flex-1 rounded-[1.6rem] border p-4 transition-shadow duration-300 sm:p-6"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    boxShadow: '0 1px 3px rgba(19,17,15,0.04)',
                  }}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="rounded-lg bg-[rgba(235,94,40,0.1)] px-2 py-1 text-xs font-bold text-[var(--color-accent)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg font-semibold text-[var(--color-primary)]">
                      {title}
                    </h3>
                  </div>
                  <p className="text-sm leading-7 text-[var(--color-secondary)]">
                    {desc}
                  </p>
                  <pre
                    className="mt-4 overflow-x-auto rounded-2xl bg-[var(--color-subtle)] px-4 py-3 text-[11px] leading-6 text-[var(--color-accent)] sm:text-xs"
                    style={{ fontFamily: 'var(--font-code)' }}
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
