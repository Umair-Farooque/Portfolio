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
    <section className="py-20 relative bg-black">
      <div className="container px-4 mx-auto font-mono">
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

        <div className="text-center">
          <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl hover:border-white/30 transition-all duration-500 hover:shadow-white/10">
            <h3 className="text-2xl font-bold mb-6 text-white">Experience Highlights</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  2+
                </div>
                <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  Years Experience
                </div>
              </div>
              <div className="group border-l border-r border-white/20 px-6">
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  10+
                </div>
                <div className="text-gray-300 group-hover:text-white transition-colors duration-300">AI Projects</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
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
