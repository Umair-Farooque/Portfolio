const projects = [
    {
        title: 'Agentic Healthcare Workflow',
        description:
            'Built and deployed an agentic AI system that processes unstructured healthcare data (text, PDFs, scanned documents) using LLMs and OCR, validates information completeness, and executes decision-based workflows with full audit logging.',
        tech: ['Python', 'LLMs', 'OCR', 'FastAPI', 'Workflow Automation'],
        link: 'https://agentic-healthcare-system-01.onrender.com/'
    },
    {
        title: 'Mednix – AI-Powered Drug Info Assistant',
        description:
            'Developed a FastAPI-based RAG system integrating OpenAI and medical databases to deliver accurate, context-aware drug information with intelligent retrieval and response generation.',
        tech: ['FastAPI', 'RAG', 'OpenAI', 'LangChain'],
        link: 'https://mednix.onrender.com/'
    },
    {
        title: 'Legal AI Assistant',
        description:
            'Created a hybrid BM25 + FAISS retrieval engine with LLM summarization for intelligent legal document search and reasoning, enabling efficient case law analysis.',
        tech: ['FAISS', 'BM25', 'LLM', 'Summarization'],
        link: 'https://legal-reasoning-agent.onrender.com/'
    },
    {
        title: 'Neuro-Flex – EMG-Based Hand Movement',
        description:
            'Designed a deep learning pipeline using LSTM models to classify EMG signals and control a 3D prosthetic hand in real-time with high accuracy.',
        tech: ['LSTM', 'PyTorch', 'Signal Processing', 'Deep Learning'],
        link: 'https://github.com/Umair-Farooque/Neuro_Flex-EMG-Signals-Based-Hand-Movements-Predictor.git'
    }
];

const Projects = () => {
    return (
        <section id="projects-section" className="py-24 scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 mb-10">Projects</h2>

                <div className="border-b border-zinc-800">
                    {projects.map((project) => (
                        <a
                            key={project.title}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block border-t border-zinc-800 py-7"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="font-medium text-zinc-50 transition-colors group-hover:text-zinc-300">
                                    {project.title}
                                </h3>
                                <span className="shrink-0 font-mono text-sm text-zinc-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-50">
                                    ↗
                                </span>
                            </div>

                            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
                                {project.description}
                            </p>

                            <p className="mt-3 font-mono text-[11px] text-zinc-500">
                                {project.tech.join('  ·  ')}
                            </p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;