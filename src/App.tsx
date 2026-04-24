import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from './hooks/useLenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Workflow from './components/Workflow';
import Contact from './components/Contact';
import { profile } from './content/site';
import { prefersReducedMotion } from './utils/motion';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLElement>(null);

  useLenis();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const sections = mainRef.current?.querySelectorAll('.reveal-section');
      if (!sections?.length) return;

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 56 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 86%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip">
      <Navbar />
      <main ref={mainRef}>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Workflow />
        <Contact />
      </main>
      <footer className="px-6 pb-10 text-center text-sm text-[var(--color-secondary)]">
        Designed and built by {profile.name}. React, Tailwind, and a bias for
        clean systems.
      </footer>
    </div>
  );
}

export default App;
