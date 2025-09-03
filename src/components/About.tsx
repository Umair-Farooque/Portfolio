import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Palette, Database, Brain } from "lucide-react";

export const About = () => {
  const expertise = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description: "Deep Learning, LLMs, Computer Vision",
      skills: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "XGBoost"]
    },
    {
      icon: Code,
      title: "Programming & Development",
      description: "Python, C++, MLOps, API Development",
      skills: ["Python", "C++", "FastAPI", "Flask", "Streamlit", "Gradio"]
    },
    {
      icon: Database,
      title: "Data & Databases", 
      description: "Vector DBs, SQL, Data Processing",
      skills: ["ChromaDB", "FAISS", "Pinecone", "MySQL", "Pandas", "NumPy"]
    },
    {
      icon: Palette,
      title: "LLM & NLP Tools",
      description: "Large Language Models & Natural Language Processing",
      skills: ["OpenAI API", "LangChain", "Transformers", "NLTK", "spaCy"]
    }
  ];

  return (
    <section className="py-20 bg-background-secondary">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm a passionate AI Engineer with expertise in deep learning, LLMs, and MLOps. Currently pursuing 
            Bachelor's in AI from Air University, with hands-on experience in building production-ready AI systems.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {expertise.map((area, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 shadow-glass group"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                    <area.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {area.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {area.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {area.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary"
                      className="text-xs bg-secondary/80 hover:bg-primary/20 transition-colors duration-300"
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
          <div className="bg-gradient-card backdrop-blur-sm border border-border/50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Experience Highlights</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="border-r border-border/30 last:border-r-0 pr-6 last:pr-0">
                <div className="text-3xl font-bold text-primary mb-2">2+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div className="border-r border-border/30 last:border-r-0 pr-6 last:pr-0">
                <div className="text-3xl font-bold text-primary mb-2">10+</div>
                <div className="text-muted-foreground">AI Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-muted-foreground">Models Trained</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
