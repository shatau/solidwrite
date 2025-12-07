"use client"
import Link from "next/link"
import Image from "next/image"
import { Mail } from "lucide-react"
import config from "@/config"
import logo from "@/app/icon.png"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/#" className="flex items-center gap-3 mb-6 group">
              <Image
                src={logo || "/placeholder.svg"}
                alt={`${config.appName} logo`}
                priority={true}
                className="w-8 h-8"
                width={32}
                height={32}
              />
              <span className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                {config.appName}
              </span>
            </Link>

            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              {config.appDescription ||
                "Transform AI-generated content into natural, human-like writing that bypasses all major AI detectors."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#" className="hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-orange-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-orange-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-orange-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Legal & Support</h3>
            <ul className="space-y-3">
              {config.resend?.supportEmail && (
                <li>
                  <a
                    href={`mailto:${config.resend.supportEmail}`}
                    className="hover:text-orange-400 transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Support
                  </a>
                </li>
              )}
              <li>
                <Link href="/tos" className="hover:text-orange-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-orange-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {config.appName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
