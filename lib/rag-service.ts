import { cvData } from "./cv-data"

interface SearchResult {
  content: string
  relevance: number
  source: string
}

export class RAGService {
  private static instance: RAGService

  static getInstance(): RAGService {
    if (!RAGService.instance) {
      RAGService.instance = new RAGService()
    }
    return RAGService.instance
  }

  // Simple keyword-based search with semantic understanding
  searchCV(query: string): SearchResult[] {
    const results: SearchResult[] = []
    const queryLower = query.toLowerCase()

    // Search in skills
    if (this.matchesQuery(queryLower, ["skill", "technology", "programming", "language", "framework", "tool"])) {
      const skillCategories = Object.entries(cvData.skills)
      skillCategories.forEach(([category, skills]) => {
        if (Array.isArray(skills)) {
          const matchingSkills = skills.filter(
            (skill) => skill.toLowerCase().includes(queryLower) || queryLower.includes(skill.toLowerCase()),
          )
          if (matchingSkills.length > 0 || this.categoryMatches(queryLower, category)) {
            results.push({
              content: `${category.replace(/([A-Z])/g, " $1").toLowerCase()}: ${skills.join(", ")}`,
              relevance: matchingSkills.length > 0 ? 0.9 : 0.7,
              source: "skills",
            })
          }
        }
      })
    }

    // Search in projects
    cvData.projects.forEach((project) => {
      let relevance = 0
      const projectText =
        `${project.name} ${project.description} ${project.techStack?.join(" ")} ${project.achievements?.join(" ") || project.features?.join(" ") || ""}`.toLowerCase()

      if (projectText.includes(queryLower)) {
        relevance = 0.8
      } else if (this.hasCommonWords(queryLower, projectText)) {
        relevance = 0.6
      }

      if (relevance > 0) {
        results.push({
          content: `Project: ${project.name}\nDescription: ${project.description}\nTech Stack: ${project.techStack?.join(", ")}\nKey Achievements: ${project.achievements?.join("; ") || project.features?.join("; ") || "N/A"}`,
          relevance,
          source: "projects",
        })
      }
    })

    // Search in experience
    cvData.experience.forEach((exp) => {
      const expText = `${exp.title} ${exp.company} ${exp.responsibilities.join(" ")}`.toLowerCase()
      let relevance = 0

      if (expText.includes(queryLower)) {
        relevance = 0.8
      } else if (this.hasCommonWords(queryLower, expText)) {
        relevance = 0.6
      }

      if (relevance > 0) {
        results.push({
          content: `Experience: ${exp.title} at ${exp.company} (${exp.period})\nResponsibilities: ${exp.responsibilities.join("; ")}`,
          relevance,
          source: "experience",
        })
      }
    })

    // Search in education and personal info
    if (
      this.matchesQuery(queryLower, [
        "education",
        "degree",
        "university",
        "study",
        "contact",
        "email",
        "phone",
        "location",
      ])
    ) {
      results.push({
        content: `Education: ${cvData.education.degree} from ${cvData.education.institution} (${cvData.education.year})\nContact: ${cvData.personalInfo.email} | ${cvData.personalInfo.phone} | ${cvData.personalInfo.location}`,
        relevance: 0.7,
        source: "personal",
      })
    }

    return results.sort((a, b) => b.relevance - a.relevance).slice(0, 3)
  }

  private matchesQuery(query: string, keywords: string[]): boolean {
    return keywords.some((keyword) => query.includes(keyword))
  }

  private categoryMatches(query: string, category: string): boolean {
    const categoryMappings: { [key: string]: string[] } = {
      programmingLanguages: ["programming", "language", "code"],
      deepLearning: ["deep learning", "ml", "machine learning", "ai", "neural"],
      mlops: ["mlops", "deployment", "devops"],
      llmTools: ["llm", "language model", "gpt", "openai"],
      vectorDatabases: ["vector", "database", "embedding"],
      cloud: ["cloud", "aws", "deployment"],
    }

    const mappings = categoryMappings[category] || []
    return mappings.some((mapping) => query.includes(mapping))
  }

  private hasCommonWords(query: string, text: string): boolean {
    const queryWords = query.split(" ").filter((word) => word.length > 2)
    const textWords = text.split(" ")
    const commonWords = queryWords.filter((word) => textWords.some((textWord) => textWord.includes(word)))
    return commonWords.length >= Math.min(2, queryWords.length)
  }

