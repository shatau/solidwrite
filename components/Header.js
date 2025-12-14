"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import ButtonSignin from "./ButtonSignin"
import logo from "@/app/icon.png"
import config from "@/config"
import ButtonAccount from "./ButtonAccount"
import { useSession } from "next-auth/react"

const links = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
]

const Header = () => {
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { status } = useSession()

  useEffect(() => {
    setIsOpen(false)
  }, [searchParams])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`w-full fixed top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-2xl shadow-[0_1px_0_0_rgba(0,0,0,0.05)] border-b border-gray-100/50"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl flex items-center justify-between px-6 lg:px-8 py-4 mx-auto" aria-label="Global">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link className="flex items-center gap-2.5 shrink-0 group" href="/" title={`${config.appName} homepage`}>
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                className="w-9 h-9 transition-transform group-hover:scale-105"
                placeholder="blur"
                priority={true}
                width={36}
                height={36}
              />
              <span className="font-bold text-xl tracking-tight text-gray-900">
                {config.appName}
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-colors"
              onClick={() => setIsOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex lg:justify-center lg:gap-1 lg:items-center">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium rounded-xl hover:bg-gray-100/60 transition-all"
                title={link.label}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:justify-end lg:flex-1 lg:gap-3 lg:items-center">
            {status === "authenticated" ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  Dashboard
                </Link>
                <ButtonAccount />
              </>
            ) : (
              <>
                <Link
                  href="/api/auth/signin"
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/api/auth/signin"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-[9998] lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-[9999] lg:hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <Link className="flex items-center gap-2 shrink-0" href="/" onClick={() => setIsOpen(false)}>
                <Image src={logo} alt={`${config.appName} logo`} className="w-8 h-8" priority width={32} height={32} />
                <span className="font-bold text-lg text-gray-900">{config.appName}</span>
              </Link>
              <button
                type="button"
                className="rounded-xl p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-8">
              <div className="flex flex-col gap-2">
                {links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.href}
                    className="px-4 py-3 text-gray-700 hover:text-gray-900 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-100 my-6" />

              <div className="flex flex-col gap-3">
                {status === "authenticated" ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="w-full px-6 py-3 text-center text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <ButtonAccount />
                  </>
                ) : (
                  <>
                    <Link
                      href="/api/auth/signin"
                      className="w-full px-6 py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/api/auth/signin"
                      className="w-full px-6 py-3 text-center text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started Free
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Header