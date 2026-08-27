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

  return (
    <>
      {/* Project Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedProject(item)}
            className="group relative h-48 w-full overflow-hidden rounded-2xl border border-[#003d00] bg-black transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00ff40] focus:ring-offset-2 focus:ring-offset-black"
            style={{
              boxShadow: "0 0 10px rgba(0, 255, 64, 0.2), inset 0 0 10px rgba(0, 255, 64, 0.05)",
            }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 h-full w-full">
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ objectPosition: item.objectPosition ?? "center" }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 transition-opacity duration-300 group-hover:from-black/95" />
            </div>

            {/* Project Name */}
            <div className="absolute inset-0 flex items-end justify-start p-5">
              <h3 className="text-2xl font-black uppercase leading-tight text-[#00ff40] drop-shadow-lg">
                {item.title}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {/* Modal Popup */}
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
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-10 rounded-full border border-[#003d00] bg-black/80 p-2 text-[#00ff40] transition-all hover:bg-[#00ff40] hover:text-black focus:outline-none"
              style={{
                boxShadow: "0 0 10px rgba(0, 255, 64, 0.2)",
              }}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Project Images */}
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

              {/* Project Details */}
              <div className="space-y-6 p-8">
                {/* Header */}
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

                {/* Description/Bullets */}
                <div>
                  <h3 className="mb-4 text-xl font-bold uppercase text-[#00ff40]">
                    Key Features
                  </h3>
                  <ul className="space-y-2.5">
                    {selectedProject.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-base text-[#d4c8e8]">
                        <span className="shrink-0 text-[#00ff40]">▪</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
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

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <a
                    href={selectedProject.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-[#00ff40] bg-[#00ff40] px-6 py-3 font-bold uppercase text-black transition-all hover:bg-[#33ff66] focus:outline-none focus:ring-2 focus:ring-[#00ff40] focus:ring-offset-2 focus:ring-offset-black"
                    style={{
                      boxShadow: "0 0 15px rgba(0, 255, 64, 0.4)",
                    }}
                  >
                    View Project <ArrowUpRight className="h-5 w-5" />
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full border border-[#003d00] bg-black px-6 py-3 font-bold uppercase text-[#00ff40] transition-all hover:bg-[#003d00] focus:outline-none focus:ring-2 focus:ring-[#00ff40] focus:ring-offset-2 focus:ring-offset-black"
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