  generateResponse(query: string): string {
    const searchResults = this.searchCV(query)

    if (searchResults.length === 0) {
      return "I'd be happy to help you learn more about Muhammad Umair's background! You can ask me about his technical skills, exciting projects he's worked on, professional experience, or educational background. Feel free to ask questions like 'What AI technologies does he work with?' or 'Tell me about his machine learning projects.'"
    }

    // Generate contextual response based on query type
    const queryLower = query.toLowerCase()
    let response = ""

    if (this.matchesQuery(queryLower, ["skill", "technology", "programming", "know", "experience with"])) {
      response = "Great question! Here are Muhammad Umair's technical skills and expertise:\n\n"
    } else if (this.matchesQuery(queryLower, ["project", "built", "developed", "work"])) {
      response = "Excellent! Let me tell you about some of the impressive projects Muhammad Umair has worked on:\n\n"
    } else if (this.matchesQuery(queryLower, ["experience", "job", "work", "career"])) {
      response = "Here's an overview of Muhammad Umair's professional journey:\n\n"
    } else if (this.matchesQuery(queryLower, ["education", "study", "degree", "university"])) {
      response = "Here's information about Muhammad Umair's educational background:\n\n"
    } else if (this.matchesQuery(queryLower, ["contact", "reach", "email", "phone"])) {
      response = "Here's how you can get in touch with Muhammad Umair:\n\n"
    } else {
      response = "Here's what I found that might interest you:\n\n"
    }

    searchResults.forEach((result, index) => {
      response += `${result.content}\n\n`
    })

    if (this.matchesQuery(queryLower, ["skill", "technology"])) {
      response +=
        "💡 Want to dive deeper? Feel free to ask about specific technologies like 'What's his experience with RAG systems?', 'Tell me about his LangChain work', or 'What deep learning frameworks does he use?'"
    } else if (this.matchesQuery(queryLower, ["project"])) {
      response +=
        "💡 Interested in learning more? Ask me about specific projects like 'Tell me about Neuro-Flex', 'What's the AI Learning Assistant?', or 'How does the Credit Enrich System work?'"
    } else if (this.matchesQuery(queryLower, ["experience"])) {
      response +=
        "💡 Want to know more about his work? Ask about his role as a 'Machine Learning Engineer' or his experience with 'Generative AI applications'!"
    }

    return response
  }

  generateCVContent(): string {
    return `MUHAMMAD UMAIR FAROOQ

${cvData.personalInfo.location} ♦ ${cvData.personalInfo.phone} ♦ ${cvData.personalInfo.email}

PROFILES
LinkedIn: ${cvData.personalInfo.linkedin}
GitHub: ${cvData.personalInfo.github}

EDUCATION
${cvData.education.degree}, ${cvData.education.year}
${cvData.education.institution}

KEY SKILLS
• Programming Languages: ${cvData.skills.programmingLanguages.join(", ")}
• Deep Learning Frameworks: ${cvData.skills.deepLearning.join(", ")}
• MLOps & Deployment: ${cvData.skills.mlops.join(", ")}
• LLM Tools: ${cvData.skills.llmTools.join(", ")}
• Programming Libraries: ${cvData.skills.libraries.join(", ")}
• Databases: ${cvData.skills.databases.join(", ")}
• Vector Databases: ${cvData.skills.vectorDatabases.join(", ")}
• Web Frameworks and UI Tools: ${cvData.skills.webFrameworks.join(", ")}
• Cloud & DevOps Platforms: ${cvData.skills.cloud.join(", ")}
• Configuration Management: ${cvData.skills.tools.filter((tool) => tool.includes("Git")).join(", ")}
• Data Visualization: ${cvData.skills.visualization.join(", ")}
• Other Relevant Tools: ${cvData.skills.tools.join(", ")}

WORK HISTORY
${cvData.experience
  .map(
    (exp) => `
${exp.title} ${exp.period}
${exp.company}
${exp.responsibilities.map((resp) => `• ${resp}`).join("\n")}
`,
  )
  .join("\n")}

PROJECTS
${cvData.projects
  .map(
    (project) => `
${project.name}
${project.type ? `${project.type} | ` : ""}${project.description}
${project.achievements ? project.achievements.map((ach) => `• ${ach}`).join("\n") : ""}
${project.features ? project.features.map((feat) => `• ${feat}`).join("\n") : ""}
Tech Stack: ${project.techStack?.join(", ") || "N/A"}
`,
  )
  .join("\n")}`
  }
}
