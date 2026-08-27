import Hero from './components/Hero';
import CV from './components/CV';
import ChatBot from './components/ChatBot';
import Projects from './components/Projects';
import Navbar from './components/Navbar';
import Skills from './components/Skills';
import Experience from './components/Experience';
import { HolographicWall } from './components/ui/holographic-wall';
import { ScrollStackingLayout } from './components/ui/scroll-stacking-layout';

function App() {
    const sections = [
        <Hero key="hero" />,
        <Experience key="experience" />,
        <Projects key="projects" />,
        <Skills key="skills" />,
        <CV key="cv" />,
    ];

    return (
        <div className="min-h-screen relative">
            <HolographicWall />
            <Navbar />
            <ScrollStackingLayout sections={sections} />
            <footer className="border-t border-[#003d00]">
                <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
                    <p className="font-mono text-sm text-[#008f11]">© 2026 Muhammad Umair Farooq</p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-sm text-[#008f11]">
                        <a
                            href="/resume.pdf"
                            download
                            className="transition-colors hover:text-[#00ff40] hover:text-shadow-glow"
                        >
                            Resume
                        </a>
                        <span>·</span>
                        <a
                            href="https://github.com/Umair-Farooque"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-[#00ff40] hover:text-shadow-glow"
                        >
                            GitHub
                        </a>
                        <span>·</span>
                        <a
                            href="https://www.linkedin.com/in/umairfaroq/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-[#00ff40] hover:text-shadow-glow"
                        >
                            LinkedIn
                        </a>
                        <span>·</span>
                        <a
                            href="https://wa.me/923084624629"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-[#00ff40] hover:text-shadow-glow"
                        >
                            WhatsApp
                        </a>
                        <span>·</span>
                        <a
                            href="mailto:farooq.intellecta@gmail.com"
                            className="transition-colors hover:text-[#00ff40] hover:text-shadow-glow"
                        >
                            Email
                        </a>
                    </div>
                </div>
            </footer>
            <ChatBot />
        </div>
    );
}

export default App;

