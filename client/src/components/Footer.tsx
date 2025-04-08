import React from "react";
import { Link } from "wouter";
import Logo from "./ui/logo";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#111111] py-12">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Logo color="gold" className="mb-4" />
            <p className="text-white/70 text-sm mb-6">
              Crafting timeless elegance through bespoke tailoring since 1997. A tradition of excellence, delivered with personal attention.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-[#D4AF37] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-[#D4AF37] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-[#D4AF37] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h6 className="text-white font-montserrat text-sm uppercase tracking-wider mb-4">Collections</h6>
            <ul className="space-y-2 text-white/70">
              <li><Link href="/collections"><a className="hover:text-[#D4AF37] transition-colors">The Executive</a></Link></li>
              <li><Link href="/collections"><a className="hover:text-[#D4AF37] transition-colors">The Heritage</a></Link></li>
              <li><Link href="/collections"><a className="hover:text-[#D4AF37] transition-colors">The Sovereign</a></Link></li>
              <li><Link href="/collections"><a className="hover:text-[#D4AF37] transition-colors">Wedding Attire</a></Link></li>
              <li><Link href="/collections"><a className="hover:text-[#D4AF37] transition-colors">Evening Wear</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h6 className="text-white font-montserrat text-sm uppercase tracking-wider mb-4">Bespoke Service</h6>
            <ul className="space-y-2 text-white/70">
              <li><Link href="/bespoke"><a className="hover:text-[#D4AF37] transition-colors">The Process</a></Link></li>
              <li><Link href="/customize"><a className="hover:text-[#D4AF37] transition-colors">Fabric Library</a></Link></li>
              <li><Link href="/bespoke"><a className="hover:text-[#D4AF37] transition-colors">Style Guide</a></Link></li>
              <li><Link href="/appointments"><a className="hover:text-[#D4AF37] transition-colors">Appointments</a></Link></li>
              <li><Link href="/bespoke"><a className="hover:text-[#D4AF37] transition-colors">Care Advice</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h6 className="text-white font-montserrat text-sm uppercase tracking-wider mb-4">Contact</h6>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">London Boutique</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Mumbai Atelier</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Dubai Showroom</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Client Support</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            &copy; {currentYear} The Emperor Bespoke Tailoring. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-white/50 text-sm">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
