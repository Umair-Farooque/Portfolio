"use client";

import { useEffect, useRef } from "react";

const projects = [
  {
    title: "Neuro-Flex",
    description:
      "An EMG Signal Based Hand Movements Predictor For Handicaped People.It Reads Brain Signals In Real Time And Performs A Movements Which Is Thought By The User.",
    link: "https://github.com/Umair-Farooque/Neuro_Flex-EMG-Signals-Based-Hand-Movements-Predictor",
  },
  {
    title: "Text Generator Using Twitter Data",
    description:
      "A Text Generator Which Is Trained On Twitter Dataset To Predict Next Word or Complete Sentences Based On The Given Input.It Also Perform Sentimenet Analysis On A Given Sentence.",
    link: "https://github.com/Umair-Farooque/Sentiment-Analysis-and-Text-Generator-Using-Twitter-data",
  },
  {
    title: "Real Time Lane Detection",
    description:
      "This project involves detecting lane lines on the road using computer vision techniques. The application is designed to process video or image frames captured from a vehicle's front-facing camera, identifying and highlighting lane markings to assist in safe navigation.",
    link: "https://github.com/Umair-Farooque/Finding_Lane_Lines_on_the_Road",
  },
];

export default function Projects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", resize);
    resize();

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx = -p.dx;
        if (p.y < 0 || p.y > canvas.height) p.dy = -p.dy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(59, 130, 246, 0.4)"; // Tailwind blue-500 with opacity
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="projects"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-white overflow-hidden"
    >
      {/* 3D background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      <div className="max-w-5xl w-full text-center">
        <h2 className="text-4xl font-bold mb-12">Projects</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <a
              key={idx}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 border rounded-xl shadow-lg bg-white hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <span className="text-blue-600 font-medium group-hover:underline">
                View Project →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
