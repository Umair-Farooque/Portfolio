import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [isVisible, setIsVisible] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [isUserActive, setIsUserActive] = useState(true);
    const lastScrollY = useRef(0);
    const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleActivity = () => {
            setIsUserActive(true);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            idleTimerRef.current = setTimeout(() => {
                setIsUserActive(false);
            }, 3000);
        };

        const handleScroll = () => {
            handleActivity();
            const currentScrollY = window.scrollY;

            // Background effect (scrolled state)
            setScrolled(currentScrollY > 50);

            // Hide/Show logic with threshold
            const scrollDelta = currentScrollY - lastScrollY.current;

            if (currentScrollY > 100) {
                if (scrollDelta > 10) {
                    setIsVisible(false); // Scrolling down
                } else if (scrollDelta < -10) {
                    setIsVisible(true); // Scrolling up
                }
            } else {
                setIsVisible(true); // Always show at top
            }

            lastScrollY.current = currentScrollY;

            // Determine active section based on scroll position - with a bit of buffer
            const sections = ['hero', 'experience-section', 'projects-section', 'skills-section', 'cv-section'];
            const scrollPosition = currentScrollY + 100; // Small buffer for top section

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleActivity, { passive: true });

        handleScroll(); // Initial check
        handleActivity(); // Start idle timer

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleActivity);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        };
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const isActive = (section: string) => activeSection === section;
    const isHero = activeSection === 'hero';
    const shouldCollapse = isHero && !isHovered && !isUserActive;

    return (
        <div
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 transform ${scrolled ? 'py-4' : 'py-6'
                } ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="max-w-7xl mx-auto px-4 flex justify-center">
                <nav className={`
                    flex items-center justify-between gap-4 py-1 rounded-full 
                    bg-slate-900/80 backdrop-blur-md border border-slate-700/50 shadow-2xl
                    transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    overflow-hidden transform
                    ${scrolled ? 'scale-95' : 'scale-100'}
                    ${shouldCollapse ? 'w-16 px-2 justify-center' : 'w-full max-w-4xl px-10'}
                `}>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className={`group relative p-2 transition-colors flex-shrink-0 ${isActive('hero')
                            ? 'text-emerald-400 bg-emerald-500/10 rounded-full ring-2 ring-emerald-500/50'
                            : 'text-slate-400 hover:text-emerald-400'
                            }`}
                        title="Home"
                    >
                        <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        {!shouldCollapse && (
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-800 px-2 py-1 rounded">Home</span>
                        )}
                    </button>

                    {!shouldCollapse && (
                        <>
                            <button
                                onClick={() => scrollToSection('experience-section')}
                                className={`group relative p-2 transition-colors flex-shrink-0 ${isActive('experience-section')
                                    ? 'text-emerald-400 bg-emerald-500/10 rounded-full ring-2 ring-emerald-500/50'
                                    : 'text-slate-400 hover:text-emerald-400'
                                    }`}
                                title="Experience"
                            >
                                <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-800 px-2 py-1 rounded">Experience</span>
                            </button>

                            <button
                                onClick={() => scrollToSection('projects-section')}
                                className={`group relative p-2 transition-colors flex-shrink-0 ${isActive('projects-section')
                                    ? 'text-emerald-400 bg-emerald-500/10 rounded-full ring-2 ring-emerald-500/50'
                                    : 'text-slate-400 hover:text-emerald-400'
                                    }`}
                                title="Projects"
                            >
                                <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                </svg>
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-800 px-2 py-1 rounded">Projects</span>
                            </button>

                            <button
                                onClick={() => scrollToSection('skills-section')}
                                className={`group relative p-2 transition-colors flex-shrink-0 ${isActive('skills-section')
                                    ? 'text-emerald-400 bg-emerald-500/10 rounded-full ring-2 ring-emerald-500/50'
                                    : 'text-slate-400 hover:text-emerald-400'
                                    }`}
                                title="Skills"
                            >
                                <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                </svg>
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-800 px-2 py-1 rounded">Skills</span>
                            </button>

                            <button
                                onClick={() => scrollToSection('cv-section')}
                                className={`group relative p-2 transition-colors flex-shrink-0 ${isActive('cv-section')
                                    ? 'text-emerald-400 bg-emerald-500/10 rounded-full ring-2 ring-emerald-500/50'
                                    : 'text-slate-400 hover:text-emerald-400'
                                    }`}
                                title="Contact / CV"
                            >
                                <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-800 px-2 py-1 rounded">Contact</span>
                            </button>
                        </>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
