const experiences = [
    {
        title: 'AI Engineer',
        company: 'ArcSirius',
        location: 'Islamabad, Pakistan · On-site',
        type: 'Full-time',
        period: 'Feb 2025 — Present',
        highlights: [
            'Spearheading the development of Mednix – an AI-powered Drugs Information Assistant, leveraging RAG and LLMs for accurate medical data retrieval.',
            'Architecting the Legal AI Assistant, a high-performance retrieval and reasoning system for automated legal document analysis.',
            'Developing an Agentic Healthcare Workflow System to automate processing of unstructured medical data with LLM-based validation and decision-making.'
        ],
        tech: ['Python', 'RAG', 'LLMs', 'LangChain', 'FastAPI']
    },
    {
        title: 'Machine Learning Intern',
        company: 'ZAA Soft',
        location: 'Islamabad, Pakistan · On-site',
        type: 'Internship',
        period: 'Jun 2024 — Aug 2024',
        highlights: [
            'Built LLM-powered applications using OpenAI and Hugging Face models.',
            'Implemented FAISS and Pinecone databases for efficient retrieval and search.',
            'Contributed to end-to-end deployment of internal AI prototypes.'
        ],
        tech: ['OpenAI', 'Hugging Face', 'FAISS', 'Pinecone']
    },
    {
        title: 'Backend Developer',
        company: '128 Technologies',
        location: 'Islamabad, Pakistan · On-site',
        type: 'Internship',
        period: 'Jul 2023 — Aug 2023',
        highlights: [
            'Created a management system for hospitals for doctor scheduling and patient appointments.',
            'Gained hands-on experience in Python, problem-solving, and project management.'
        ],
        tech: ['Python', 'REST APIs', 'SQL']
    },
    {
        title: 'Machine Learning Intern',
        company: 'Air University',
        location: 'Islamabad, Pakistan · On-site',
        type: 'Internship',
        period: 'Jul 2023 — Sept 2023',
        highlights: [
            'Completed an enriching internship in the Department of Creative Technologies, honing Machine Learning skills.'
        ],
        tech: ['Machine Learning', 'Research']
    }
];

const Experience = () => {
    return (
        <section id="experience-section" className="py-24 scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-2xl font-semibold tracking-tight mb-10">Experience</h2>

                <div className="border-b border-zinc-200">
                    {experiences.map((exp, index) => (
                        <article key={index} className="border-t border-zinc-200 py-8">
                            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                <div>
                                    <h3 className="font-medium">{exp.title}</h3>
                                    <p className="mt-0.5 text-sm text-zinc-500">
                                        {exp.company} · {exp.location}
                                    </p>
                                </div>
                                <span className="font-mono text-xs text-zinc-400">{exp.period}</span>
                            </div>

                            <ul className="mt-5 space-y-2.5">
                                {exp.highlights.map((highlight, hIndex) => (
                                    <li key={hIndex} className="flex gap-3 text-sm leading-relaxed text-zinc-600">
                                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-5 flex flex-wrap gap-1.5">
                                {exp.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="rounded-md border border-zinc-200 px-1.5 py-0.5 font-mono text-[11px] text-zinc-500"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;