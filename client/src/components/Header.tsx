import { useState } from "react";
import { Link, useLocation } from "wouter";
import Logo from "./ui/logo";
import { Menu, Search, User, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [location] = useLocation();

  const navItems = [
    { label: "Collection", path: "/collections" },
    { label: "Bespoke", path: "/bespoke" },
    { label: "Customize", path: "/customize" },
    { label: "Appointments", path: "/appointments" },
  ];

  return (
    <header className="bg-[#0A1F44] py-4 px-6 md:px-10 lg:px-16">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/">
            <a className="mr-10">
              <Logo color="gold" />
            </a>
          </Link>
          
          {/* Navigation for large screens */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link href={item.path}>
                    <a
                      className={`${
                        location === item.path
                          ? "text-[#D4AF37]"
                          : "text-white hover:text-[#D4AF37]"
                      } transition-colors font-montserrat text-sm uppercase tracking-wider`}
                    >
                      {item.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center space-x-6">
          <button className="text-white hover:text-[#D4AF37] transition-colors">
            <Search className="h-6 w-6" />
          </button>
          
          <Link href="/profile">
            <a className="text-white hover:text-[#D4AF37] transition-colors">
              <User className="h-6 w-6" />
            </a>
          </Link>
          
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-white hover:text-[#D4AF37] hover:bg-transparent">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-[#0A1F44] text-white border-l border-[#D4AF37]/20 w-[300px]">
              <div className="flex flex-col h-full">
                <div className="mb-8 mt-6">
                  <Logo color="gold" />
                </div>
                <nav className="flex-1">
                  <ul className="space-y-6">
                    {navItems.map((item) => (
                      <li key={item.path}>
                        <Link href={item.path}>
                          <a
                            className={`${
                              location === item.path
                                ? "text-[#D4AF37]"
                                : "text-white hover:text-[#D4AF37]"
                            } transition-colors font-montserrat text-base uppercase tracking-wider`}
                          >
                            {item.label}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="pt-6 border-t border-white/10 mt-auto">
                  <Link href="/profile">
                    <a className="flex items-center text-white hover:text-[#D4AF37] transition-colors">
                      <User className="h-5 w-5 mr-2" />
                      <span className="font-montserrat">My Profile</span>
                    </a>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
