import React from "react";
import { Link } from "wouter";
import useAnimationOnScroll from "../hooks/useAnimationOnScroll";

const BespokeExperience: React.FC = () => {
  useAnimationOnScroll(['.fade-in', '.slide-up']);
  
  return (
    <section className="py-20 bg-[#0A1F44] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="#D4AF37" d="M47.1,-73.1C61.2,-67.3,73,-55.8,79.7,-41.7C86.4,-27.6,88,-10.8,85.2,4.9C82.3,20.6,75.1,35.2,65.1,48C55.1,60.8,42.4,71.7,27.8,77.1C13.2,82.5,-3.2,82.3,-19.7,78.8C-36.2,75.3,-52.7,68.5,-64.5,57C-76.3,45.4,-83.2,29.2,-85.2,12.2C-87.2,-4.7,-84.2,-22.4,-76.2,-36.8C-68.2,-51.2,-55.2,-62.3,-41,-68.5C-26.8,-74.7,-11.2,-76.1,2.8,-80.5C16.9,-84.9,33,-78.9,47.1,-73.1Z" transform="translate(100 100)" />
        </svg>
      </div>
    
      <div className="container mx-auto px-6 md:px-10 lg:px-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-[#D4AF37] font-playfair text-3xl md:text-4xl mb-6 fade-in">The Bespoke Experience</h3>
            <p className="text-white text-lg mb-8 slide-up" style={{animationDelay: '0.2s'}}>
              True luxury begins where mass production ends. Our bespoke service is a collaborative journey to create garments that express your individuality with unparalleled fit and finish.
            </p>
            
            <div className="space-y-6">
              {/* Process Steps */}
              <div className="flex items-start slide-up" style={{animationDelay: '0.3s'}}>
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0A1F44] font-playfair font-medium text-xl">1</div>
                <div className="ml-4">
                  <h4 className="text-[#D4AF37] font-playfair text-xl mb-2">Initial Consultation</h4>
                  <p className="text-[#F8F5E6] opacity-80">
                    Your journey begins with a personal consultation to discuss your preferences, lifestyle, and vision.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start slide-up" style={{animationDelay: '0.4s'}}>
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0A1F44] font-playfair font-medium text-xl">2</div>
                <div className="ml-4">
                  <h4 className="text-[#D4AF37] font-playfair text-xl mb-2">Measurements & Design</h4>
                  <p className="text-[#F8F5E6] opacity-80">
                    Our master tailor takes precise measurements while you select fabrics and customize every detail.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start slide-up" style={{animationDelay: '0.5s'}}>
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0A1F44] font-playfair font-medium text-xl">3</div>
                <div className="ml-4">
                  <h4 className="text-[#D4AF37] font-playfair text-xl mb-2">Fittings & Refinement</h4>
                  <p className="text-[#F8F5E6] opacity-80">
                    Multiple fittings ensure exceptional fit as your garment takes shape, allowing for precise adjustments.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start slide-up" style={{animationDelay: '0.6s'}}>
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0A1F44] font-playfair font-medium text-xl">4</div>
                <div className="ml-4">
                  <h4 className="text-[#D4AF37] font-playfair text-xl mb-2">The Reveal</h4>
                  <p className="text-[#F8F5E6] opacity-80">
                    Experience the unveiling of your bespoke creation, crafted to perfection and ready to become part of your personal legacy.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 slide-up" style={{animationDelay: '0.7s'}}>
              <Link href="/appointments">
                <a className="inline-block bg-[#D4AF37] text-[#0A1F44] px-8 py-3 uppercase tracking-wider text-sm font-medium hover:bg-white transition-colors">
                  Schedule Consultation
                </a>
              </Link>
            </div>
          </div>
          
          <div className="relative fade-in" style={{animationDelay: '0.3s'}}>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1606293927406-c55a7dd5d6ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Bespoke tailoring experience" 
                className="w-full h-[600px] object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-[#D4AF37] rounded-lg flex items-center justify-center p-4 shadow-lg">
              <p className="text-[#0A1F44] font-cormorant text-center text-xl leading-tight">
                Over 25 years of tailoring excellence
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BespokeExperience;
