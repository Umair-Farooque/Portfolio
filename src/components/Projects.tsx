import { CoverflowCarousel, type CoverflowSlide } from './ui/coverflow-carousel';

type ProjectSlide = CoverflowSlide & { href: string };

const projects: ProjectSlide[] = [
    {
        src: '/projects/invinci-ai-voice-agent.svg',
        alt: 'Real-time voice agent pipeline with STT, LLM, and TTS components connected via WebSocket streams',
        title: 'Invinci AI Voice Agent',
        subtitle: 'Real-time conversational voice agent for car dealerships with STT, LLM reasoning, and TTS streaming',
        meta: [
            { label: 'Stack', value: 'LiveKit · FastAPI · WebSockets' },
            { label: 'Features', value: 'STT · LLM · TTS · Turn-taking' },
            { label: 'Impact', value: '-25% call load · -30% latency' }
        ],
        href: 'https://voicedemo.invinci.org/'
    },
    {
        src: '/projects/ai-voice-intake-agent.svg',
        alt: 'AI voice intake agent with LiveKit WebRTC, OpenAI Realtime API, and Supabase integration',
        title: 'AI Voice Intake Agent',
        subtitle: 'Multi-language intake calls with state-machine flows, spell-back verification, and emergency detection',
        meta: [
            { label: 'Stack', value: 'LiveKit · OpenAI Realtime · Supabase' },
            { label: 'Features', value: 'State-machine · Spell-back · Panic detection' },
            { label: 'Performance', value: '<800ms latency · Multi-language' }
        ],
        href: 'https://github.com/Umair-Farooque/Speech-Model-Demo.git'
    },
    {
        src: '/projects/lane-line-detection.svg',
        alt: 'Computer vision pipeline showing lane detection with perspective transform and ROI masking',
        title: 'Lane Line Detection on Roads',
        subtitle: 'Robust CV pipeline with camera calibration, Canny edges, perspective transform, and Hough line detection',
        meta: [
            { label: 'Stack', value: 'Python · OpenCV · NumPy' },
            { label: 'Techniques', value: 'Calibration · Birds-eye view · Sliding window' },
            { label: 'Type', value: 'Computer Vision' }
        ],
        href: 'https://github.com/Umair-Farooque/Finding_Lane_Lines_on_the_Road.git'
    },
    {
        src: '/projects/twitter-sentiment-analysis.svg',
        alt: 'NLP pipeline with sentiment classification and N-gram language models with Laplace smoothing',
        title: 'Twitter Sentiment Analysis & N-gram Generator',
        subtitle: 'End-to-end NLP system for sentiment analysis and next-word prediction with custom N-gram models',
        meta: [
            { label: 'Stack', value: 'Python · NLTK · NumPy · Pandas' },
            { label: 'Models', value: 'Unigram · Bigram · Trigram · Laplace smoothing' },
            { label: 'Type', value: 'NLP · Language Modeling' }
        ],
        href: 'https://github.com/Umair-Farooque/Sentiment-Analysis-and-Text-Generator-Using-Twitter-data.git'
    },
    {
        src: '/projects/agentic-healthcare.svg',
        alt: 'Wireframe diagram of connected decision nodes representing an agentic workflow',
        title: 'Agentic Healthcare Workflow',
        subtitle: 'LLM agents processing unstructured medical data end-to-end with audit logging',
        meta: [
            { label: 'Stack', value: 'Python · FastAPI' },
            { label: 'Features', value: 'OCR · Validation' },
            { label: 'Type', value: 'Agentic system' }
        ],
        href: 'https://agentic-healthcare-system-01.onrender.com/'
    },
    {
        src: '/projects/mednix.svg',
        alt: 'Wireframe medical cross above a heartbeat pulse line',
        title: 'Mednix — Drug Info Assistant',
        subtitle: 'FastAPI-based RAG system for accurate, context-aware drug information',
        meta: [
            { label: 'Stack', value: 'FastAPI · RAG' },
            { label: 'Retrieval', value: 'OpenAI · Vector DB' },
            { label: 'Type', value: 'RAG application' }
        ],
        href: 'https://mednix.onrender.com/'
    },
    {
        src: '/projects/legal-ai.svg',
        alt: 'Wireframe document with text lines beside a magnifying glass',
        title: 'Legal AI Assistant',
        subtitle: 'Hybrid BM25 + FAISS retrieval with LLM summarization for case-law analysis',
        meta: [
            { label: 'Stack', value: 'BM25 · FAISS' },
            { label: 'Features', value: 'Search · Summary' },
            { label: 'Type', value: 'Retrieval engine' }
        ],
        href: 'https://legal-reasoning-agent.onrender.com/'
    },
    {
        src: '/projects/neuro-flex.svg',
        alt: 'Amber EMG signal waveform between two sensor nodes',
        title: 'Neuro-Flex — EMG Hand Movement',
        subtitle: 'LSTM pipeline classifying EMG signals to control a 3D prosthetic hand',
        meta: [
            { label: 'Stack', value: 'PyTorch · LSTM' },
            { label: 'Domain', value: 'Signal processing' },
            { label: 'Type', value: 'Deep learning' }
        ],
        href: 'https://github.com/Umair-Farooque/Neuro_Flex-EMG-Signals-Based-Hand-Movements-Predictor.git'
    }
];

const Projects = () => {
    return (
        <section id="projects-section" className="scroll-mt-20 py-24">
            <div className="mx-auto max-w-3xl px-6">
                <h2 className="mb-2 text-2xl font-semibold tracking-tight text-zinc-50">Projects</h2>
                <p className="font-mono text-xs text-zinc-500">
                    Drag, flick or use the arrow keys — Fig. 01–08.
                </p>
            </div>

            <div className="mt-6">
                <CoverflowCarousel
                    slides={projects}
                    showCaption
                    showPagination
                    showNavigation
                    label="Projects coverflow carousel"
                    cardWidth="clamp(200px, 34vw, 300px)"
                />
            </div>
        </section>
    );
};

export default Projects;