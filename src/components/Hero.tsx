import { Button } from "@/components/ui/button";
import { ArrowDown, MessageCircle, Download } from "lucide-react";

interface HeroProps {
  onOpenChat: () => void;
}

export const Hero = ({ onOpenChat }: HeroProps) => {
  return (
    <section className="min-h-screen bg-gradient-hero flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 left-16 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container px-4 mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
            Hi, I'm Muhammad Umair Farooq
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed">
            Machine Learning Engineer & AI Specialist
          </p>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Building intelligent AI solutions with deep learning, LLMs, and MLOps. 
            Ask my AI assistant anything about my experience, skills, or projects!
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={onOpenChat}
              size="lg" 
              className="bg-primary hover:bg-primary-muted text-primary-foreground px-8 py-6 text-lg shadow-elegant hover:shadow-glass transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat with AI Me
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary/50 text-foreground hover:bg-primary/10 px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
            >
              <Download className="mr-2 h-5 w-5" />
              Download CV
            </Button>
          </div>
          
          {/* Skills Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-16">
            {['Python', 'PyTorch', 'LangChain', 'FastAPI'].map((skill) => (
              <div 
                key={skill}
                className="bg-card-glass backdrop-blur-sm border border-border/50 rounded-lg p-4 text-center hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                <span className="font-medium text-foreground">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
};
