import { useState, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

interface Project {
    src: string;
    src2?: string;
    alt: string;
    title: string;
    subtitle: string;
    stack: string[];
    bullets: string[];
    href: string;
    objectPosition?: string;
}

const projects: Project[] = [
    {
        src: '/projects/invinci-ai-voice-agent.png',
        alt: 'Invinci AI Voice Agent live UI screenshot',
        title: 'Invinci AI Voice Agent',
        subtitle: 'Real-time conversational voice agent for car dealerships — STT, LLM reasoning, and TTS over WebSocket streams.',
        stack: ['LiveKit', 'FastAPI', 'WebSockets', 'STT', 'TTS', 'LLM'],
        bullets: [
            'Reduced inbound call load by 25% and response latency by 30%',
            'Improved booking efficiency by 40% via optimized intent detection',
            'Streaming dialogue with real-time turn-taking',
        ],
        href: 'https://voicedemo.invinci.org/',
        objectPosition: 'top',
    },
    {
        src: '/projects/ai-voice-intake-agent.png',
        alt: 'AI Voice Intake Agent UI screenshot',
        title: 'AI Voice Intake Agent',
        subtitle: 'Multi-language intake calls with state-machine flows, spell-back verification, and emergency detection.',
        stack: ['LiveKit', 'OpenAI Realtime', 'Supabase', 'WebRTC'],
        bullets: [
            'Sub-800ms end-to-end voice latency',
            'State-machine dialogue with spell-back and panic detection',
            'Multi-language support with Supabase persistence',
        ],
        href: 'https://github.com/Umair-Farooque/Speech-Model-Demo.git',
        objectPosition: 'top',
    },
    {
        src: '/projects/agentic-healthcare.svg',
        alt: 'Agentic Healthcare Workflow system diagram',
        title: 'Agentic Healthcare Workflow',
        subtitle: 'LangGraph agents processing unstructured medical PDFs end-to-end with OCR and LLM-based validation.',
        stack: ['LangGraph', 'Python', 'FastAPI', 'OCR', 'LLMs'],
        bullets: [
            'Improved processing efficiency by 45% across data pipelines',
            'Reduced manual verification effort by 50%',
            'Improved decision accuracy by 30% via multi-step agentic reasoning',
        ],
        href: 'https://agentic-healthcare-system-01.onrender.com/',
    },
    {
        src: '/projects/mednix1.png',
        src2: '/projects/mednix2.png',
        alt: 'Mednix drug information assistant UI screenshot',
        title: 'Mednix — Drug Info Assistant',
        subtitle: 'RAG system for medical drug queries using FAISS vector search and OpenAI embeddings.',
        stack: ['FastAPI', 'FAISS', 'OpenAI', 'RAG', 'Python'],
        bullets: [
            'Improved response relevance by 35% with semantic retrieval',
            'Reduced query time by 40% vs keyword-only search',
            'FAISS vector DB with OpenAI embeddings pipeline',
        ],
        href: 'https://mednix.onrender.com/',
        objectPosition: 'top',
    },
    {
        src: '/projects/legal_ai.png',
        alt: 'Legal AI Assistant search interface screenshot',
        title: 'Legal AI Assistant',
        subtitle: 'Hybrid BM25 + FAISS retrieval with LLM summarization for rapid case-law analysis.',
        stack: ['Python', 'BM25', 'FAISS', 'LLMs', 'RAG'],
        bullets: [
            'Reduced manual case review effort by 80%',
            'Hybrid keyword + semantic search pipeline',
            'LLM-generated summaries with source citation',
        ],
        href: 'https://legal-reasoning-agent.onrender.com/',
        objectPosition: 'top',
    },
    {
        src: '/projects/lane-line-detection.svg',
        alt: 'Lane line detection computer vision pipeline diagram',
        title: 'Lane Line Detection',
        subtitle: 'CV pipeline with camera calibration, Canny edges, perspective transform, and sliding-window detection.',
        stack: ['Python', 'OpenCV', 'NumPy'],
        bullets: [
            'Camera calibration and distortion correction',
            "Birds-eye perspective transform for accurate lane geometry",
            'Sliding window and Hough line detection on road footage',
        ],
        href: 'https://github.com/Umair-Farooque/Finding_Lane_Lines_on_the_Road.git',
    },
    {
        src: '/projects/twitter-sentiment-analysis.svg',
        alt: 'Twitter sentiment analysis NLP pipeline diagram',
        title: 'Twitter Sentiment & N-gram',
        subtitle: 'End-to-end NLP system for sentiment classification and next-word prediction with custom N-gram models.',
        stack: ['Python', 'NLTK', 'NumPy', 'Pandas'],
        bullets: [
            'Unigram, Bigram, and Trigram language models built from scratch',
            'Laplace smoothing and back-off strategy for unseen words',
            'Perplexity evaluation on held-out Twitter corpus',
        ],
        href: 'https://github.com/Umair-Farooque/Sentiment-Analysis-and-Text-Generator-Using-Twitter-data.git',
    },
    {
        src: '/projects/neuro-flex.svg',
        alt: 'Neuro-Flex EMG signal waveform diagram',
        title: 'Neuro-Flex — EMG Hand Control',
        subtitle: 'LSTM pipeline classifying raw EMG signals to control a 3D-printed prosthetic hand in real time.',
        stack: ['PyTorch', 'LSTM', 'Signal Processing'],
        bullets: [
            'Raw EMG signal preprocessing and feature extraction',
            'LSTM classifier for time-series hand gesture recognition',
            '3D prosthetic hand actuation from predicted gesture class',
        ],
        href: 'https://github.com/Umair-Farooque/Neuro_Flex-EMG-Signals-Based-Hand-Movements-Predictor.git',
    },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const [expanded, setExpanded] = useState(false);
    const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
        hoverTimeout.current = setTimeout(() => setExpanded(true), 80);
    };
    const handleMouseLeave = () => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        setExpanded(false);
    };
    const handleClick = () => setExpanded((v) => !v);

    const hasTwoImages = !!project.src2;

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className={[
                'group relative flex cursor-pointer overflow-hidden rounded-2xl border bg-zinc-950',
                'transition-all duration-500 ease-in-out hover:shadow-xl hover:shadow-black/60',
                expanded ? 'border-zinc-600' : 'border-zinc-800 hover:border-zinc-700',
            ].join(' ')}
            style={{ height: expanded ? '270px' : '190px' }}
        >
            {/* Thumbnail pane */}
            <div
                className="relative shrink-0 overflow-hidden transition-all duration-500 ease-in-out"
                style={{ width: expanded ? '44%' : '100%' }}
            >
                <span className="absolute left-3 top-3 z-10 select-none font-mono text-[10px] text-zinc-600">
                    {'FIG.' + String(index + 1).padStart(2, '0')}
                </span>

                {hasTwoImages ? (
                    <div className="flex h-full w-full flex-col gap-px">
                        <img src={project.src} alt={project.alt} draggable={false}
                            className="h-1/2 w-full select-none object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                        <img src={project.src2} alt={project.alt} draggable={false}
                            className="h-1/2 w-full select-none object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                    </div>
                ) : (
                    <img
                        src={project.src} alt={project.alt} draggable={false}
                        className="h-full w-full select-none object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        style={{ objectPosition: project.objectPosition ?? 'center' }}
                    />
                )}

                <div className={[
                    'pointer-events-none absolute inset-y-0 right-0 w-12',
                    'bg-gradient-to-r from-transparent to-zinc-950 transition-opacity duration-500',
                    expanded ? 'opacity-100' : 'opacity-0',
                ].join(' ')} />
            </div>


            {/* Detail panel */}
            <div
                className={[
                    'flex min-w-0 flex-col justify-between overflow-hidden px-4 py-4',
                    'transition-all duration-500 ease-in-out',
                    expanded ? 'opacity-100 delay-100' : 'w-0 opacity-0',
                ].join(' ')}
                style={{ flex: expanded ? '1 1 0%' : '0 0 0%' }}
            >
                <div>
                    <p className="mb-1 text-[13px] font-semibold leading-snug text-primary line-clamp-1">
                        {project.title}
                    </p>
                    <p className="text-[11px] leading-relaxed text-muted line-clamp-2">
                        {project.subtitle}
                    </p>
                </div>

                <ul className="mt-2 space-y-1">
                    {project.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-1 text-[10px] leading-snug text-zinc-300">
                            <span className="mt-px shrink-0 text-zinc-600">—</span>
                            <span className="line-clamp-2">{b}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-2.5 flex flex-wrap gap-1">
                    {project.stack.map((tag) => (
                        <span key={tag} className="rounded border border-zinc-800 px-1.5 py-0.5 font-mono text-[9px] text-zinc-400">
                            {tag}
                        </span>
                    ))}
                </div>

                <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="btn-ghost mt-3 inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 font-mono text-[10px]"
                >
                    View Project
                    <ExternalLink className="size-2.5" />
                </a>
            </div>
        </div>
    );
}

const Projects = () => {
    return (
        <section id="projects-section" className="scroll-mt-20 py-24">
            <div className="mx-auto max-w-3xl px-6">
                <h2 className="mb-2 text-2xl font-semibold tracking-tight text-primary">Projects</h2>
                <p className="mb-8 font-mono text-xs text-muted">
                    Hover or tap a card to expand — Fig. 01–08.
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;

