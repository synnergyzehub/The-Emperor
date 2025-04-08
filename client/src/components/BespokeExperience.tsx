import React from 'react';
import { Scissors, Ruler, UserPlus, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'wouter';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';

const BespokeExperience: React.FC = () => {
  const navigate = useNavigate();
  const { ref: stepsRef } = useAnimationOnScroll<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="py-24 bg-[#0A1F44] text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="text-center mb-16">
          <h3 className="text-[#D4AF37] font-playfair text-3xl md:text-4xl mb-4">The Emperor Bespoke Experience</h3>
          <p className="text-white/80 max-w-3xl mx-auto text-lg">
            Our Ottoman-inspired craftsmanship brings together centuries of tailoring heritage with modern precision. 
            Each piece tells a story of luxury, nobility, and timeless elegance.
          </p>
          <div className="w-20 h-px bg-[#D4AF37] mx-auto mt-8"></div>
        </div>
        
        <div className="relative mt-20">
          {/* Ottoman-inspired decorative element */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4AF37]/0 via-[#D4AF37] to-[#D4AF37]/0 -translate-x-1/2 hidden md:block"></div>
          
          <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {/* Step 1 */}
            <div className="relative fade-in-right">
              <div className="bg-[#0A1F44]/60 border border-[#D4AF37]/30 p-8 rounded-sm h-full luxury-shadow">
                <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center luxury-shadow-sm">
                  <UserPlus className="h-6 w-6 text-[#0A1F44]" />
                </div>
                <h4 className="text-[#D4AF37] font-playfair text-2xl mb-4">Personal Consultation</h4>
                <p className="text-white/80 mb-6">
                  Begin with a private session with our master tailors, who have honed their craft in the tradition of Ottoman imperial tailoring. Discuss your style preferences, lifestyle needs, and vision.
                </p>
                <div className="bg-[#D4AF37]/10 p-4 border-l-2 border-[#D4AF37] mt-6">
                  <p className="text-[#F8F5E6] italic text-sm">
                    "The first fitting is where we discover the soul of the garment. It's a sacred moment of creation."
                  </p>
                  <p className="text-[#D4AF37] text-sm mt-2">— Master Tailor Ahmet</p>
                </div>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 w-8 h-8 bg-[#D4AF37] rounded-full transform translate-x-1/2 -translate-y-1/2 z-10 luxury-shadow"></div>
            </div>
            
            {/* Step 2 */}
            <div className="relative pt-16 md:pt-32 fade-in-left">
              <div className="bg-[#0A1F44]/60 border border-[#D4AF37]/30 p-8 rounded-sm h-full luxury-shadow">
                <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center luxury-shadow-sm">
                  <Ruler className="h-6 w-6 text-[#0A1F44]" />
                </div>
                <h4 className="text-[#D4AF37] font-playfair text-2xl mb-4">Precision Measurement</h4>
                <p className="text-white/80 mb-6">
                  We take over 30 precise measurements to create your unique pattern. Our Air of Heritage collection draws inspiration from traditional Ottoman court attire, reimagined for the modern noble.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-[#D4AF37] text-2xl font-playfair">30+</p>
                    <p className="text-white/60 text-sm">Measurements</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#D4AF37] text-2xl font-playfair">100%</p>
                    <p className="text-white/60 text-sm">Custom Pattern</p>
                  </div>
                </div>
              </div>
              <div className="hidden md:block absolute top-1/2 left-0 w-8 h-8 bg-[#D4AF37] rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 luxury-shadow"></div>
            </div>
            
            {/* Step 3 */}
            <div className="relative fade-in-right">
              <div className="bg-[#0A1F44]/60 border border-[#D4AF37]/30 p-8 rounded-sm h-full luxury-shadow">
                <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center luxury-shadow-sm">
                  <Scissors className="h-6 w-6 text-[#0A1F44]" />
                </div>
                <h4 className="text-[#D4AF37] font-playfair text-2xl mb-4">Artisan Craftsmanship</h4>
                <p className="text-white/80 mb-6">
                  Your garment is hand-cut and constructed by our master craftsmen, with intricate Ottoman-inspired details like our signature geometric motif lining and gold-finished buttons bearing The Emperor seal.
                </p>
                <div className="grid grid-cols-3 gap-2 mt-6">
                  <div className="h-16 rounded overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1461344577544-4e5dc9487184?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                      alt="Tailor cutting fabric" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-16 rounded overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1559582798-678dfc71ccd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                      alt="Hand stitching" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-16 rounded overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1599451897576-cbeb7bcdfa93?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                      alt="Detail work" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 w-8 h-8 bg-[#D4AF37] rounded-full transform translate-x-1/2 -translate-y-1/2 z-10 luxury-shadow"></div>
            </div>
            
            {/* Step 4 */}
            <div className="relative pt-16 md:pt-32 fade-in-left">
              <div className="bg-[#0A1F44]/60 border border-[#D4AF37]/30 p-8 rounded-sm h-full luxury-shadow">
                <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center luxury-shadow-sm">
                  <Clock className="h-6 w-6 text-[#0A1F44]" />
                </div>
                <h4 className="text-[#D4AF37] font-playfair text-2xl mb-4">The Final Presentation</h4>
                <p className="text-white/80 mb-6">
                  Your bespoke garment is presented in our signature packaging adorned with Ottoman-inspired geometric patterns in gold leaf. Each piece is delivered with a certificate of authenticity.
                </p>
                <Button 
                  className="w-full mt-6 bg-[#D4AF37] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-[#D4AF37] border border-[#D4AF37] transition-colors"
                  onClick={() => navigate('/appointments')}
                >
                  Begin Your Journey
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h4 className="text-[#D4AF37] font-playfair text-2xl mb-6">Transparent Pricing Philosophy</h4>
          <p className="text-white/80 max-w-3xl mx-auto">
            We believe in complete transparency. Our pricing reflects only the true cost of premium materials and expert craftsmanship without unnecessary markups. Experience affordable luxury with our straightforward pricing approach.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-[#0A1F44]/60 border border-[#D4AF37]/30 p-6 rounded-sm">
              <h5 className="text-[#D4AF37] font-playfair text-xl mb-3">Fabric Cost</h5>
              <p className="text-white/80 text-sm">
                The exact price of your chosen premium fabric, sourced from historic Ottoman mills and the finest European suppliers.
              </p>
            </div>
            
            <div className="bg-[#0A1F44]/60 border border-[#D4AF37]/30 p-6 rounded-sm">
              <h5 className="text-[#D4AF37] font-playfair text-xl mb-3">Craftsmanship</h5>
              <p className="text-white/80 text-sm">
                A fair price for the skilled artisans who spend 60+ hours handcrafting your bespoke garment to perfection.
              </p>
            </div>
            
            <div className="bg-[#0A1F44]/60 border border-[#D4AF37]/30 p-6 rounded-sm">
              <h5 className="text-[#D4AF37] font-playfair text-xl mb-3">Customization</h5>
              <p className="text-white/80 text-sm">
                Additional costs only for special personalization options like monogramming, special linings, or decorative elements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BespokeExperience;