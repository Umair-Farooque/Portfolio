import RainingLetters from './RainingLetters';

const experiences = [
    {
        title: "AI Engineer",
        company: "ArcSirius, Islamabad",
        period: "Feb 2025 – Present",
        highlights: [
            "Spearheading the development of Mednix – an AI-powered Drugs Information Assistant, leveraging RAG and LLMs for accurate medical data retrieval.",
            "Architecting the Legal AI Assistant, a high-performance retrieval and reasoning system for automated legal document analysis.",
            "Developing an Agentic Healthcare Workflow System to automate processing of unstructured medical data with LLM-based validation and decision-making."
        ]
    },
    {
        title: "Machine Learning Intern",
        company: "ZAA Soft, Islamabad",
        period: "June 2024 – August 2024",
        highlights: [
            "Built LLM-powered applications using OpenAI and Hugging Face models.",
            "Implemented FAISS and Pinecone databases for efficient retrieval and search.",
            "Contributed to end-to-end deployment of internal AI prototypes."
        ]
    },
    {
        title: "Backend Developer",
        company: "128 Technologies, Islamabad",
        period: "Jul 2023 – Aug 2023",
        highlights: [
            "Created a management system for hospitals for doctor scheduling and patient appointments.",
            "Gained hands-on experience in Python, problem-solving, and project management."
        ]
    },
    {
        title: "Machine Learning Intern",
        company: "Air University, Islamabad",
        period: "Jul 2023 – Sept 2023",
        highlights: [
            "Completed an enriching internship in the Department of Creative Technologies, honing Machine Learning skills."
        ]
    }

];

const Experience = () => {
    return (
        <div className="bg-black py-20 relative min-h-screen flex items-center scroll-mt-24" id="experience-section" style={{ scrollSnapAlign: 'center' }}>
            <RainingLetters />
            <div className="max-w-6xl mx-auto px-4 relative z-10 w-full">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'monospace' }}>
                        EXPERIENCE
                    </h2>
                    <p className="text-gray-400 text-lg">My professional journey</p>
                </div>

                <div className="space-y-8 max-w-4xl mx-auto">
                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className="relative pl-8 border-l-2 border-slate-800 hover:border-emerald-500/50 transition-colors py-4 group"
                        >
                            {/* Dot on the line */}
                            <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-black border-2 border-emerald-500 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>

                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                                <div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                                        {exp.title}
                                    </h3>
                                    <p className="text-emerald-500/80 font-medium">{exp.company}</p>
                                </div>
                                <div className="text-slate-500 font-mono text-sm bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800">
                                    {exp.period}
                                </div>
                            </div>

                            <ul className="space-y-3">
                                {exp.highlights.map((highlight, hIndex) => (
                                    <li key={hIndex} className="flex items-start gap-3 text-slate-400 leading-relaxed">
                                        <span className="text-emerald-500 mt-1.5 leading-none">▹</span>
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Experience;
