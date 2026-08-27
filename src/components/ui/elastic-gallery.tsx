import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id || null);

  return (
    <div className="w-full">
      <div className="flex h-[550px] w-full flex-col gap-2.5 md:h-[480px] md:flex-row md:gap-3.5">
        {items.map((item) => {
          const hasTwoImages = !!item.src2;
          return (
            <div
              key={item.id}
              onMouseEnter={() => setActiveId(item.id)}
              onClick={() => setActiveId(item.id)}
              className={cn(
                "relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950",
                "transition-[flex,filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                activeId === item.id ? "flex-[4.5]" : "flex-[1]",
                activeId === item.id
                  ? "brightness-100"
                  : "brightness-40 hover:brightness-60"
              )}
            >
              {/* Background Image Layer */}
              <div className="absolute inset-0 h-full w-full">
                {hasTwoImages ? (
                  <div className="flex h-full w-full flex-col gap-px bg-zinc-900">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className={cn(
                        "h-1/2 w-full object-cover transition-transform duration-1000",
                        activeId === item.id ? "scale-100" : "scale-105"
                      )}
                      style={{ objectPosition: item.objectPosition ?? 'top' }}
                    />
                    <img
                      src={item.src2}
                      alt={item.alt}
                      className={cn(
                        "h-1/2 w-full object-cover transition-transform duration-1000",
                        activeId === item.id ? "scale-100" : "scale-105"
                      )}
                      style={{ objectPosition: item.objectPosition ?? 'top' }}
                    />
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className={cn(
                      "h-full w-full object-cover transition-transform duration-1000",
                      activeId === item.id ? "scale-100" : "scale-105"
                    )}
                    style={{ objectPosition: item.objectPosition ?? 'center' }}
                  />
                )}
                {/* Gradient Overlay */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/10 transition-opacity duration-500",
                    activeId === item.id ? "opacity-100" : "opacity-80"
                  )}
                />
              </div>

              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
                <div
                  className={cn(
                    "flex flex-col gap-1.5 transition-all duration-500",
                    activeId === item.id
                      ? "translate-y-0 opacity-100 delay-150"
                      : "translate-y-12 opacity-0 pointer-events-none"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-white/20 bg-white/5 px-2 py-0.5 text-[8.5px] font-mono uppercase tracking-wider text-zinc-300 backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-black uppercase leading-tight text-white md:text-2xl">
                    {item.title}
                  </h3>

                  <p className="text-[10px] leading-relaxed text-zinc-300 line-clamp-2">
                    {item.subtitle}
                  </p>

                  <ul className="mt-1 space-y-1">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-1.5 text-xs leading-snug text-zinc-200">
                        <span className="mt-0.5 shrink-0 text-zinc-500">—</span>
                        <span className="line-clamp-2">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-1 flex flex-wrap gap-1">
                    {item.stack.map((tag) => (
                      <span key={tag} className="rounded border border-zinc-700 bg-zinc-900/50 px-1 py-0.5 font-mono text-[8px] text-zinc-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#00ff40] hover:text-[#33ff66] transition-colors"
                  >
                    View Project <ArrowUpRight className="h-2.5 w-2.5" />
                  </a>
                </div>

                {/* Vertical label for inactive desktop state / Short label for mobile */}
                <div
                  className={cn(
                    "absolute transition-all duration-500",
                    "bottom-4 left-1/2 -translate-x-1/2 md:bottom-5",
                    activeId === item.id
                      ? "opacity-0 scale-50 pointer-events-none"
                      : "opacity-100 delay-250"
                  )}
                >
                  <span className="hidden whitespace-nowrap text-[11px] font-bold uppercase tracking-widest text-zinc-400 [writing-mode:vertical-rl] md:block rotate-180">
                    {item.title}
                  </span>
                  <span className="block text-xs font-bold text-zinc-400 md:hidden whitespace-nowrap">
                    {item.title.split(' ')[0]}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

