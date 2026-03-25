import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

// Store Lenis instance globally so other components can stop/start it
declare global {
    interface Window {
        __lenis?: Lenis;
    }
}

export function useLenis() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        window.__lenis = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            window.__lenis = undefined;
        };
    }, []);
}
