const experiences = [
    {
        title: 'Associate AI Engineer',
        company: 'Developers Den',
        period: 'Sept 2026 – Present',
        highlights: [
            'Architecting and developing SaaS Voice Agent systems leveraging advanced LLM models for intelligent conversational AI and natural language understanding',
            'Building LLM-powered applications with production-grade vector databases and RAG pipelines for context-aware, retrieval-augmented responses',
            'Designing scalable backend infrastructure using FastAPI and microservices to support enterprise-level AI solutions with real-time performance optimization',
            'Implementing agentic AI workflows with tool-using capabilities and autonomous decision-making systems for complex business automation'
        ]
    },
    {
        title: 'AI Engineer',
        company: 'ArcSirius',
        period: 'May 2025 – Sept 2026',
        highlights: [
            'Designed and deployed Credit Enrich System, an AI-driven pipeline using OCR, regex, and LLM-based validation for automating creditworthiness evaluation, improving data extraction accuracy by 35% and reducing manual processing time by 50%',
            'Built scalable backend services using FastAPI and integrated vector databases (FAISS, Pinecone) for efficient retrieval-augmented generation and context-aware AI responses',
            'Developed production-grade agentic AI systems with modular architecture, real-time performance optimization, and reliable tool-using agent workflows'
        ]
    },
    {
        title: 'Machine Learning Intern',
        company: 'ZAASoft and Technologies',
        period: 'Jun 2024 – Aug 2024',
        highlights: [
            'Developed LLM-powered applications using OpenAI GPT-4 and Hugging Face Transformers (BERT, Sentence-Transformers) for NLU and text generation tasks',
            'Built and deployed RAG systems with FAISS and Pinecone vector search, integrated with LLMs via FastAPI and containerized microservices for scalable AI APIs'
        ]
    },
    {
        title: 'AI Backend Developer',
        company: '128 Technologies',
        period: 'Jul 2023 – Aug 2023',
        highlights: [
            'Developed a hospital management system with RESTful APIs in Python for scheduling, patient records, and data processing with MySQL databases'
        ]
    }
];

const Experience = () => {
    return (
        <section id="experience-section" className="py-24 scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-5xl font-semibold tracking-tight text-primary mb-10">Experience</h2>

                <div className="border-b border-zinc-800">
                    {experiences.map((exp, index) => (
                        <article key={index} className="border-t border-zinc-800 py-8">
                            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-xl font-medium text-primary">{exp.title}</h3>
                                    <p className="text-lg text-muted">
                                        {exp.company}
                                    </p>
                                    <span className="font-mono text-base text-muted">{exp.period}</span>
                                </div>
                            </div>

                            <ul className="mt-5 space-y-2.5">
                                {exp.highlights.map((highlight, hIndex) => (
                                    <li key={hIndex} className="flex gap-3 text-lg leading-relaxed text-tertiary">
                                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-subtle" />
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-5 flex flex-wrap gap-1.5">
                                {/* Tech tags removed - new experience entries focus on highlights only */}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;