"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react";

const menus = [
  { title: "Home", href: "/" },
  { title: "Browse Items", href: "/items" },
  { title: "My Rentals", href: "/lenders/dashboard" },
  { title: "Start a Rent", href: "/rent" },
];

export function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }

    window.addEventListener("scroll", () => {
      console.log(window.scrollY);
      handleScroll();
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-[999] mx-auto flex w-full flex-col lg:relative bg-green-50">
      <div
        className={cn(
          "z-[999] mx-auto flex w-full origin-left bg-green-200 lg:bg-green-800 p-4 lg:bg-transparent justify-between",
          scrolled && "justify-center bg-transparent"
        )}
      >
        <Link href={"/"} className=" flex items-center justify-center">
          <Image
            src={"https://picsum.photos/50/120"}
            alt="Logo EcoRent"
            height={50}
            width={120}
            className=" pointer-events-none h-[50px] w-[120px] "
          />
        </Link>
        <div
          className={cn(
            `flex items-center w-full justify-between transition-all duration-300 z-50 rounded-xl  p-2 `,
            scrolled
              ? "lg:max-w-screen-lg max-w-4xl fixed top-5 border-[0.5px] border-green-500 shadow-md bg-green-800"
              : "max-w-[640px]"
          )}
        >
          {scrolled && (
            <Link href="/">
              <Image
                src={"https://picsum.photos/40/40"}
                alt="Logo EcoRent"
                width={40}
                height={40}
                className={cn(
                  `pointer-events-none rounded-full h-[40px] transition-all duration-300 ${
                    scrolled ? "w-[40px] " : "w-0"
                  }`
                )}
              />
            </Link>
          )}
          {menus.map((menu) => (
            <Link
              key={menu.title}
              href={menu.href}
              className={cn(
                `rounded-md px-5 py-2 text-center transition-all duration-75 hover:opacity-50 hover:bg-opacity-20 `,
                scrolled && "text-white"
              )}
            >
              {menu.title}
            </Link>
          ))}
        </div>
        <div className="lg:flex items-center hidden gap-4">
          <Link
            href={"/profile"}
            className=" lg:inline-flex flex items-center justify-center"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <button
          className="lg:hidden block"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Menu color="#ffffff" className="stroke-green-800  h-full w-[40px]" />
        </button>
      </div>

      {/* This Just for Testing */}
      <div
        className={cn(
          `z-[800] block h-fit w-full bg-green-800 transition-all duration-500 lg:hidden ${
            isExpanded ? "mt-0" : "-mt-96"
          }`
        )}
      >
        <div className="my-[21px] flex flex-col items-start justify-start gap-2 px-4 text-start sm:px-20 lg:ms-[52px]">
          {menus.map((navOption) => (
            <Link
              key={navOption.title}
              href={navOption.href}
              className={cn(
                `hover:text-green-300 rounded-xl text-center text-xl text-white transition-all duration-300`
              )}
              onClick={() => setIsExpanded(false)}
            >
              {navOption.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
