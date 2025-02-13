import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type React from "react"; // Added import for React

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-green-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            EcoRent
          </Link>
          <nav className="hidden md:flex space-x-4">
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
          </nav>
        </div>
      </header>
      <div className="container mx-auto p-4 flex-grow">
        <div className="relative mb-6">
          <Input
            type="search"
            placeholder="Search for items..."
            className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-green-500 focus:outline-none focus:border-green-700"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        {children}
      </div>
      <footer className="bg-green-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 EcoRent. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
