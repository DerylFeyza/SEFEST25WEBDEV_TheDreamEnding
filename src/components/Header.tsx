import Link from "next/link";
import type React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  return (
    <header
      id="layout-header"
      className="sticky top-0 z-50 p-4 mb-8 text-white bg-green-800"
    >
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/" className="text-2xl font-bold">
          EcoRent
        </Link>
        <nav
          className={cn(
            "hidden md:flex justify-center items-center space-x-4 "
          )}
        >
          <Link href="/" className="hover:text-green-300">
            Home
          </Link>
          <Link href="/browse" className="hover:text-green-300">
            Browse Items
          </Link>
          <Link href="/rentals" className="hover:text-green-300">
            My Rentals
          </Link>
          <Link href="/sustainability" className="hover:text-green-300">
            Sustainability
          </Link>
          <Link href="/contact" className="hover:text-green-300">
            Contact Us
          </Link>
          <Link href="/profile" className="">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>nigger</AvatarFallback>
            </Avatar>
          </Link>
        </nav>
      </div>
    </header>
  );
}
