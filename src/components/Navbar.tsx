import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { navLinks, profile, resumeHref } from '../content/site';
import { prefersReducedMotion, scrollToSection } from '../utils/motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-locked', mobileOpen);
    return () => document.body.classList.remove('is-locked');
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    scrollToSection(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div ref={navRef} className="section-shell pt-4">
        <nav
          className={`rounded-full border px-4 transition-all duration-500 sm:px-6 ${
            scrolled || mobileOpen ? 'shadow-[0_18px_44px_rgba(19,17,15,0.12)]' : ''
          }`}
          style={{
            background: scrolled || mobileOpen ? 'var(--color-glass)' : 'rgba(255,255,255,0.42)',
            backdropFilter: 'blur(18px)',
            borderColor:
              scrolled || mobileOpen ? 'rgba(19,17,15,0.08)' : 'rgba(255,255,255,0.5)',
          }}
        >
          <div className="flex min-h-[64px] items-center justify-between gap-4">
            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: prefersReducedMotion() ? 'auto' : 'smooth',
                })
              }
              className="flex min-w-0 items-center gap-3 text-left"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(235,94,40,0.12)] text-sm font-bold text-[var(--color-accent)]">
                {profile.shortName}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[var(--color-primary)]">
                  {profile.name}
                </p>
                <p className="truncate text-xs text-[var(--color-secondary)]">
                  {profile.role}
                </p>
              </div>
            </button>

            <div className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium transition-colors duration-300 hover:text-[var(--color-accent)]"
                  style={{ color: 'var(--color-secondary)' }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <a href={resumeHref} download className="button-secondary px-5 py-3 text-sm">
                <Download size={16} />
                Resume
              </a>
            </div>

            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.72)] text-[var(--color-primary)] lg:hidden"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="section-shell mt-3 lg:hidden"
          >
            <div className="card-surface overflow-hidden p-4 shadow-[0_24px_50px_rgba(19,17,15,0.16)]">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-secondary)]">
                Navigate
              </p>

              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="rounded-2xl border border-transparent bg-[rgba(255,255,255,0.6)] px-4 py-3 text-left text-base font-medium text-[var(--color-primary)] transition-colors duration-300 hover:border-[rgba(235,94,40,0.18)] hover:text-[var(--color-accent)]"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <a
                href={resumeHref}
                download
                className="button-primary mt-4 w-full justify-center px-5 py-3 text-sm"
              >
                <Download size={16} />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
