import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type React from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className=" flex-grow p-4 mx-auto">
        <div className="relative mb-6">
          <Input
            type="search"
            placeholder="Search for items..."
            className="focus:outline-none focus:border-green-700 w-full py-2 pl-10 pr-4 border-2 border-green-500 rounded-full"
          />
          <Search className="left-3 top-1/2 absolute text-gray-400 transform -translate-y-1/2" />
        </div>
        {children}
      </div>
      <footer className="p-4 mt-8 text-white bg-green-800">
        <div className=" mx-auto text-center">
          <p>&copy; 2025 EcoRent. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
