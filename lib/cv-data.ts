export const cvData = {
  personalInfo: {
    name: "Muhammad Umair Farooq",
    location: "Islamabad, Pakistan",
    phone: "+92 308 4624629",
    email: "farooq.intellecta@gmail.com",
    linkedin: "https://www.linkedin.com/in/umairfaroq/",
    github: "https://github.com/Umair-Farooque",
  },
  education: {
    degree: "Bachelor of Science: Artificial Intelligence",
    year: "2025",
    institution: "Air University – Islamabad, Pakistan",
  },
  skills: {
    programmingLanguages: ["Python", "C++", "C"],
    deepLearning: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "XGBoost"],
    mlops: ["Docker", "FastAPI", "Flask", "Streamlit", "Gradio", "MLflow"],
    llmTools: ["OpenAI API", "RAG systems", "LangChain Agents"],
    libraries: ["NumPy", "Pandas", "OpenCV", "Transformers (Hugging Face)", "LangChain", "NLTK", "spaCy"],
    databases: ["MySQL", "SQLite"],
    vectorDatabases: ["ChromaDB", "FAISS", "Pinecone"],
    webFrameworks: ["Gradio", "Streamlit"],
    cloud: ["AWS (Lambda, SageMaker)", "CPanel", "GitHub"],
    tools: ["Git", "GitHub", "Jupyter", "VSCode", "Google Colab", "Airflow"],
    visualization: ["Matplotlib", "Seaborn", "Plotly"],
  },
  experience: [
    {
      title: "Machine Learning Engineer",
      company: "Fiverr/Upwork",
      period: "May 2025 - Current",
      responsibilities: [
        "Developed end-to-end AI systems using OCR, Python automation, and document parsing for credit enrichment and quiz checking",
        "Built and deployed a GPT-based educational chatbot using LangChain, Transformers, and Pinecone for dynamic course interaction",
        "Implemented quiz generation, course outline creation, and multi-level learning logic with user progress tracking",
        "Designed full-stack AI applications with FastAPI and Streamlit, integrating front-end widgets and backend model inference",
        "Gained hands-on experience with vector databases, RAG pipelines, prompt engineering, and API integrations in real-world projects",
      ],
    },
    {
      title: "Machine Learning Intern",
      company: "ZAA Soft Islamabad",
      period: "June 2024 - August 2024",
      responsibilities: [
        "Gained foundational understanding of Generative AI concepts and applications",
        "Developed AI applications using Large Language Models (LLMs) using OpenAI models, Transformers, and Hugging Face models",
        "Worked with vector databases including ChromaDB, FAISS, and Pinecone to implement efficient data retrieval systems",
        "Built user interfaces (UI) for AI applications using Gradio and Streamlit",
        "Created various AI-driven applications including story generation tools, image captioning models, text-to-image generation systems, and RAG systems",
      ],
    },
  ],
  projects: [
    {
      name: "Neuro-Flex: Neural Flexibility for Limb Control via EMG Signals",
      type: "Final Year Project",
      description:
        "Developed a deep learning-based system to classify 24 hand and wrist movements from EMG signals using the NinaPro DB1 & DB5 datasets",
      achievements: [
        "Built and deployed a real-time FastAPI inference server to predict movement labels from incoming EMG data",
        "Created a 3D prosthetic hand simulation in Blender, animating predicted motions using Python scripting",
        "Achieved ~80% test accuracy and integrated the system into a real-time visualization pipeline via ngrok",
      ],
      techStack: ["Python", "PyTorch", "FastAPI", "Blender", "ngrok", "LSTM", "JSON"],
    },
    {
      name: "Credit Enrich System – AI-Powered Creditworthiness Automation",
      description:
        "Developed an end-to-end automated system for enriching creditor financial profiles using AI and document parsing",
      achievements: [
        "Integrated OCR pipelines and regex logic to extract financial fields from scanned documents",
        "Automated data entry into Google Sheets using gspread and UI automation (PyAutoGUI)",
        "Cleaned, validated, and structured data for downstream creditworthiness prediction models",
        "Improved processing time by over 60% compared to manual workflows",
      ],
      techStack: ["Python", "OCR", "NumPy", "Pandas", "gspread", "PyAutoGUI", "Regex"],
    },
    {
      name: "AI Learning Assistant – Educational Chatbot Platform",
      description: "Built a GPT-based AI chatbot trained on course material using LangChain + embedding retrieval",
      achievements: [
        "Designed a quiz generation engine using NER and summarization techniques from Hugging Face Transformers",
        "Implemented quiz checking tool with and without OCR support for scanned answer sheets",
        "Created dynamic course outline generation using LLMs and custom prompt templates",
        "Enabled learning-by-levels and progress tracking via persistent user session states",
        "Integrated the AI assistant into a web widget frontend using Streamlit and FastAPI backend",
        "Deployed embeddings in Pinecone for efficient retrieval across different learning modules",
      ],
      techStack: ["LangChain", "Transformers", "OCR", "FastAPI", "Streamlit", "Pinecone"],
    },
    {
      name: "Generative AI Applications Suite",
      description: "Crafted an extensive suite for Generative AI Applications utilizing state-of-the-art technologies",
      features: [
        "Story Generation Tool: Developed a system that generates creative stories using Large Language Models (LLMs)",
        "Image Captioning Model: Implemented an advanced image captioning model to generate descriptive captions for images",
        "Text-to-Image Generation System: Created a powerful tool that converts textual descriptions into images",
        "RAG System: Engineered a system that combines traditional information retrieval with generative models",
      ],
      techStack: ["OpenAI", "Hugging Face Transformers", "ChromaDB", "FAISS", "Pinecone", "CLIP"],
    },
    {
      name: "Automated Attendance System Using Face Recognition",
      description:
        "Crafted an Automated Attendance System using Face Recognition, powered by cutting-edge technologies like FaceNet, MTCNN, and a custom CNN",
      achievements: [
        "Achieved precise identification and seamless attendance tracking, revolutionizing traditional methods with efficient, accurate automation",
      ],
      techStack: ["FaceNet", "MTCNN", "CNN", "OpenCV"],
    },
    {
      name: "Spam Email Classifier",
      description: "Created a Spam Email Classifier utilizing the Naive Bayes algorithm",
      achievements: [
        "Engineered a robust solution capable of accurately distinguishing between spam and legitimate emails",
      ],
      techStack: ["Naive Bayes", "Python", "NLTK"],
    },
    {
      name: "Twitter Data Analysis",
      description:
        "Embark on a journey of Twitter Data Analysis, where we delve into the world of tweets using Ntscrapper",
      achievements: [
        "Unveil insights as we explore, clean, and preprocess the data, uncovering trends, sentiments, and patterns",
      ],
      techStack: ["Python", "Ntscrapper", "Data Analysis", "Sentiment Analysis"],
    },
  ],
}
