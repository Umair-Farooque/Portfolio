"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Mednix-AI Powered Drugs Information Bank",
    description:
      "Mednix is a RAG-based medical assistant that retrieves drug information from curated datasets and provides accurate, conversational answers. It uses embeddings, vector search (FAISS/Pinecone), and LLM reasoning to deliver trustworthy, context-aware medical guidance.",
    link: "https://mednix.onrender.com/",
  },
  {
    title: "Legal Reasoning Agent",
    description:
      "The Legal Agent is a hybrid RAG system combining BM25 search with vector retrieval and step-by-step LLM reasoning to analyze legal queries. It processes documents, extracts relevant statutes/clauses, and generates structured legal explanations with transparent reasoning.",
    link: "https://legal-reasoning-agent.onrender.com/",
  },
  {
    title: "Neuro-Flex",
    description:
      "An EMG Signal Based Hand Movements Predictor For Handicaped People. It reads brain signals in real time and performs a movement which is thought by the user.",
    link: "https://github.com/Umair-Farooque/Neuro_Flex-EMG-Signals-Based-Hand-Movements-Predictor",
  },
  {
    title: "Text Generator Using Twitter Data",
    description:
      "A text generator trained on Twitter dataset to predict next words or complete sentences based on the given input. Performs sentiment analysis on input sentences.",
    link: "https://github.com/Umair-Farooque/Sentiment-Analysis-and-Text-Generator-Using-Twitter-data",
  },
  {
    title: "Real Time Lane Detection",
    description:
      "Detects lane lines on the road using computer vision techniques. Processes video frames to identify and highlight lane markings for safe navigation.",
    link: "https://github.com/Umair-Farooque/Finding_Lane_Lines_on_the_Road",
  },
];

export default function Projects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [floatingShapes, setFloatingShapes] = useState<{ x: number; y: number; size: number; dx: number; dy: number; type: "circle" | "square" }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // 3D subtle background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; r: number; dx: number; dy: number }[] = [];
    const particleCount = 40;

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2 + 1,
          dx: (Math.random() - 0.5) * 0.3,
          dy: (Math.random() - 0.5) * 0.3,
        });
      }
    };

    const initShapes = () => {
      const shapesArr = [...Array(12)].map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 10 + Math.random() * 30,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        type: Math.random() > 0.5 ? "circle" : "square" as const,
      }));
      setFloatingShapes(shapesArr);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
      initShapes();
    };

    window.addEventListener("resize", resize);
    resize();

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw particles
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx = -p.dx;
        if (p.y < 0 || p.y > canvas.height) p.dy = -p.dy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(59, 130, 246, 0.3)";
        ctx.fill();
      });

      // draw floating shapes
      floatingShapes.forEach((s) => {
        s.x += s.dx;
        s.y += s.dy;

        if (s.x < 0 || s.x > canvas.width) s.dx = -s.dx;
        if (s.y < 0 || s.y > canvas.height) s.dy = -s.dy;

        ctx.beginPath();
        if (s.type === "circle") {
          ctx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2);
        } else {
          ctx.rect(s.x - s.size / 2, s.y - s.size / 2, s.size, s.size);
        }
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [floatingShapes]);

  // function to scroll horizontally by card width
  function scrollByCard(dir: "left" | "right") {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector("a");
    if (!card) return;
    const cardWidth = (card as HTMLElement).offsetWidth + 32; // 32px = space-x-8
    container.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth"
    });
  }

  // Check and update where we are in scroll for button states
  function updateScrollButtons() {
    const container = scrollRef.current;
    if (!container) return;
    setAtStart(container.scrollLeft < 10);
    setAtEnd(container.scrollWidth - container.clientWidth - container.scrollLeft < 10);
  }

  useEffect(() => {
    updateScrollButtons();
    const ref = scrollRef.current;
    if (!ref) return;
    ref.addEventListener("scroll", updateScrollButtons);
    return () => ref.removeEventListener("scroll", updateScrollButtons);
  }, []);

  return (
    <section id="projects" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-black overflow-hidden">
      {/* 3D background canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />

      <div className="max-w-5xl w-full text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent font-mono">
          Projects
        </h2>
        <div className="relative flex items-center">
          {/* Left arrow button */}
          <Button
            onClick={() => scrollByCard("left")}
            variant="ghost"
            size="icon"
            className={`absolute left-[-52px] z-20 top-1/2 -translate-y-1/2 bg-black/50 text-white shadow-lg rounded-full hover:bg-cyan-800/80 transition ${atStart ? "opacity-30 pointer-events-none" : "opacity-100"}`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-7 h-7" />
          </Button>
          {/* Scrollable project cards row */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-8 pb-4 px-1 snap-x snap-mandatory w-full justify-start scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch", scrollBehavior: "smooth", scrollbarWidth: "none" }}
            tabIndex={0}
          >
            {projects.map((project, idx) => (
              <a
                key={idx}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group min-w-[340px] max-w-xs flex-shrink-0 p-6 border border-white/20 rounded-3xl shadow-2xl backdrop-blur-xl bg-white/5 hover:shadow-white/20 transition transform hover:-translate-y-1 hover:scale-105 snap-start"
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-2 
                 bg-gradient-to-r from-white via-gray-300 to-gray-500 
                 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:via-cyan-400 group-hover:to-purple-400 
                 transition">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 text-sm md:text-base">{project.description}</p>
                <span className="text-blue-400 font-medium group-hover:underline flex items-center justify-center gap-1">
                  View Project <ExternalLink className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
          {/* Right arrow button */}
          <Button
            onClick={() => scrollByCard("right")}
            variant="ghost"
            size="icon"
            className={`absolute right-[-92px] z-20 top-1/2 -translate-y-1/2 bg-black/50 text-white shadow-lg rounded-full hover:bg-cyan-800/80 transition ${atEnd ? "opacity-30 pointer-events-none" : "opacity-100"}`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-7 h-7" />
          </Button>
        </div>
      </div>
    </section>
  );
}
