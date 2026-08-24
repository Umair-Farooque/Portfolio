import Hero from './components/Hero';
import CV from './components/CV';
import ChatBot from './components/ChatBot';
import Projects from './components/Projects';
import Navbar from './components/Navbar';
import Skills from './components/Skills';
import Experience from './components/Experience';
import { HolographicWall } from './components/ui/holographic-wall';

function App() {
    return (
        <div className="min-h-screen relative">
            <HolographicWall />
            <Navbar />
            <main>
                <Hero />
                <Experience />
                <Projects />
                <Skills />
                <CV />
            </main>
            <footer className="border-t border-zinc-800">
                <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-2 px-6 py-8 sm:flex-row">
                    <p className="font-mono text-xs text-zinc-400">© 2026 Muhammad Umair Farooq</p>
                    <p className="font-mono text-xs text-zinc-400">
                        Built with React &amp; Tailwind CSS · Style inspired by chanhdai.com
                    </p>
                </div>
            </footer>
            <ChatBot />
        </div>
    );
}

export default App;
