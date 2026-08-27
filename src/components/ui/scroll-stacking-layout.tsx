"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import ReactLenis from "lenis/react"
import { ReactNode, useRef } from "react"

interface StackingSectionProps {
  children: ReactNode
  index: number
  totalSections: number
}

const StackingSection = ({ children, index, totalSections }: StackingSectionProps) => {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  })

  const targetScale = Math.max(0.85, 1 - (totalSections - index - 1) * 0.05)
  const scale = useTransform(scrollYProgress, [0, 1], [targetScale, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.8, 1])
  const y = useTransform(scrollYProgress, [0, 1], [100, 0])

  return (
    <div
      ref={container}
      className="sticky top-0 h-screen flex items-center justify-center"
      style={{
        zIndex: totalSections - index,
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          y,
        }}
        className="w-full h-full flex items-center justify-center rounded-3xl overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  )
}

interface ScrollStackingLayoutProps {
  sections: ReactNode[]
  children?: ReactNode
}

export function ScrollStackingLayout({ sections }: ScrollStackingLayoutProps) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <main className="relative w-full bg-black">
        {sections.map((section, index) => (
          <StackingSection
            key={`section-${index}`}
            index={index}
            totalSections={sections.length}
          >
            {section}
          </StackingSection>
        ))}
        <div className="h-screen" />
      </main>
    </ReactLenis>
  )
}
