import { useEffect, useRef } from 'react';

class TextScramble {
    el: HTMLElement;
    chars: string;
    queue: Array<{
        from: string;
        to: string;
        start: number;
        end: number;
        char?: string;
    }>;
    frame: number;
    frameRequest: number;
    resolve: (value: void | PromiseLike<void>) => void;

    constructor(el: HTMLElement) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#';
        this.queue = [];
        this.frame = 0;
        this.frameRequest = 0;
        this.resolve = () => {};
        this.update = this.update.bind(this);
    }

    setText(newText: string) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise<void>((resolve) => (this.resolve = resolve));
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
}

const roles = ['Machine Learning Engineer.', 'AI Solutions Architect.', 'RAG & LLM Specialist.'];

/* ---------- Isometric wireframe scene ---------- */

type Pt = [number, number];

const COS30 = Math.cos(Math.PI / 6);

const project = (x: number, y: number, z: number): Pt => [(x - y) * COS30, (x + y) * 0.5 - z];

const fmt = (p: Pt) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
const poly = (pts: Pt[]) => pts.map(fmt).join(' ');
const seg = (pts: Pt[]) => pts.map(fmt).join(' L');

interface BoxProps {
    x: number;
    y: number;
    z: number;
    w: number;
    d: number;
    h: number;
    hatch?: boolean;
    holeInset?: number;
}

const IsoBox = ({ x, y, z, w, d, h, hatch, holeInset }: BoxProps) => {
    const t1 = project(x, y, z + h);
    const t2 = project(x + w, y, z + h);
    const t3 = project(x + w, y + d, z + h);
    const t4 = project(x, y + d, z + h);
    const b2 = project(x + w, y, z);
    const b3 = project(x + w, y + d, z);
    const b4 = project(x, y + d, z);

    const outline = `M ${seg([t1, t2, b2, b3, b4, t4])} Z M ${seg([t2, t3])} M ${seg([t3, b3])} M ${seg([t4, t3])}`;

    return (
        <g stroke="#2b2b31" strokeWidth="1" fill="none" strokeLinejoin="round">
            {hatch && <polygon points={poly([t1, t2, t3, t4])} fill="url(#isoHatch)" stroke="none" />}
            <path d={outline} />
            {holeInset != null && (
                <>
                    {(() => {
                        const i1 = project(x + holeInset, y + holeInset, z + h);
                        const i2 = project(x + w - holeInset, y + holeInset, z + h);
                        const i3 = project(x + w - holeInset, y + d - holeInset, z + h);
                        const i4 = project(x + holeInset, y + d - holeInset, z + h);
                        const j1 = project(x + holeInset, y + holeInset, z);
                        const j2 = project(x + w - holeInset, y + holeInset, z);
                        const j3 = project(x + w - holeInset, y + d - holeInset, z);
                        const j4 = project(x + holeInset, y + d - holeInset, z);
                        return (
                            <>
                                <polygon points={poly([i1, i2, i3, i4])} />
                                <path d={`M ${seg([i1, j1])} M ${seg([i2, j2])} M ${seg([i3, j3])} M ${seg([i4, j4])}`} />
                            </>
                        );
                    })()}
                </>
            )}
        </g>
    );
};

const IsoScene = () => (
    <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1200 640"
        preserveAspectRatio="xMidYMid slice"
    >
        <defs>
            <pattern id="isoHatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="7" stroke="#232329" strokeWidth="1" />
            </pattern>
        </defs>

        {/* Dashed guide lines */}
        <g stroke="#232329" strokeWidth="1" strokeDasharray="5 8">
            <line x1="-60" y1="430" x2="1260" y2="150" />
            <line x1="-60" y1="230" x2="1260" y2="560" />
            <line x1="240" y1="-40" x2="980" y2="680" />
        </g>

        {/* Wireframe blocks */}
        <IsoBox x={560} y={40} z={0} w={310} d={290} h={48} holeInset={88} />
        <IsoBox x={270} y={130} z={0} w={190} d={165} h={36} holeInset={56} />
        <IsoBox x={470} y={340} z={0} w={145} d={125} h={22} hatch />
        <IsoBox x={680} y={360} z={0} w={175} d={155} h={18} hatch />
        <IsoBox x={90} y={55} z={0} w={95} d={85} h={16} />
    </svg>
);

const overviewRows = [
    { label: 'Role', value: 'ML Engineer @ ArcSirius' },
    { label: 'Focus', value: 'RAG · LLMs · Agentic Systems' },
    { label: 'Location', value: 'Islamabad, Pakistan' }
];

const Hero = () => {
    const roleRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!roleRef.current) return;

        const scrambler = new TextScramble(roleRef.current);
        let counter = 0;

        const nextRole = () => {
            scrambler.setText(roles[counter]).then(() => {
                setTimeout(nextRole, 2200);
            });
            counter = (counter + 1) % roles.length;
        };

        nextRole();
    }, []);

    return (
        <section id="hero" className="relative overflow-hidden">
            {/* Isometric wireframe backdrop */}
            <IsoScene />

            {/* Name band */}
            <div className="relative z-10 mt-40 md:mt-52">
                <div className="border-t border-zinc-800" />
                <div className="mx-auto max-w-3xl px-6">
                    <div className="flex items-center gap-5 py-7 md:gap-6 md:py-8">
                        <div className="flex h-20 w-20 shrink-0 select-none items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-xl font-bold tracking-tight text-zinc-100 md:h-28 md:w-28 md:text-2xl">
                            UF
                        </div>
                        <div className="min-w-0">
                            <h1 className="flex items-center gap-2.5 text-3xl font-bold tracking-tight text-white md:text-5xl">
                                <span className="truncate">Umair Farooq</span>
                                <svg
                                    aria-hidden="true"
                                    className="hidden h-5 w-5 shrink-0 text-zinc-500 sm:inline-block md:h-6 md:w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z"
                                    />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <svg
                                    aria-hidden="true"
                                    className="hidden h-5 w-5 shrink-0 text-zinc-500 sm:inline-block md:h-6 md:w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                                    />
                                </svg>
                            </h1>
                            <p ref={roleRef} className="mt-2 min-h-5 font-mono text-sm text-zinc-400 md:text-base">
                                Machine Learning Engineer.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-zinc-800" />
            </div>

            {/* Fig caption */}
            <div className="relative z-10 mx-auto max-w-3xl px-6 pt-3 text-right font-mono text-xs text-zinc-600">
                Fig.1.
            </div>

            {/* Overview */}
            <div className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-12">
                <dl className="divide-y divide-zinc-800/70 border-y border-zinc-800/70">
                    {overviewRows.map((row) => (
                        <div key={row.label} className="flex items-center justify-between py-3.5 text-sm">
                            <dt className="text-zinc-500">{row.label}</dt>
                            <dd className="text-zinc-200">{row.value}</dd>
                        </div>
                    ))}
                    <div className="flex items-center justify-between gap-4 py-3.5 text-sm">
                        <dt className="text-zinc-500">Links</dt>
                        <dd className="flex items-center gap-5">
                            <a
                                href="https://github.com/Umair-Farooque"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-300 underline-offset-4 transition-colors hover:text-zinc-500 hover:underline"
                            >
                                GitHub ↗
                            </a>
                            <a
                                href="/resume.pdf"
                                download
                                className="rounded-full bg-zinc-100 px-4 py-1.5 text-[13px] font-medium text-zinc-900 transition-colors hover:bg-white"
                            >
                                Download Resume ↓
                            </a>
                        </dd>
                    </div>
                </dl>
            </div>
        </section>
    );
};

export default Hero;