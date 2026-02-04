import { useEffect, useRef } from 'react';

const RainingLetters = () => {
    const animationContainerRef = useRef<HTMLDivElement>(null);

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
                container.innerHTML = '';
            }
        };
    }, []);

    return <div ref={animationContainerRef} className="absolute inset-0 pointer-events-none z-0"></div>;
};

export default RainingLetters;
