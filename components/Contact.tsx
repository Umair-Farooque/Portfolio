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
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Get In Touch</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Interested in AI solutions or want to collaborate on machine learning projects? I'd love to discuss how we
            can work together.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center p-4 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-lg hover:border-amber-500/50 transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="p-2 bg-amber-500/10 rounded-lg mr-4 group-hover:bg-amber-500/20 transition-colors duration-300 border border-amber-200/50">
                      <info.icon className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{info.label}</div>
                      <div className="font-medium text-gray-900 dark:text-white">{info.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Message */}
            <Card className="bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-600/50">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send a Quick Message</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  />
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 transition-all duration-300 hover:scale-105 border border-amber-400/50">
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Follow Me</h3>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-lg hover:border-amber-500/50 transition-all duration-300 hover:scale-110 group"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-amber-600 transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
