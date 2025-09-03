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
      return "I couldn't find specific information about that in the CV. Could you try asking about skills, projects, experience, or education? For example: 'What programming languages does he know?' or 'Tell me about his AI projects.'"
    }

    // Generate contextual response based on query type
    const queryLower = query.toLowerCase()
    let response = ""

    if (this.matchesQuery(queryLower, ["skill", "technology", "programming", "know", "experience with"])) {
      response = "Based on the CV, here are the relevant skills and technologies:\n\n"
    } else if (this.matchesQuery(queryLower, ["project", "built", "developed", "work"])) {
      response = "Here are the relevant projects from the portfolio:\n\n"
    } else if (this.matchesQuery(queryLower, ["experience", "job", "work", "career"])) {
      response = "Here's the professional experience:\n\n"
    } else if (this.matchesQuery(queryLower, ["education", "study", "degree", "university"])) {
      response = "Educational background:\n\n"
    } else {
      response = "Here's what I found relevant to your question:\n\n"
    }

    searchResults.forEach((result, index) => {
      response += `${result.content}\n\n`
    })

    // Add contextual suggestions
    if (this.matchesQuery(queryLower, ["skill", "technology"])) {
      response +=
        "💡 You can also ask about specific technologies like 'RAG systems', 'LangChain', or 'PyTorch' for more details!"
    } else if (this.matchesQuery(queryLower, ["project"])) {
      response +=
        "💡 Want to know more? Ask about specific projects like 'Neuro-Flex', 'AI Learning Assistant', or 'Credit Enrich System'!"
    }

    return response
  }
}
