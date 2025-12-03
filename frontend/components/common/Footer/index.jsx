"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  Send,
  CheckCircle,
  Globe,
  Heart,
} from "lucide-react"
import { useState } from "react"
import { useTheme } from "next-themes"
import { ModeToggle } from "../ModeToggle"

const footerSections = [
  {
    title: "About",
    links: [
      { name: "Browse Webinars", href: "/webinars", icon: null },
      { name: "Browse Experts", href: "/browse-all-experts", icon: null },
      { name: "How It Works", href: "/how-it-works", icon: null },
      { name: "Success Stories", href: "/success-stories", icon: null },
      { name: "Pricing", href: "/pricing", icon: null },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about-us", icon: null },
      { name: "Careers", href: "/careers", icon: null },
      { name: "Blog", href: "/blog", icon: null },
      { name: "Help Center", href: "/help", icon: null },
      { name: "Contact Support", href: "/contact", icon: null },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms of Service", href: "/terms-of-service", icon: null },
      { name: "Privacy Policy", href: "/privacy-policy", icon: null },
      { name: "Cookie Policy", href: "/cookie-policy", icon: null },
      { name: "Refund Policy", href: "/refund-policy", icon: null },
      { name: "Community Guidelines", href: "/community-guidelines", icon: null },
    ],
  },
]
console.log("🚀 ~ footerSections:", footerSections.length)

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: Facebook,
    color: "hover:text-blue-600",
    bgColor: "hover:bg-blue-50",
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
    color: "hover:text-sky-500",
    bgColor: "hover:bg-sky-50",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
    color: "hover:text-blue-700",
    bgColor: "hover:bg-blue-50",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: Instagram,
    color: "hover:text-pink-600",
    bgColor: "hover:bg-pink-50",
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: Youtube,
    color: "hover:text-red-600",
    bgColor: "hover:bg-red-50",
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: Github,
    color: "hover:text-gray-900",
    bgColor: "hover:bg-gray-50",
  },
]

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@webinarplatform.com",
    href: "mailto:hello@webinarplatform.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Innovation St, San Francisco, CA 94105",
    href: "https://maps.google.com",
  },
]

export default function Footer() {
  const { setTheme } = useTheme()
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="w-full bg-gradient-to-b from-green-100/20 via-green-500/10 to-green-800/15">
      {/* Main Footer Content */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-bold text-gray-900">WebinarPro</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Empowering professionals worldwide through interactive online learning experiences. Join 150,000+
                learners and 2,500+ expert instructors on our platform.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-white/60 rounded-2xl p-6 border border-white/20 shadow-sm">
              <h4 className="text-lg font-semibold mb-2 text-gray-900">Stay Updated</h4>
              <p className="text-gray-600 text-sm mb-4">
                Get the latest webinars and expert insights delivered to your inbox
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/80 border-gray-200 rounded-lg"
                    required
                  />
                  <Button
                    type="submit"
                    className="bg-gradient-to-r bg-primary text-white border-0 font-semibold px-4 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg"
                    disabled={isSubscribed}
                  >
                    {isSubscribed ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-1" />
                        Subscribe
                      </>
                    )}
                  </Button>
                </div>
                {isSubscribed && (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Successfully subscribed!</span>
                  </div>
                )}
              </form>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-700 uppercase tracking-wide">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-11 h-11 bg-white/80 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 transition-all duration-300 hover:shadow-lg ${social.color} ${social.bgColor} hover:scale-110 hover:-translate-y-1`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
              {footerSections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">{section.title}</h4>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-600 hover:text-gray-900 transition-colors duration-200 group flex items-center"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-200 text-sm">
                            {link.name}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">Contact Us</h4>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => {
                  const Icon = contact.icon
                  return (
                    <a
                      key={index}
                      href={contact.href}
                      target={contact.href.startsWith("http") ? "_blank" : undefined}
                      rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-3 text-gray-600 hover:text-gray-900 transition-colors duration-200 group p-1 rounded-lg hover:bg-white/40"
                    >
                      <Icon className="w-5 h-5 mt-0.5 text-green-900/70 group-hover:text-green-900 transition-colors" />
                      <div>
                        <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">{contact.label}</div>
                        <div className="text-sm group-hover:translate-x-1 transition-transform duration-200">
                          {contact.value}
                        </div>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
            <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <span>© 2025 QuizMaster Saudi Arabia. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <a href="/terms" className="hover:text-saudi-green transition-colors">
                Terms
              </a>
              <span>|</span>
              <a href="/privacy" className="hover:text-saudi-green transition-colors">
                Privacy
              </a>
              <span>|</span>
              <a href="/cookies" className="hover:text-saudi-green transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
