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
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">About Me</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate AI Engineer with expertise in deep learning, LLMs, and MLOps. Currently pursuing Bachelor's
            in AI from Air University, with hands-on experience in building production-ready AI systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {expertise.map((area, index) => (
            <Card
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:border-amber-500/50 transition-all duration-300 hover:scale-105 shadow-lg group"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-amber-500/10 rounded-full group-hover:bg-amber-500/20 transition-colors duration-300 border border-amber-200/50">
                    <area.icon className="h-8 w-8 text-amber-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{area.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{area.description}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {area.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors duration-300"
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
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 max-w-4xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Experience Highlights</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="border-r border-gray-200/30 dark:border-gray-700/30 last:border-r-0 pr-6 last:pr-0">
                <div className="text-3xl font-bold text-amber-600 mb-2">2+</div>
                <div className="text-gray-600 dark:text-gray-300">Years Experience</div>
              </div>
              <div className="border-r border-gray-200/30 dark:border-gray-700/30 last:border-r-0 pr-6 last:pr-0">
                <div className="text-3xl font-bold text-amber-600 mb-2">10+</div>
                <div className="text-gray-600 dark:text-gray-300">AI Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600 mb-2">100+</div>
                <div className="text-gray-600 dark:text-gray-300">Models Trained</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
