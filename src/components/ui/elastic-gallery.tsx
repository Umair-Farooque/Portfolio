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

// Utility function to merge classnames
const cn = (...classes: (string | undefined | boolean)[]) => {
  return classes.filter(Boolean).join(" ");
};

export function ElasticGallery({ items }: ElasticGalleryProps) {
  const [activeId, setActiveId] = useState<string | null>(items[2]?.id || items[0]?.id);
  const [selectedProject, setSelectedProject] = useState<ElasticItemProps | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
      if (e.key === "Escape" && activeId) {
        setActiveId(null);
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
  }, [selectedProject, activeId]);

  // Focus management
  useEffect(() => {
    if (selectedProject && modalRef.current) {
      const closeButton = modalRef.current.querySelector("button[data-close-modal]") as HTMLElement;
      closeButton?.focus();
    }
  }, [selectedProject]);

  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, itemId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveId(itemId);
    }
  };

  const openModal = (item: ElasticItemProps) => {
    setSelectedProject(item);
  };

  return (
    <>
      {/* Accordion Gallery */}
      <div className="w-full py-12 dark:bg-black md:py-24">
        {/* Container: Fixed height with horizontal flex layout */}
        <div className="mx-auto flex h-[500px] w-full max-w-7xl flex-row gap-3 px-4 md:h-[700px] md:gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onMouseEnter={() => setActiveId(item.id)}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(e) => handleCardKeyDown(e, item.id)}
              aria-label={`View ${item.title} project`}
              aria-expanded={activeId === item.id}
              className={cn(
                "relative cursor-pointer overflow-hidden rounded-xl border border-[#003d00] bg-black",
                // Layout & Flex Transition with smooth easing
                "transition-[flex,filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                // Flex Logic: Active takes more space, inactive compressed
                activeId === item.id ? "flex-[4]" : "flex-[1]",
                // Brightness for visual feedback
                activeId === item.id
                  ? "brightness-100"
                  : "brightness-50 hover:brightness-75",
                // Focus indicator
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              )}
              style={{
                // Cyberpunk glow effect
                boxShadow: activeId === item.id
                  ? "0 0 30px rgba(0, 255, 64, 0.4), 0 0 60px rgba(0, 255, 64, 0.2), inset 0 0 20px rgba(0, 255, 64, 0.1)"
                  : "0 0 15px rgba(0, 255, 64, 0.15), inset 0 0 10px rgba(0, 255, 64, 0.05)",
                transition: "box-shadow 700ms ease-[cubic-bezier(0.25,1,0.5,1)]",
              }}
            >
              {/* Background Image Layer */}
              <div className="absolute inset-0 h-full w-full overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className={cn(
                    "h-full w-full object-cover transition-transform duration-1000",
                    // Subtle zoom on active
                    activeId === item.id ? "scale-100" : "scale-110"
                  )}
                  style={{ objectPosition: item.objectPosition ?? "center" }}
                />
                {/* Gradient Overlay for Text Readability - appears on active */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500",
                    activeId === item.id ? "opacity-100" : "opacity-0"
                  )}
                />
              </div>

              {/* Content Container */}
              <div className="absolute bottom-0 left-0 right-0 flex h-full flex-col justify-end p-4 md:p-8">
                {/* Active Content: Category, Title & Buttons */}
                <div
                  className={cn(
                    "flex flex-col gap-2 transition-all duration-500",
                    activeId === item.id
                      ? "translate-y-0 opacity-100 delay-200"
                      : "translate-y-12 opacity-0"
                  )}
                >
                  {/* Category Tag with Cyberpunk Style */}
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-[#00ff40]/30 bg-black/50 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-tertiary backdrop-blur-md md:px-3 md:text-xs"
                      style={{
                        boxShadow: "0 0 10px rgba(0, 255, 64, 0.2)",
                      }}>
                      {item.category}
                    </span>
                    {/* Tech stack badges */}
                    <div className="flex gap-1">
                      {item.stack.slice(0, 2).map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[8px] font-bold uppercase tracking-wider text-[#00ff40]/70 md:text-[9px]"
                          title={tech}
                        >
                          {tech.split(" ")[0]}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black uppercase leading-tight text-primary drop-shadow-lg md:text-5xl line-clamp-3">
                    {item.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs text-secondary/80 line-clamp-2 md:text-sm md:line-clamp-3">
                    {item.subtitle}
                  </p>

                  {/* Call to Action Buttons */}
                  <div className="mt-2 flex flex-wrap gap-2 md:mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(item);
                      }}
                      className="btn-primary flex items-center gap-2 rounded-full px-4 py-2 font-bold uppercase text-sm md:text-base"
                    >
                      View Details <ArrowUpRight className="h-4 w-4" />
                    </button>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="btn-ghost flex items-center gap-2 rounded-full px-4 py-2 font-bold uppercase text-sm md:text-base"
                    >
                      Live Project <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* Inactive Content: Vertical Text (Desktop) / ID (Mobile) */}
                <div
                  className={cn(
                    "absolute transition-all duration-500",
                    "bottom-4 left-1/2 -translate-x-1/2 md:bottom-8",
                    activeId === item.id
                      ? "opacity-0 scale-50"
                      : "opacity-100 delay-500"
                  )}
                >
                  {/* Desktop: Vertical Text */}
                  <span className="hidden whitespace-nowrap text-lg font-bold uppercase tracking-widest text-primary/40 [writing-mode:vertical-rl] md:block drop-shadow-lg">
                    {item.title}
                  </span>

                  {/* Mobile: ID Badge */}
                  <span className="block text-sm font-bold text-primary/60 md:hidden drop-shadow-lg">
                    {item.id}
                  </span>
                </div>
              </div>

              {/* Bottom accent line when active */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00ff40] via-[#00ff40] to-transparent transition-all duration-700",
                  activeId === item.id ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                )}
                style={{ transformOrigin: "left" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for full project details */}
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
