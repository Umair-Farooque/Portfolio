// RAG Service - Simulated retrieval augmented generation
// In a real implementation, this would connect to a vector database and LLM API

interface CVData {
  [key: string]: string[];
}

const cvKnowledgeBase: CVData = {
  personal: [
    "I am Muhammad Umair Farooq, a Machine Learning Engineer and AI specialist based in Islamabad, Pakistan",
    "I am currently pursuing a Bachelor of Science in Artificial Intelligence from Air University (expected graduation 2025)",
    "I specialize in deep learning, LLMs, RAG systems, and MLOps with hands-on experience in production AI systems",
    "I am passionate about building intelligent AI solutions that solve real-world problems",
    "Contact: +92 308 4624629, farooq.intellecta@gmail.com",
    "GitHub: https://github.com/Umair-Farooque, LinkedIn: https://www.linkedin.com/in/umairfaroq/"
  ],
  experience: [
    "Machine Learning Engineer at Fiverr/Upwork (May 2025 - Current): Developing end-to-end AI systems using OCR, Python automation, and document parsing for credit enrichment and quiz checking",
    "Built and deployed GPT-based educational chatbot using LangChain, Transformers, and Pinecone for dynamic course interaction",
    "Implemented quiz generation, course outline creation, and multi-level learning logic with user progress tracking", 
    "Designed full-stack AI applications with FastAPI and Streamlit, integrating front-end widgets and backend model inference",
    "Machine Learning Intern at ZAA Soft Islamabad (June 2024 - August 2024): Gained foundational understanding of Generative AI concepts and applications",
    "Developed AI applications using Large Language Models (LLMs) including OpenAI models, Transformers, and Hugging Face models",
    "Worked with vector databases including ChromaDB, FAISS, and Pinecone to implement efficient data retrieval systems",
    "Built user interfaces for AI applications using Gradio and Streamlit"
  ],
  skills: [
    "Programming Languages: Python, C++, C",
    "Deep Learning Frameworks: PyTorch, TensorFlow, Keras, Scikit-learn, XGBoost", 
    "MLOps & Deployment: Docker, FastAPI, Flask, Streamlit, Gradio, MLflow",
    "LLM Tools: OpenAI API, RAG systems, LangChain Agents, Transformers (Hugging Face)",
    "Programming Libraries: NumPy, Pandas, OpenCV, LangChain, NLTK, spaCy",
    "Databases: MySQL, SQLite",
    "Vector Databases: ChromaDB, FAISS, Pinecone",
    "Web Frameworks: Gradio, Streamlit, FastAPI, Flask",
    "Cloud & DevOps: AWS (Lambda, SageMaker), CPanel, GitHub",
    "Data Visualization: Matplotlib, Seaborn, Plotly",
    "Tools: Jupyter, VSCode, Google Colab, Airflow, Git"
  ],
  projects: [
    "Neuro-Flex: Neural Flexibility for Limb Control via EMG Signals (Final Year Project): Developed deep learning system to classify 24 hand/wrist movements from EMG signals using NinaPro datasets. Built real-time FastAPI inference server and 3D Blender prosthetic hand simulation. Achieved ~80% test accuracy with LSTM networks.",
    "Credit Enrich System – AI-Powered Creditworthiness Automation: End-to-end automated system for enriching creditor financial profiles using OCR, regex, and Python automation. Integrated Google Sheets automation and improved processing time by 60%.",
    "AI Learning Assistant – Educational Chatbot Platform: GPT-based chatbot trained on course material using LangChain + embedding retrieval. Features quiz generation, OCR answer checking, and dynamic course outline generation with Pinecone embeddings.",
    "Generative AI Applications Suite: Story generation using LLMs, image captioning with Transformers, text-to-image generation with diffusion models, and RAG systems using ChromaDB/FAISS/Pinecone.",
    "Automated Attendance System: Face recognition system using FaceNet, MTCNN, and custom CNN for precise identification and attendance tracking.",
    "Spam Email Classifier: Email filtering system using Naive Bayes algorithm for accurate spam detection.",
    "Twitter Data Analysis: Comprehensive Twitter data analysis using Ntscrapper for trend analysis and sentiment extraction."
  ],
  education: [
    "Bachelor of Science in Artificial Intelligence - Air University, Islamabad, Pakistan (Expected 2025)",
    "Specialized coursework in machine learning, deep learning, computer vision, and natural language processing",
    "Final year project on neural interfaces and EMG signal processing for prosthetic control"
  ],
  achievements: [
    "Successfully built and deployed multiple production-ready AI systems for real-world clients",
    "Achieved 80% accuracy in EMG signal classification for prosthetic limb control",
    "Improved document processing efficiency by 60% through AI automation systems",
    "Gained expertise in cutting-edge AI technologies including LLMs, RAG systems, and vector databases",
    "Built comprehensive AI applications spanning computer vision, NLP, and generative AI domains"
  ]
};

