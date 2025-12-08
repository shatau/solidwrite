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
  {
    href: "/#pricing",
    label: "Pricing",
  },
  {
    href: "/#how-it-works",
    label: "How It Works",
  },
  {
    href: "/#faq",
    label: "FAQ",
  },
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
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header className={`w-full fixed top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-200/50" 
          : "bg-transparent"
      }`}>
        <nav className="container flex items-center justify-between px-6 py-4 mx-auto max-w-6xl" aria-label="Global">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link className="flex items-center gap-2 shrink-0 group" href="/" title={`${config.appName} homepage`}>
              <Image
                src={logo || "/placeholder.svg"}
                alt={`${config.appName} logo`}
                className="w-8 h-8"
                placeholder="blur"
                priority={true}
                width={32}
                height={32}
              />
              <span className="font-semibold text-lg text-slate-900 group-hover:text-emerald-600 transition-colors">
                {config.appName}
              </span>
            </Link>
          </div>

          {/* Burger button on mobile */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700 hover:text-slate-900"
              onClick={() => setIsOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          {/* Links on desktop */}
          <div className="hidden lg:flex lg:justify-center lg:gap-8 lg:items-center">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
                title={link.label}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA on desktop */}
          <div className="hidden lg:flex lg:justify-end lg:flex-1 lg:gap-3 lg:items-center">
            {status === "authenticated" ? (
              <>
                <ButtonSignin
                  extraStyle="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-sm font-medium transition-all"
                  text="Get started"
                  authenticatedText="Dashboard"
                />
                <ButtonAccount />
              </>
            ) : (
              <ButtonSignin extraStyle="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-sm font-medium transition-all" />
            )}
          </div>
        </nav>
      </header>

      {/* Mobile menu - OUTSIDE header, portal to body */}
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Mobile menu panel */}
          <div 
            className="fixed top-0 right-0 bottom-0 bg-white shadow-2xl overflow-y-auto z-[9999] lg:hidden"
            style={{
              width: '100%',
              maxWidth: '24rem',
            }}
          >
            {/* Logo on mobile */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <Link className="flex items-center gap-2 shrink-0" title={`${config.appName} homepage`} href="/" onClick={() => setIsOpen(false)}>
                <Image
                  src={logo || "/placeholder.svg"}
                  alt={`${config.appName} logo`}
                  className="w-8 h-8"
                  placeholder="blur"
                  priority={true}
                  width={32}
                  height={32}
                />
                <span className="font-semibold text-lg text-slate-900">{config.appName}</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-slate-500 hover:text-slate-900"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Links on mobile */}
            <div className="px-6 py-6">
              <div className="flex flex-col gap-y-4 items-start">
                {links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.href}
                    className="text-slate-700 hover:text-slate-900 font-medium transition-colors text-lg w-full"
                    title={link.label}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              
              <div className="border-t border-slate-100 my-6"></div>

              {/* CTA on mobile */}
              <div className="flex flex-col gap-3">
                {status === "authenticated" ? (
                  <>
                    <ButtonSignin
                      extraStyle="w-full px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium transition-all"
                      text="Get started"
                      authenticatedText="Dashboard"
                    />
                    <ButtonAccount />
                  </>
                ) : (
                  <ButtonSignin extraStyle="w-full px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium transition-all" />
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