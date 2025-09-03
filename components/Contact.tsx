import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"

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
  ]

  return (
    <section className="py-20 relative">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <div className="backdrop-blur-xl bg-white/5 border border-cyan-400/20 rounded-3xl p-8 mb-8 max-w-4xl mx-auto hover:border-cyan-400/30 transition-all duration-500">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
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
                    className="flex items-center p-4 backdrop-blur-xl bg-white/5 border border-cyan-400/20 rounded-xl hover:border-cyan-400/40 hover:bg-white/10 transition-all duration-300 hover:scale-105 group shadow-lg hover:shadow-cyan-500/10"
                  >
                    <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg mr-4 group-hover:from-cyan-400/30 group-hover:to-blue-400/30 transition-all duration-300 border border-cyan-400/30 group-hover:shadow-lg group-hover:shadow-cyan-500/25">
                      <info.icon className="h-5 w-5 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
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
            <Card className="backdrop-blur-xl bg-white/5 border border-cyan-400/20 hover:border-cyan-400/30 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/10 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 text-gray-200">Send a Quick Message</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 backdrop-blur-sm bg-white/10 border border-cyan-400/30 rounded-lg focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-gray-200 placeholder-gray-400 hover:bg-white/15"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 backdrop-blur-sm bg-white/10 border border-cyan-400/30 rounded-lg focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-gray-200 placeholder-gray-400 hover:bg-white/15"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full p-3 backdrop-blur-sm bg-white/10 border border-cyan-400/30 rounded-lg focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-gray-200 placeholder-gray-400 resize-none hover:bg-white/15"
                  />
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white py-3 transition-all duration-300 hover:scale-105 border border-cyan-400/50 rounded-xl shadow-lg hover:shadow-cyan-500/25">
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <div className="backdrop-blur-xl bg-white/5 border border-cyan-400/20 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-500 shadow-lg hover:shadow-cyan-500/10">
              <h3 className="text-xl font-bold mb-6 text-gray-200">Connect With Me</h3>
              <div className="flex justify-center space-x-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 backdrop-blur-sm bg-white/10 border border-cyan-400/30 rounded-xl hover:border-cyan-400/50 hover:bg-white/15 transition-all duration-300 hover:scale-110 group shadow-lg hover:shadow-cyan-500/20"
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
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
