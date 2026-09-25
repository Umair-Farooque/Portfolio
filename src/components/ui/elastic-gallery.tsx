import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, X, Zap } from "lucide-react";

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const hasTwoImages = !!item.src2;
          const isHovered = hoveredId === item.id;

          return (
            <div
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
              className="group relative h-64 cursor-pointer overflow-hidden rounded-2xl border border-[#003d00] bg-black transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                boxShadow: "0 0 10px rgba(0, 255, 64, 0.2), inset 0 0 10px rgba(0, 255, 64, 0.05)",
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

              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <h3 className="text-xl font-black uppercase text-primary drop-shadow-lg">
                  {item.title}
                </h3>
              </div>
            </div>
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
