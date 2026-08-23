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

const roles = ['Machine Learning Engineer', 'AI Solutions Architect', 'RAG & LLM Specialist'];

const overviewRows = [
    { label: 'Role', value: 'AI Engineer @ ArcSirius' },
    { label: 'Focus', value: 'Agentic Systems · LLMs · RAG' },
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
        <section id="hero" className="pt-32 pb-20">
            <div className="mx-auto max-w-3xl px-6">
                {/* Identity */}
                <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-zinc-700">
                        <img
                            src="/profile.jpg"
                            alt="Muhammad Umair Farooq"
                            className="h-full w-full object-cover object-center"
                            style={{ objectPosition: 'center 20%', transform: 'scale(1.15)' }}
                            loading="eager"
                        />
                    </div>
                    <div>
                        <p className="font-medium text-zinc-50">Muhammad Umair Farooq</p>
                        <p className="text-sm text-zinc-500">Islamabad, Pakistan</p>
                    </div>
                </div>

                {/* Headline */}
                <h1 className="mt-12 text-4xl font-semibold leading-[1.12] tracking-tight text-white md:text-5xl">
                    Building with AI.
                    <br />
                    <span className="text-zinc-500">Small details matter.</span>
                </h1>

                <p ref={roleRef} className="mt-6 min-h-5 font-mono text-sm text-zinc-400">
                    Machine Learning Engineer
                </p>

                {/* Overview */}
                <dl className="mt-12 divide-y divide-zinc-800/70 border-y border-zinc-800/70">
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