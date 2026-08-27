import { ElasticGallery, ElasticItemProps } from './ui/elastic-gallery';

const projects: ElasticItemProps[] = [
    {
        id: '01',
        category: 'Conversational AI',
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
        id: '02',
        category: 'Speech Agents',
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
        id: '03',
        category: 'Agentic AI',
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
        id: '04',
        category: 'RAG Systems',
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
        id: '05',
        category: 'Search & RAG',
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
        id: '06',
        category: 'Computer Vision',
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
        id: '07',
        category: 'NLP & Text Gen',
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
        id: '08',
        category: 'Deep Learning',
        src: '/projects/neuro-flex.svg',
        alt: 'Neuro-Flex EMG signal waveform diagram',
        title: 'Neuro-Flex — EMG Control',
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

const Projects = () => {
    return (
        <section id="projects-section" className="scroll-mt-20 py-24">
            <div className="mx-auto max-w-3xl px-6">
                <h2 className="mb-2 text-2xl font-semibold tracking-tight text-primary">Projects</h2>
                <p className="mb-8 font-mono text-xs text-muted">
                    Hover or tap a card to expand details.
                </p>
                <ElasticGallery items={projects} />
            </div>
        </section>
    );
};

export default Projects;
