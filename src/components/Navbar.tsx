import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    const handleNavClick = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-xl border-b py-3' : 'py-5'
                }`}
            style={{
                background: scrolled ? 'var(--color-glass)' : 'transparent',
                borderColor: scrolled ? 'var(--color-border)' : 'transparent',
            }}
        >
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#"
                    className="font-heading text-xl font-bold tracking-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                >
                    <span className="gradient-text">SK</span>
                    <span style={{ color: 'var(--color-primary)' }}>.dev</span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => handleNavClick(link.href)}
                            className="text-sm font-medium transition-colors duration-300 cursor-pointer"
                            style={{ color: 'var(--color-secondary)' }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#E76F51')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-secondary)')}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                {/* Mobile hamburger */}
                <div className="flex md:hidden items-center gap-3">
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="cursor-pointer"
                        style={{ color: 'var(--color-primary)' }}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden border-t"
                        style={{
                            background: 'var(--color-glass)',
                            backdropFilter: 'blur(20px)',
                            borderColor: 'var(--color-border)',
                        }}
                    >
                        <div className="px-6 py-4 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className="text-left text-base font-medium transition-colors duration-300 cursor-pointer"
                                    style={{ color: 'var(--color-secondary)' }}
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
