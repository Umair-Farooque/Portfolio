import { useEffect, useState } from 'react';

const links = [
    { id: 'hero', label: 'Overview' },
    { id: 'experience-section', label: 'Experience' },
    { id: 'projects-section', label: 'Projects' },
    { id: 'skills-section', label: 'Stack' },
    { id: 'cv-section', label: 'Contact' }
];

const Navbar = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 120;
            for (let i = links.length - 1; i >= 0; i--) {
                const el = document.getElementById(links[i].id);
                if (el && el.offsetTop <= scrollPosition) {
                    setActiveSection(links[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        setMobileOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200/70 bg-[#fcfcfc]/80 backdrop-blur-md">
            <nav className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
                <button
                    onClick={() => scrollToSection('hero')}
                    className="text-sm font-semibold tracking-tight"
                >
                    Umair Farooq
                </button>

                <div className="hidden items-center gap-6 md:flex">
                    {links.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => scrollToSection(link.id)}
                            className={`text-[13px] transition-colors ${
                                activeSection === link.id
                                    ? 'font-medium text-zinc-900'
                                    : 'text-zinc-500 hover:text-zinc-900'
                            }`}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                    className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:text-zinc-900 md:hidden"
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        {mobileOpen ? (
                            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="border-t border-zinc-200/70 bg-[#fcfcfc] px-6 py-2 md:hidden">
                    {links.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => scrollToSection(link.id)}
                            className={`block w-full py-2.5 text-left text-sm ${
                                activeSection === link.id ? 'font-medium text-zinc-900' : 'text-zinc-500'
                            }`}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Navbar;