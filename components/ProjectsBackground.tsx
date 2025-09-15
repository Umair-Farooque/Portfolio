"use client";

export function ProjectsBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      {/* Example floating glowing spheres */}
      <div className="absolute w-40 h-40 bg-cyan-500 rounded-full blur-3xl opacity-30 animate-pulse top-10 left-1/4"></div>
      <div className="absolute w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-25 animate-pulse top-1/3 right-1/3"></div>
      <div className="absolute w-48 h-48 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse bottom-20 left-1/2"></div>
      <div className="absolute w-24 h-24 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse bottom-10 right-1/4"></div>
    </div>
  );
}
