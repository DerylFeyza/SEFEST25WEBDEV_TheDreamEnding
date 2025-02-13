"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu } from "lucide-react"

const menus = [
  { title: "Home", href: "/" },
  { title: "Browse Items", href: "/items" },
  { title: "My Rentals", href: "/lenders/dashboard" },
  { title: "Start a Rent", href: "/rent" },
]

export function Header() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 80)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="fixed z-[999] mx-auto flex w-full flex-col xl:relative bg-green-50">
      <div className="z-[999] mx-auto flex w-full origin-left justify-between bg-green-800 px-5 py-4 xl:max-w-[1192px] xl:bg-transparent xl:py-0">
        <Link href={"/"} className="block xl:mt-[20px]">
          <Image
            src={"/placeholder.svg?height=50&width=120"}
            alt="Logo EcoRent"
            width={120}
            height={50}
            className="pointer-events-none h-[50px] w-[120px]"
          />
        </Link>
        <div
          className={cn(
            `fixed left-1/2 top-[20px] hidden w-full justify-between transition-all duration-300 xl:flex xl:items-center ${scrolled ? "max-w-[720px]" : "max-w-[640px]"} -translate-x-1/2 rounded-xl border-[0.5px] border-green-500 bg-green-800 p-2 shadow-md`,
          )}
        >
          {scrolled && (
            <Link href="/">
              <Image
                src={"/placeholder.svg?height=40&width=40"}
                alt="Logo EcoRent"
                width={40}
                height={40}
                className={cn(
                  `pointer-events-none h-[40px] transition-all duration-300 ${scrolled ? "w-[40px]" : "w-0"}`,
                )}
              />
            </Link>
          )}
          {menus.map((menu) => (
            <Link
              key={menu.title}
              href={menu.href}
              className={cn(
                `rounded-md px-5 py-2 text-center text-white transition-all duration-300 hover:bg-white hover:bg-opacity-20 hover:text-gray-200`,
              )}
            >
              {menu.title}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-4 xl:flex">
          <Link href={"/profile"} className="hidden xl:mt-[20px] xl:inline-flex">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <button className="block xl:hidden" onClick={() => setIsExpanded(!isExpanded)}>
          <Menu color="#ffffff" className="h-full w-[40px]" />
        </button>
      </div>
      <div
        className={cn(
          `z-[800] block h-fit w-full bg-green-800 transition-all duration-500 xl:hidden ${isExpanded ? "mt-0" : "-mt-96"}`,
        )}
      >
        <div className="my-[21px] flex flex-col items-start justify-start gap-2 px-4 text-start sm:px-20 lg:ms-[52px]">
          {menus.map((navOption) => (
            <Link
              key={navOption.title}
              href={navOption.href}
              className={cn(
                `hover:text-green-300 rounded-xl text-center text-xl text-white transition-all duration-300`,
              )}
              onClick={() => setIsExpanded(false)}
            >
              {navOption.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

