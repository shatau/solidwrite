"use client"
import Link from "next/link"
import Image from "next/image"
import { Mail } from "lucide-react"
import config from "@/config"
import logo from "@/app/icon.png"

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/#" className="flex items-center gap-2.5 mb-5 group">
              <Image
                src={logo || "/placeholder.svg"}
                alt={`${config.appName} logo`}
                priority={true}
                className="w-8 h-8"
                width={32}
                height={32}
              />
              <span className="text-xl font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                {config.appName}
              </span>
            </Link>

            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              {config.appDescription ||
                "Transform AI-generated content into natural, human-like writing that bypasses all major AI detectors."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-900 font-medium text-sm mb-5">Product</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>
                <Link href="/#" className="hover:text-slate-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-slate-900 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-slate-900 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-slate-900 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-slate-900 font-medium text-sm mb-5">Legal</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              {config.resend?.supportEmail && (
                <li>
                  <a
                    href={`mailto:${config.resend.supportEmail}`}
                    className="hover:text-slate-900 transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Support
                  </a>
                </li>
              )}
              <li>
                <Link href="/tos" className="hover:text-slate-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-slate-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} {config.appName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer