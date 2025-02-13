"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { SearchIcon } from "./search-icon";
import FeaturedItems from "./components/featured-items";
import SustainabilityImpact from "./components/sustainability-impact";
import UserEngagement from "./components/user-engagement";
import CallToAction from "./components/call-to-action";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 ">
      <Navbar isBordered className="bg-green-100 px-20" maxWidth="full">
        <NavbarBrand>
          <p className="font-bold text-inherit">EcoRent</p>
        </NavbarBrand>
        <NavbarContent className="flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Browse Items
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              My Rentals
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Sustainability
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Contact Us
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Search items..."
              size="sm"
              startContent={<SearchIcon size={18} />}
              type="search"
            />
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="w-full px-20 py-8">
        <FeaturedItems />
        <SustainabilityImpact />
        <UserEngagement />
        <CallToAction />
      </main>
    </div>
  );
}
