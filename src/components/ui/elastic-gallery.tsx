import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, X, Zap } from "lucide-react";
import { motion } from "framer-motion";

export interface ElasticItemProps {
  id: string;
  title: string;
  category: string;
  src: string;
  src2?: string;
  alt: string;
  alt2?: string;
  subtitle: string;
  stack: string[];
  bullets: string[];
  href: string;
  objectPosition?: string;
}

interface ElasticGalleryProps {
  items: ElasticItemProps[];
}

// Animated glow effect component
const GlitchGlowBorder = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <>
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: isHovered
            ? "linear-gradient(45deg, #00ff40, #00ff40, transparent)"
            : "transparent",
          opacity: isHovered ? 0.3 : 0,
          transition: "opacity 300ms ease",
          maskImage: "linear-gradient(90deg, transparent, black, transparent)",
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: isHovered
            ? "linear-gradient(-45deg, #00ff40, #00ff40, transparent)"
            : "transparent",
          opacity: isHovered ? 0.2 : 0,
          transition: "opacity 300ms ease",
          maskImage: "linear-gradient(90deg, transparent, black, transparent)",
        }}
      />
    </>
  );
};

export function ElasticGallery({ items }: ElasticGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<ElasticItemProps | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  // Focus management
  useEffect(() => {
    if (selectedProject && modalRef.current) {
      const closeButton = modalRef.current.querySelector("button[data-close-modal]") as HTMLElement;
      closeButton?.focus();
    }
  }, [selectedProject]);

  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, item: ElasticItemProps) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedProject(item);
    }
  };

  const handleCardInteraction = (itemId: string) => {
    setHoveredId(itemId);
  };

  const handleCardLeave = () => {
    setHoveredId(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const hasTwoImages = !!item.src2;
          const isHovered = hoveredId === item.id;

          return (
            <motion.div
              key={item.id}
              ref={triggerRef}
              role="button"
              tabIndex={0}
              onMouseEnter={() => handleCardInteraction(item.id)}
              onMouseLeave={handleCardLeave}
              onTouchStart={() => handleCardInteraction(item.id)}
              onClick={() => setSelectedProject(item)}
              onKeyDown={(e) => handleCardKeyDown(e, item)}
              aria-label={`View ${item.title} project details`}
              aria-expanded={selectedProject?.id === item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative h-72 cursor-pointer overflow-hidden rounded-xl border border-[#003d00] bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              style={{
                boxShadow: isHovered
                  ? "0 0 30px rgba(0, 255, 64, 0.4), 0 0 60px rgba(0, 255, 64, 0.2), inset 0 0 20px rgba(0, 255, 64, 0.1)"
                  : "0 0 15px rgba(0, 255, 64, 0.15), inset 0 0 10px rgba(0, 255, 64, 0.05)",
                transition: "box-shadow 400ms cubic-bezier(0.23, 1, 0.320, 1)",
              }}
            >
              <div className="absolute inset-0">
                {hasTwoImages ? (
                  <div className="flex h-full w-full flex-col gap-px bg-[#001a00]">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-1/2 w-full object-cover transition-transform duration-700"
                      style={{
                        objectPosition: item.objectPosition ?? "top",
                        transform: isHovered ? "scale(1.1)" : "scale(1)",
                      }}
                    />
                    <img
                      src={item.src2}
                      alt={item.alt2 || item.alt}
                      className="h-1/2 w-full object-cover transition-transform duration-700"
                      style={{
                        objectPosition: item.objectPosition ?? "top",
                        transform: isHovered ? "scale(1.1)" : "scale(1)",
                      }}
                    />
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-700"
                    style={{
                      objectPosition: item.objectPosition ?? "center",
                      transform: isHovered ? "scale(1.1)" : "scale(1)",
                    }}
                  />
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t transition-all duration-500"
                  style={{
                    backgroundImage: isHovered
                      ? "linear-gradient(to top, rgba(0, 0, 0, 0.98), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1))"
                      : "linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1))",
                  }}
                />
              </div>

              {/* Animated glow borders */}
              <GlitchGlowBorder isHovered={isHovered} />

              {/* Category badge with animation */}
              <motion.div
                className="absolute top-3 left-3 z-10"
                initial={{ opacity: 0, x: -20 }}
                animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <span className="inline-block rounded-full border border-[#003d00] bg-black/80 px-3 py-1 font-mono text-xs uppercase tracking-wider text-tertiary backdrop-blur-sm"
                  style={{
                    boxShadow: "0 0 10px rgba(0, 255, 64, 0.2)",
                  }}>
                  {item.category}
                </span>
              </motion.div>

              {/* Tech stack preview on hover */}
              <motion.div
                className="absolute top-3 right-3 z-10"
                initial={{ opacity: 0, x: 20 }}
                animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex gap-1">
                  {item.stack.slice(0, 3).map((tech, idx) => (
                    <div
                      key={idx}
                      className="h-6 w-6 rounded-full border border-[#003d00] bg-black/80 flex items-center justify-center text-[10px] font-bold text-primary"
                      title={tech}
                      style={{
                        boxShadow: "0 0 8px rgba(0, 255, 64, 0.2)",
                      }}
                    >
                      {tech.charAt(0)}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Main content with enhanced styling */}
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                {/* Title at bottom */}
                <div className="flex-1" />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-xl font-black uppercase text-primary drop-shadow-lg line-clamp-2">
                    {item.title}
                  </h3>
                  <motion.p
                    className="text-xs text-muted mt-1 line-clamp-1"
                    initial={{ opacity: 0 }}
                    animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.subtitle.substring(0, 40)}...
                  </motion.p>
                </motion.div>
              </div>

              {/* Interactive hover indicator */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00ff40] via-[#00ff40] to-transparent"
                initial={{ scaleX: 0 }}
                animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.4 }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          );
        })}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
          role="presentation"
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-[#003d00] bg-black"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow:
                "0 0 30px rgba(0, 255, 64, 0.3), 0 0 60px rgba(0, 255, 64, 0.15), inset 0 0 20px rgba(0, 255, 64, 0.1)",
              maxHeight: "90vh",
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              data-close-modal
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-10 rounded-full border border-[#003d00] bg-black/80 p-2 text-primary transition-all hover:bg-primary hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              style={{
                boxShadow: "0 0 10px rgba(0, 255, 64, 0.2)",
              }}
              aria-label="Close project details"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="overflow-y-auto" style={{ maxHeight: "calc(90vh - 4rem)" }}>
              <div className="grid h-72 w-full grid-cols-2 gap-px bg-[#001a00]">
                <img
                  src={selectedProject.src}
                  alt={selectedProject.alt}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: selectedProject.objectPosition ?? "center" }}
                />
                <img
                  src={selectedProject.src2 || selectedProject.src}
                  alt={selectedProject.alt2 || selectedProject.alt}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: selectedProject.objectPosition ?? "center" }}
                />
              </div>

              <div className="space-y-6 p-8">
                <div>
                  <span className="inline-block rounded-full border border-[#003d00] bg-black/50 px-4 py-1.5 font-mono text-sm uppercase tracking-wider text-tertiary">
                    {selectedProject.category}
                  </span>
                  <h2 id="modal-title" className="mt-4 text-4xl font-black uppercase text-primary">
                    {selectedProject.title}
                  </h2>
                  <p className="mt-3 text-lg text-secondary">
                    {selectedProject.subtitle}
                  </p>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-bold uppercase text-primary">
                    Key Features
                  </h3>
                  <ul className="space-y-2.5">
                    {selectedProject.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-base text-secondary">
                        <Zap className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-bold uppercase text-primary">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-[#003d00] bg-black/50 px-3 py-1.5 font-mono text-sm text-primary"
                        style={{
                          boxShadow: "0 0 8px rgba(0, 255, 64, 0.15)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <a
                    href={selectedProject.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2 rounded-full px-6 py-3 font-bold uppercase"
                  >
                    View Project <ArrowUpRight className="h-5 w-5" />
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="btn-ghost rounded-full px-6 py-3 font-bold uppercase"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
