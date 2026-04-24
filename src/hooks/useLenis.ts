import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { prefersReducedMotion } from '../utils/motion';

// Store Lenis instance globally so other components can stop/start it
declare global {
    interface Window {
        __lenis?: Lenis;
    }
}

export function useLenis() {
    useEffect(() => {
        if (prefersReducedMotion()) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        window.__lenis = lenis;
        let rafId = 0;

        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            window.__lenis = undefined;
        };
    }, []);
}
