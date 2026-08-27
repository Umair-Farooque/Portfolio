const stackGroups = [
    {
        num: '01',
        category: 'AI & Generative AI',
        items: ['GPT-4', 'OpenAI API', 'RAG', 'Agentic AI', 'Prompt Engineering', 'LangChain', 'LangGraph', 'Transformers', 'Tool-Using Agents']
    },
    {
        num: '02',
        category: 'ML & Deep Learning',
        items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'NLP', 'Computer Vision', 'Speech Processing', 'Model Fine-tuning']
    },
    {
        num: '03',
        category: 'Backend & Systems',
        items: ['FastAPI', 'REST APIs', 'WebSockets', 'Microservices', 'Docker', 'Git', 'Linux', 'CI/CD']
    },
    {
        num: '04',
        category: 'Databases & Retrieval',
        items: ['FAISS', 'Pinecone', 'ChromaDB', 'MySQL', 'PostgreSQL', 'Semantic Search', 'BM25 + Vector']
    },
    {
        num: '05',
        category: 'Languages',
        items: ['Python', 'C++', 'C', 'SQL']
    }
];

const Skills = () => {
    return (
        <section id="skills-section" className="py-24 scroll-mt-20">
            <div className="mx-auto max-w-3xl px-6">
                <h2 className="mb-10 text-2xl font-semibold tracking-tight text-primary">Stack</h2>

                <div className="border-b border-zinc-800">
                    {stackGroups.map((group) => (
                        <div
                            key={group.num}
                            className="grid grid-cols-1 gap-2 border-t border-zinc-800 py-5 sm:grid-cols-[80px_1fr] sm:gap-6"
                        >
                            <span className="pt-1 font-mono text-xs text-subtle">{group.num}</span>
                            <div>
                                <p className="mb-2.5 text-sm font-medium text-primary">{group.category}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {group.items.map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-md border border-zinc-800 px-2 py-1 font-mono text-[11px] text-muted transition-colors hover:border-zinc-600 hover:text-tertiary"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;