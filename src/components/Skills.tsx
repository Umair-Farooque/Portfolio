import { useEffect, useRef, useState } from 'react';
import RainingLetters from './RainingLetters';

const skills = [
    { name: "Python & ML Frameworks", level: 95 },
    { name: "LLMs & RAG Systems", level: 90 },
    { name: "FastAPI & Backend Dev", level: 85 },
    { name: "Deep Learning (PyTorch)", level: 88 },
    { name: "Vector Databases (FAISS, Pinecone)", level: 87 },
    { name: "LangChain & Transformers", level: 90 },
    { name: "Data Science (Pandas, NumPy)", level: 85 },
    { name: "Docker & Deployment", level: 80 },
    { name: "Natural Language Processing", level: 92 }
];

const Skills = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <div ref={sectionRef} className="bg-black py-20 relative min-h-screen flex items-center" id="skills-section" style={{ scrollSnapAlign: 'center' }}>
            <RainingLetters />
            <div className="max-w-6xl mx-auto px-4 relative z-10 w-full">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'monospace' }}>
                        SKILLS
                    </h2>
                    <p className="text-gray-400 text-lg">Technical proficiency</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {skills.map((skill, index) => (
                        <div key={index} className="border border-slate-800/50 p-5 hover:border-emerald-500/30 transition-colors">
                            <div className="mb-3">
                                <h3 className="text-base text-white font-light tracking-wide mb-1">
                                    {skill.name}
                                </h3>
                                <span className="text-sm text-emerald-400 font-mono">{skill.level}%</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-1000 ease-out"
                                    style={{
                                        width: isVisible ? `${skill.level}%` : '0%',
                                        transitionDelay: `${index * 100}ms`
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Skills;
