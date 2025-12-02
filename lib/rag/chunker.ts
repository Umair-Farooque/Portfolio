// lib/rag/chunker.ts
import { cvData } from "../cv-data"

export type Chunk = {
  id: string
  text: string
  source: string
  meta?: Record<string, any>
}

function normalizeText(s: string) {
  return s.replace(/\s+/g, " ").trim()
}

export function chunkCV(chunkSize = 500, overlap = 50): Chunk[] {
  const chunks: Chunk[] = []
  let idCounter = 0

  // Utility to chunk a long text
  function chunkText(text: string, source = "cv") {
    const clean = normalizeText(text)
    const tokens = clean.split(" ")
    if (tokens.length <= chunkSize) {
      chunks.push({
        id: `${source}-${idCounter++}`,
        text: clean,
        source,
      })
      return
    }

    let start = 0
    while (start < tokens.length) {
      const end = Math.min(start + chunkSize, tokens.length)
      const piece = tokens.slice(start, end).join(" ")
      chunks.push({ id: `${source}-${idCounter++}`, text: normalizeText(piece), source })
      start = end - overlap
      if (start < 0) start = 0
      if (start >= tokens.length) break
    }
  }

  // Personal info block
  chunkText(
    `PERSONAL: ${cvData.personalInfo.name} ${cvData.personalInfo.location} ${cvData.personalInfo.email} ${cvData.personalInfo.phone} ${cvData.personalInfo.linkedin} ${cvData.personalInfo.github}`,
    "personal",
  )

  // Education
  chunkText(`EDUCATION: ${cvData.education.degree} ${cvData.education.institution} ${cvData.education.year}`, "education")

  // Skills (grouped)
  Object.entries(cvData.skills).forEach(([k, v]) => {
    const vText = Array.isArray(v) ? v.join(", ") : String(v)
    chunkText(`SKILLS: ${k} — ${vText}`, `skills-${k}`)
  })

  // Experience
  cvData.experience.forEach((exp, idx) => {
    chunkText(
      `EXPERIENCE: ${exp.title} at ${exp.company} (${exp.period}). Responsibilities: ${exp.responsibilities.join(
        " ; ",
      )}`,
      `experience-${idx}`,
    )
  })

  // Projects
  cvData.projects.forEach((project, idx) => {
    const features = project.features ? project.features.join(" ; ") : ""
    const achievements = project.achievements ? project.achievements.join(" ; ") : ""
    chunkText(
      `PROJECT: ${project.name}. ${project.description}. Tech Stack: ${project.techStack?.join(", ")}. ${features} ${achievements}`,
      `project-${idx}`,
    )
  })

  return chunks
}
