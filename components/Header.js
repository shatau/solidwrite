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
  const { status } = useSession()

  useEffect(() => {
    setIsOpen(false)
  }, [searchParams])

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg bg-white/95">
      <nav className="container flex items-center justify-between px-6 py-4 mx-auto max-w-8xl" aria-label="Global">
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
            <span className="font-bold text-xl text-gray-900 group-hover:text-orange-700 transition-colors">
              {config.appName}
            </span>
          </Link>
        </div>

        {/* Burger button on mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:text-gray-900"
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
              className="text-gray-700 hover:text-orange-700 font-medium transition-colors"
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
                extraStyle="px-6 py-2.5 bg-orange-700 hover:bg-orange-800 text-white rounded-lg font-semibold transition-all shadow-md"
                text="Get started"
                authenticatedText="Dashboard"
              />
              <ButtonAccount />
            </>
          ) : (
            <ButtonSignin extraStyle="px-6 py-2.5 bg-orange-700 hover:bg-orange-800 text-white rounded-lg font-semibold transition-all shadow-md" />
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`relative z-50 ${isOpen ? "" : "hidden"}`}>
        <div className="fixed inset-y-0 right-0 z-10 w-full px-6 py-4 overflow-y-auto bg-white sm:max-w-sm shadow-2xl transform origin-right transition ease-in-out duration-300">
          {/* Logo on mobile */}
          <div className="flex items-center justify-between">
            <Link className="flex items-center gap-2 shrink-0" title={`${config.appName} homepage`} href="/">
              <Image
                src={logo || "/placeholder.svg"}
                alt={`${config.appName} logo`}
                className="w-8 h-8"
                placeholder="blur"
                priority={true}
                width={32}
                height={32}
              />
              <span className="font-bold text-xl text-gray-900">{config.appName}</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-gray-900"
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
          <div className="flow-root mt-6">
            <div className="py-4">
              <div className="flex flex-col gap-y-4 items-start">
                {links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.href}
                    className="text-gray-700 hover:text-orange-700 font-medium transition-colors text-lg"
                    title={link.label}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-200 my-6"></div>

            {/* CTA on mobile */}
            <div className="flex flex-col gap-3">
              {status === "authenticated" ? (
                <>
                  <ButtonSignin
                    extraStyle="w-full px-6 py-3 bg-orange-700 hover:bg-orange-800 text-white rounded-lg font-semibold transition-all shadow-md"
                    text="Get started"
                    authenticatedText="Dashboard"
                  />
                  <ButtonAccount />
                </>
              ) : (
                <ButtonSignin extraStyle="w-full px-6 py-3 bg-orange-700 hover:bg-orange-800 text-white rounded-lg font-semibold transition-all shadow-md" />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