class RAGService {
  private findRelevantContent(query: string): string[] {
    const queryLower = query.toLowerCase();
    const relevantContent: string[] = [];
    
    // Simple keyword matching - in a real implementation, this would use embeddings
    Object.entries(cvKnowledgeBase).forEach(([category, items]) => {
      items.forEach(item => {
        if (this.isRelevant(queryLower, item.toLowerCase(), category)) {
          relevantContent.push(item);
        }
      });
    });
    
    return relevantContent.slice(0, 5); // Limit to top 5 most relevant
  }
  
  private isRelevant(query: string, content: string, category: string): boolean {
    // Check for direct keyword matches
    const keywords = query.split(' ').filter(word => word.length > 2);
    
    for (const keyword of keywords) {
      if (content.includes(keyword) || category.includes(keyword)) {
        return true;
      }
    }
    
    // Check for category-specific queries
    if (query.includes('experience') || query.includes('work') || query.includes('job')) {
      return category === 'experience' || category === 'achievements';
    }
    
    if (query.includes('skill') || query.includes('technology') || query.includes('tech')) {
      return category === 'skills';
    }
    
    if (query.includes('project') || query.includes('build') || query.includes('create')) {
      return category === 'projects';
    }
    
    if (query.includes('education') || query.includes('degree') || query.includes('study')) {
      return category === 'education';
    }
    
    if (query.includes('about') || query.includes('who') || query.includes('background')) {
      return category === 'personal';
    }
    
    return false;
  }
  
  private generateResponse(query: string, relevantContent: string[]): string {
    if (relevantContent.length === 0) {
      return "I don't have specific information about that in my knowledge base. Could you ask about my experience, skills, projects, education, or general background?";
    }
    
    // Create a contextual response based on the query type
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('experience') || queryLower.includes('work')) {
      return `Here's information about my work experience:\n\n${relevantContent.join('\n\n')}`;
    }
    
    if (queryLower.includes('skill') || queryLower.includes('technology')) {
      return `Here are my technical skills and technologies:\n\n${relevantContent.join('\n\n')}`;
    }
    
    if (queryLower.includes('project')) {
      return `Here are some key projects I've worked on:\n\n${relevantContent.join('\n\n')}`;
    }
    
    if (queryLower.includes('education') || queryLower.includes('degree')) {
      return `Here's my educational background:\n\n${relevantContent.join('\n\n')}`;
    }
    
    if (queryLower.includes('about') || queryLower.includes('who')) {
      return `Here's some information about me:\n\n${relevantContent.join('\n\n')}`;
    }
    
    // Default response
    return `Based on your question, here's relevant information:\n\n${relevantContent.join('\n\n')}`;
  }
  
  async query(question: string): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const relevantContent = this.findRelevantContent(question);
    return this.generateResponse(question, relevantContent);
  }
}

export const ragService = new RAGService();
