import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Palette, Database, Brain } from "lucide-react"

export const About = () => {
  const expertise = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description: "Deep Learning, LLMs, Computer Vision",
      skills: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "XGBoost"],
    },
    {
      icon: Code,
      title: "Programming & Development",
      description: "Python, C++, MLOps, API Development",
      skills: ["Python", "C++", "FastAPI", "Flask", "Streamlit", "Gradio"],
    },
    {
      icon: Database,
      title: "Data & Databases",
      description: "Vector DBs, SQL, Data Processing",
      skills: ["ChromaDB", "FAISS", "Pinecone", "MySQL", "Pandas", "NumPy"],
    },
    {
      icon: Palette,
      title: "LLM & NLP Tools",
      description: "Large Language Models & Natural Language Processing",
      skills: ["OpenAI API", "LangChain", "Transformers", "NLTK", "spaCy"],
    },
  ]

  return (
    <section className="py-20 relative bg-black overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rotate-45 animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 border border-white/20 rounded-full animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-16 h-16 bg-white/5 rotate-12 animate-spin"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-20 h-20 border-2 border-white/15 transform rotate-45 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-28 h-28 border border-white/10 rounded-full animate-ping"
          style={{ animationDuration: "4s" }}
        ></div>
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse"></div>
        <div
          className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Actual content */}
      <div className="container px-4 mx-auto font-mono relative z-10">
        <div className="text-center mb-16 font-mono">
          <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-8 mb-8 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">About Me</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              I'm a passionate AI Engineer with expertise in deep learning, LLMs, and MLOps. I have done my Bachelor's in AI from Air University, with hands-on experience in building production-ready AI systems.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {expertise.map((area, index) => (
            <Card
              key={index}
              className="backdrop-blur-xl bg-white/5 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 shadow-2xl group hover:shadow-white/10 rounded-2xl overflow-hidden"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-4 bg-white/10 rounded-full group-hover:bg-white/20 transition-all duration-300 border border-white/30 group-hover:shadow-lg group-hover:shadow-white/25">
                    <area.icon className="h-8 w-8 text-white group-hover:text-gray-200 transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-200 group-hover:text-white transition-colors duration-300">
                  {area.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 mb-4 text-sm transition-colors duration-300">
                  {area.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {area.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-xs bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20 hover:text-white hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
