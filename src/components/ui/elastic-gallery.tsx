import { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

export interface ElasticItemProps {
  id: string;
  title: string;
  category: string;
  src: string;
  src2?: string;
  alt: string;
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
              onMouseEnter={() => handleCardInteraction(item.id)}
              onMouseLeave={handleCardLeave}
              onTouchStart={() => handleCardInteraction(item.id)}
              onClick={() => setSelectedProject(item)}
              className="group relative h-64 cursor-pointer overflow-hidden rounded-2xl border border-[#003d00] bg-black transition-all duration-500"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                boxShadow: "0 0 10px rgba(0, 255, 64, 0.2), inset 0 0 10px rgba(0, 255, 64, 0.05)",
              }}
            >
              <div className="absolute inset-0">
                {hasTwoImages ? (
                  <div className="flex h-full w-full flex-col gap-px bg-[#003d00]">
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
                      alt={item.alt}
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
                <h3 className="text-xl font-black uppercase text-[#00ff40] drop-shadow-lg">
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
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border border-[#003d00] bg-black"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow:
                "0 0 30px rgba(0, 255, 64, 0.3), 0 0 60px rgba(0, 255, 64, 0.15), inset 0 0 20px rgba(0, 255, 64, 0.1)",
            }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-10 rounded-full border border-[#003d00] bg-black/80 p-2 text-[#00ff40] transition-all hover:bg-[#00ff40] hover:text-black"
              style={{
                boxShadow: "0 0 10px rgba(0, 255, 64, 0.2)",
              }}
            >
              <X className="h-6 w-6" />
            </button>

            <div className="overflow-y-auto max-h-[90vh]">
              <div className="grid h-72 w-full grid-cols-2 gap-px bg-[#003d00]">
                <img
                  src={selectedProject.src}
                  alt={selectedProject.alt}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: selectedProject.objectPosition ?? "center" }}
                />
                <img
                  src={selectedProject.src2 || selectedProject.src}
                  alt={selectedProject.alt}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: selectedProject.objectPosition ?? "center" }}
                />
              </div>

              <div className="space-y-6 p-8">
                <div>
                  <span className="inline-block rounded-full border border-[#003d00] bg-black px-4 py-1.5 font-mono text-sm uppercase tracking-wider text-[#008f11]">
                    {selectedProject.category}
                  </span>
                  <h2 className="mt-4 text-4xl font-black uppercase text-[#00ff40]">
                    {selectedProject.title}
                  </h2>
                  <p className="mt-3 text-lg text-[#d4c8e8]">
                    {selectedProject.subtitle}
                  </p>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-bold uppercase text-[#00ff40]">
                    Key Features
                  </h3>
                  <ul className="space-y-2.5">
                    {selectedProject.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-base text-[#d4c8e8]">
                        <span className="shrink-0 text-[#00ff40]">?</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-bold uppercase text-[#00ff40]">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-[#003d00] bg-black/50 px-3 py-1.5 font-mono text-sm text-[#00ff40]"
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
                    className="flex items-center gap-2 rounded-full border border-[#00ff40] bg-[#00ff40] px-6 py-3 font-bold uppercase text-black transition-all hover:bg-[#33ff66]"
                    style={{
                      boxShadow: "0 0 15px rgba(0, 255, 64, 0.4)",
                    }}
                  >
                    View Project <ArrowUpRight className="h-5 w-5" />
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full border border-[#003d00] bg-black px-6 py-3 font-bold uppercase text-[#00ff40] transition-all hover:bg-[#003d00]"
                    style={{
                      boxShadow: "0 0 10px rgba(0, 255, 64, 0.2)",
                    }}
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
