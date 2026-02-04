import { useState } from 'react';
import RainingLetters from './RainingLetters';

const projects = [
    {
        title: "Agentic Healthcare Workflow",
        description: "Built and deployed an agentic AI system that processes unstructured healthcare data (text, PDFs, scanned documents) using LLMs and OCR, validates information completeness, and executes decision-based workflows with full audit logging.",
        tech: ["Python", "LLMs", "OCR", "FastAPI", "Workflow Automation"],
        link: "https://agentic-healthcare-system-01.onrender.com/" // Update with actual link
    },
    {
        title: "Mednix – AI-Powered Drug Info Assistant",
        description: "Developed a FastAPI-based RAG system integrating OpenAI and medical databases to deliver accurate, context-aware drug information with intelligent retrieval and response generation.",
        tech: ["FastAPI", "RAG", "OpenAI", "Medical Databases", "LangChain"],
        link: "https://mednix.onrender.com/" // Update with actual link
    },
    {
        title: "Legal AI Assistant",
        description: "Created a hybrid BM25 + FAISS retrieval engine with LLM summarization for intelligent legal document search and reasoning, enabling efficient case law analysis.",
        tech: ["FAISS", "BM25", "LLM", "Document Search", "Summarization"],
        link: "https://legal-reasoning-agent.onrender.com/" // Update with actual link
    },
    {
        title: "Neuro-Flex – EMG-Based Hand Movement",
        description: "Designed a deep learning pipeline using LSTM models to classify EMG signals and control a 3D prosthetic hand in real-time with high accuracy.",
        tech: ["LSTM", "PyTorch", "Signal Processing", "Real-time Control", "Deep Learning"],
        link: "https://github.com/Umair-Farooque/Neuro_Flex-EMG-Signals-Based-Hand-Movements-Predictor.git" // Update with actual link
    }
];

const Projects = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleProject = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="bg-black py-20 relative min-h-screen flex items-center" id="projects-section" style={{ scrollSnapAlign: 'center' }}>
            <RainingLetters />
            <div className="max-w-6xl mx-auto px-4 relative z-10 w-full">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'monospace' }}>
                        PROJECTS
                    </h2>
                    <p className="text-gray-400 text-lg">Click to explore</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <div key={index} className="border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
                            {/* Project Title - Always Visible */}
                            <button
                                onClick={() => toggleProject(index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left group transition-colors hover:bg-white/5"
                            >
                                <h3 className="text-lg md:text-xl text-white group-hover:text-emerald-400 transition-colors font-light tracking-wide">
                                    {project.title}
                                </h3>

                                <svg
                                    className={`w-5 h-5 text-emerald-400 transition-transform duration-300 flex-shrink-0 ml-4 ${expandedIndex === index ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>

                            {/* Project Details - Collapsible */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ${expandedIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="px-6 py-6 border-t border-slate-800/50">
                                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech.map((t, i) => (
                                            <span
                                                key={i}
                                                className="text-xs text-emerald-400 font-mono"
                                            >
                                                {t}{i < project.tech.length - 1 ? ' ·' : ''}
                                            </span>
                                        ))}
                                    </div>

                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-mono transition-colors group"
                                        >
                                            <span>View Project</span>
                                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
