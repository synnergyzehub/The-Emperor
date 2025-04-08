import React from "react";
import { Link } from "wouter";
import useAnimationOnScroll from "../hooks/useAnimationOnScroll";

const HeroSection: React.FC = () => {
  // Activate animations when elements come into view
  useAnimationOnScroll(['.fade-in', '.slide-up']);

  return (
    <section className="relative h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Premium tailoring showroom" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/70 to-transparent"></div>
      </div>
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="max-w-2xl">
            <div className="text-[#D4AF37] uppercase tracking-wider mb-2 fade-in">SS25 Collection</div>
            <h2 className="text-white font-playfair text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 fade-in">
              Air of Heritage <br/>
              <span className="italic">Ottoman Legacy</span>
            </h2>
            <p className="text-[#F8F5E6] opacity-90 text-lg md:text-xl mb-8 font-light max-w-lg slide-up" style={{animationDelay: '0.3s'}}>
              A celebration of lightness, grace, and regal silhouettes. Experience our Ottoman-inspired tailoring where every stitch embodies tradition and uncompromising quality.
            </p>
            <div className="slide-up" style={{animationDelay: '0.6s'}}>
              <Link href="/bespoke">
                <a className="inline-block bg-[#D4AF37] text-[#0A1F44] px-8 py-3 uppercase tracking-wider text-sm font-medium hover:bg-white transition-colors">
                  Begin Your Journey
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
