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
    <section className="py-20 relative">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <div className="backdrop-blur-xl bg-white/5 border border-cyan-400/20 rounded-3xl p-8 mb-8 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              I'm a passionate AI Engineer with expertise in deep learning, LLMs, and MLOps. Currently pursuing
              Bachelor's in AI from Air University, with hands-on experience in building production-ready AI systems.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {expertise.map((area, index) => (
            <Card
              key={index}
              className="backdrop-blur-xl bg-white/5 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-500 hover:scale-105 shadow-2xl group hover:shadow-cyan-500/10 rounded-2xl overflow-hidden"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full group-hover:from-cyan-400/30 group-hover:to-blue-400/30 transition-all duration-300 border border-cyan-400/30 group-hover:shadow-lg group-hover:shadow-cyan-500/25">
                    <area.icon className="h-8 w-8 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
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
                      className="text-xs bg-white/10 border border-cyan-400/20 text-cyan-300 hover:bg-cyan-500/20 hover:text-white hover:border-cyan-400/40 transition-all duration-300 backdrop-blur-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="backdrop-blur-xl bg-white/5 border border-cyan-400/20 rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl hover:border-cyan-400/30 transition-all duration-500 hover:shadow-cyan-500/10">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Experience Highlights
            </h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  2+
                </div>
                <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  Years Experience
                </div>
              </div>
              <div className="group border-l border-r border-cyan-400/20 px-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  10+
                </div>
                <div className="text-gray-300 group-hover:text-white transition-colors duration-300">AI Projects</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  100+
                </div>
                <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  Models Trained
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
