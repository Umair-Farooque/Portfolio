import Hero from './components/Hero';
import CV from './components/CV';
import ChatBot from './components/ChatBot';
import Projects from './components/Projects';
import Navbar from './components/Navbar';
import Skills from './components/Skills';
import Experience from './components/Experience';

function App() {
    return (
        <div className="bg-black min-h-screen">
            <Navbar />
            <Hero />
            <Experience />
            <Projects />
            <Skills />
            <CV />
            <ChatBot />
        </div>
    );
}

export default App;
