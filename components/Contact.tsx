import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"

const UpworkIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.142-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.438-5.439-5.438z" />
  </svg>
)

export const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "farooq.intellecta@gmail.com",
      href: "mailto:farooq.intellecta@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+92 308 4624629",
      href: "tel:+923084624629",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Islamabad, Pakistan",
      href: "#",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Umair-Farooque",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/umairfaroq/",
    },
    {
      icon: UpworkIcon,
      label: "Upwork",
      href: "https://www.upwork.com/freelancers/~01e690f969b307e342",
    },
  ]

  return (
    <section className="py-20 relative bg-black text-white">
      <div className="container px-4 mx-auto font-mono">
        <div className="text-center mb-16 font-mono">
          <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-8 mb-8 max-w-4xl mx-auto hover:border-white/30 transition-all duration-500">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Interested in AI solutions or want to collaborate on machine learning projects? I'd love to discuss how we
              can work together.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-200">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center p-4 backdrop-blur-xl bg-white/5 border border-white/20 rounded-xl 
                               hover:border-white/40 hover:bg-white/10 transition-all duration-300 hover:scale-105 
                               group shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]"
                  >
                    <div className="p-3 bg-white/10 rounded-lg mr-4 border border-white/30 
                                    group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-300">
                      <info.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {info.label}
                      </div>
                      <div className="font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
                        {info.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Message */}
            <Card className="backdrop-blur-xl bg-white/5 border border-white/20 hover:border-white/30 transition-all duration-500 shadow-2xl hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 text-gray-200">Send a Quick Message</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 backdrop-blur-sm bg-white/10 border border-white/30 rounded-lg 
                               focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/20 
                               transition-all duration-300 text-gray-200 placeholder-gray-400 hover:bg-white/15"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 backdrop-blur-sm bg-white/10 border border-white/30 rounded-lg 
                               focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/20 
                               transition-all duration-300 text-gray-200 placeholder-gray-400 hover:bg-white/15"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full p-3 backdrop-blur-sm bg-white/10 border border-white/30 rounded-lg 
                               focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/20 
                               transition-all duration-300 text-gray-200 placeholder-gray-400 resize-none hover:bg-white/15"
                  />
                  <Button className="w-full bg-white/20 hover:bg-white/30 text-white py-3 transition-all duration-300 hover:scale-105 border border-white/50 rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]">
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-8 hover:border-white/30 transition-all duration-500 shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]">
              <h3 className="text-xl font-bold mb-6 text-gray-200">Connect With Me</h3>
              <div className="flex justify-center space-x-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 backdrop-blur-sm bg-white/10 border border-white/30 rounded-xl 
                    hover:border-white/50 hover:bg-white/15 transition-all duration-300 hover:scale-110 
                    group shadow-glow hover:animate-glow"

                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6 text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
