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
        this.resolve = () => { };
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
            const start = Math.floor(Math.random() * 60);
            const end = start + Math.floor(Math.random() * 60);
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

const Hero = () => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const animationContainerRef = useRef<HTMLDivElement>(null); // Dedicated container for animation

    useEffect(() => {
        if (titleRef.current) {
            const scrambler = new TextScramble(titleRef.current);
            const phrases = [
                'Muhammad Umair Farooq',
                'Machine Learning Engineer',
                'AI Solutions Architect',
                'RAG & LLM Specialist'
            ];

            let counter = 0;
            const nextPhrase = () => {
                scrambler.setText(phrases[counter]).then(() => {
                    setTimeout(nextPhrase, 2000);
                });
                counter = (counter + 1) % phrases.length;
            };

            nextPhrase();
        }
    }, []);

    useEffect(() => {
        const container = animationContainerRef.current;
        if (!container) return;

        const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
        const charCount = 150;
        const chars: {
            el: HTMLSpanElement;
            x: number;
            y: number;
            speed: number;
            char: string;
        }[] = [];

        // Create spans and append ONLY to the animation container
        for (let i = 0; i < charCount; i++) {
            const span = document.createElement('span');
            span.className = "absolute text-xs transition-colors duration-100 text-slate-600 font-light select-none pointer-events-none";
            span.style.fontSize = '1.8rem';
            span.style.willChange = 'transform, top';
            span.style.transition = 'color 0.1s, transform 0.1s, text-shadow 0.1s';

            const x = Math.random() * 100;
            const y = Math.random() * 100;
            span.style.left = `${x}%`;
            span.style.top = `${y}%`;
            span.style.transform = 'translate(-50%, -50%) scale(1)';

            const char = allChars[Math.floor(Math.random() * allChars.length)];
            span.innerText = char;

            container.appendChild(span);

            chars.push({
                el: span,
                x,
                y,
                speed: 0.05 + Math.random() * 0.15,
                char
            });
        }

        let animationFrameId: number;
        let activeWrapper: { indices: Set<number> } = { indices: new Set() };

        // Flicker Effect
        const intervalId = setInterval(() => {
            const newActiveIndices = new Set<number>();
            const numActive = Math.floor(Math.random() * 3) + 3;
            for (let i = 0; i < numActive; i++) {
                newActiveIndices.add(Math.floor(Math.random() * charCount));
            }

            // Reset old active ones
            activeWrapper.indices.forEach(index => {
                if (!newActiveIndices.has(index)) {
                    const charObj = chars[index];
                    if (charObj && charObj.el) {
                        charObj.el.className = "absolute text-xs transition-colors duration-100 text-slate-600 font-light select-none pointer-events-none";
                        charObj.el.style.transform = 'translate(-50%, -50%) scale(1)';
                        charObj.el.style.textShadow = 'none';
                        charObj.el.style.opacity = '0.4';
                    }
                }
            });

            // Set new active ones
            newActiveIndices.forEach(index => {
                const charObj = chars[index];
                if (charObj && charObj.el) {
                    charObj.el.className = "absolute text-xs transition-colors duration-100 text-[#00ff00] text-base z-10 font-bold animate-pulse select-none pointer-events-none";
                    charObj.el.style.transform = 'translate(-50%, -50%) scale(1.25)';
                    charObj.el.style.textShadow = '0 0 8px rgba(255,255,255,0.8), 0 0 12px rgba(255,255,255,0.4)';
                    charObj.el.style.opacity = '1';
                }
            });

            activeWrapper.indices = newActiveIndices;
        }, 100);

        // Position Update Loop
        const animate = () => {
            chars.forEach(charObj => {
                charObj.y += charObj.speed;

                if (charObj.y >= 100) {
                    charObj.y = -5;
                    charObj.x = Math.random() * 100;
                    charObj.el.style.left = `${charObj.x}%`;
                    charObj.char = allChars[Math.floor(Math.random() * allChars.length)];
                    charObj.el.innerText = charObj.char;
                }

                charObj.el.style.top = `${charObj.y}%`;
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearInterval(intervalId);
            if (container) {
                container.innerHTML = ''; // Safe to clear because it only contains animation spans
            }
        };
    }, []);

    return (
        <div className="relative w-full h-screen bg-black" id="hero" style={{ scrollSnapAlign: 'center' }}>
            {/* Animation Container - Completely Empty initially */}
            <div ref={animationContainerRef} className="absolute inset-0 pointer-events-none z-0"></div>

            {/* Content Container - React Managed */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full px-4 text-center">
                <h1 ref={titleRef} className="text-white text-4xl md:text-6xl font-bold tracking-wider justify-center inline-block" style={{ fontFamily: 'monospace' }}>
                    ML ENGINEER
                </h1>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-10">
                    <a
                        href="/resume.pdf"
                        download
                        className="flex items-center gap-2 bg-gradient-to-br from-emerald-500/25 via-emerald-500/10 to-green-500/25 backdrop-blur-md border border-emerald-500/30 text-emerald-300 px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 hover:from-emerald-500/40 hover:to-green-500/40 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] active:scale-95 group focus:outline-none"
                    >
                        <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Resume
                    </a>
                </div>
                <p className="text-gray-400 mt-6 text-lg">Scroll down to explore my journey</p>

                <button
                    onClick={() => {
                        const element = document.getElementById('experience-section');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-8 animate-bounce group focus:outline-none pointer-events-auto inline-block cursor-pointer"
                    aria-label="Scroll to Experience"
                >
                    <svg className="w-8 h-8 text-white mx-auto group-hover:text-emerald-400 transition-colors" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Hero;
