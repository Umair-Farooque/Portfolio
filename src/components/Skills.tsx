const stackGroups = [
    {
        num: '01',
        category: 'Languages & Core ML',
        items: ['Python', 'PyTorch', 'Pandas', 'NumPy']
    },
    {
        num: '02',
        category: 'AI Engineering',
        items: ['LLMs', 'RAG Systems', 'LangChain', 'Transformers', 'NLP']
    },
    {
        num: '03',
        category: 'Vector Search',
        items: ['FAISS', 'Pinecone', 'Embeddings', 'BM25']
    },
    {
        num: '04',
        category: 'Backend & Deployment',
        items: ['FastAPI', 'Docker', 'OCR Pipelines', 'Workflow Automation']
    }
];

const Skills = () => {
    return (
        <section id="skills-section" className="py-24 scroll-mt-20">
            <div className="mx-auto max-w-3xl px-6">
                <h2 className="mb-10 text-2xl font-semibold tracking-tight text-zinc-50">Stack</h2>

                <div className="border-b border-zinc-800">
                    {stackGroups.map((group) => (
                        <div
                            key={group.num}
                            className="grid grid-cols-1 gap-2 border-t border-zinc-800 py-5 sm:grid-cols-[80px_1fr] sm:gap-6"
                        >
                            <span className="pt-1 font-mono text-xs text-zinc-600">{group.num}</span>
                            <div>
                                <p className="mb-2.5 text-sm font-medium text-zinc-50">{group.category}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {group.items.map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-md border border-zinc-800 px-2 py-1 font-mono text-[11px] text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100"
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