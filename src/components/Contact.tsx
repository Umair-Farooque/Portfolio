import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

export const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "farooq.intellecta@gmail.com",
      href: "mailto:farooq.intellecta@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone", 
      value: "+92 308 4624629",
      href: "tel:+923084624629"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Islamabad, Pakistan",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Umair-Farooque"
    },
    {
      icon: Linkedin,
      label: "LinkedIn", 
      href: "https://www.linkedin.com/in/umairfaroq/"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interested in AI solutions or want to collaborate on machine learning projects? I'd love to discuss how we can work together.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a 
                    key={index}
                    href={info.href}
                    className="flex items-center p-4 bg-gradient-card backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{info.label}</div>
                      <div className="font-medium text-foreground">{info.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Message */}
            <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 text-foreground">Send a Quick Message</h3>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    className="w-full p-3 bg-input border border-border rounded-lg focus:border-primary focus:outline-none transition-colors duration-300 text-foreground placeholder-muted-foreground"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email"
                    className="w-full p-3 bg-input border border-border rounded-lg focus:border-primary focus:outline-none transition-colors duration-300 text-foreground placeholder-muted-foreground"
                  />
                  <textarea 
                    placeholder="Your Message"
                    rows={4}
                    className="w-full p-3 bg-input border border-border rounded-lg focus:border-primary focus:outline-none transition-colors duration-300 text-foreground placeholder-muted-foreground resize-none"
                  />
                  <Button 
                    className="w-full bg-primary hover:bg-primary-muted text-primary-foreground py-3 transition-all duration-300 hover:scale-105"
                  >
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-6 text-foreground">Follow Me</h3>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gradient-card backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/50 transition-all duration-300 hover:scale-110 group"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
