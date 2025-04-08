import React, { useEffect } from "react";
import { Link } from "wouter";
import useAnimationOnScroll from "../hooks/useAnimationOnScroll";

const Bespoke: React.FC = () => {
  useEffect(() => {
    document.title = "Bespoke Experience | The Emperor";
  }, []);

  useAnimationOnScroll(['.fade-in', '.slide-up']);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1584185705385-3fcf63c5bf4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Bespoke tailoring" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/80 to-[#111111]/40"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <div className="max-w-2xl">
              <h1 className="text-white font-playfair text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 fade-in">
                The Art of <br/>
                <span className="italic">Bespoke Tailoring</span>
              </h1>
              <p className="text-[#F8F5E6] opacity-90 text-lg md:text-xl mb-8 font-light max-w-lg slide-up" style={{animationDelay: '0.3s'}}>
                Experience the pinnacle of craftsmanship where each garment is created exclusively for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[#0A1F44] font-playfair text-3xl md:text-4xl mb-6">Our Philosophy</h2>
              <div className="w-20 h-px bg-[#D4AF37] mb-8"></div>
              <div className="prose max-w-none text-[#36454F]">
                <p>
                  At The Emperor, we believe that true luxury is not manufactured—it is crafted with intention, precision, and passion. Our bespoke service represents the antithesis of mass production, offering instead a deeply personal journey to create clothing that is as unique as the individual who wears it.
                </p>
                <p>
                  Each garment that bears The Emperor name emerges from a dialogue between client and craftsman, where your preferences, lifestyle, and vision become the blueprint for a piece that fits not just your body, but your character.
                </p>
                <p>
                  Our master tailors, with decades of expertise, utilize techniques perfected over generations, combined with the finest materials sourced from around the world. The result is clothing that transcends the ephemeral trends of fashion to become a lasting expression of personal elegance.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1565800478-da57d7c2ee09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Master tailor at work" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#0A1F44] rounded-lg flex items-center justify-center p-5 shadow-lg">
                <p className="text-[#D4AF37] font-cormorant text-center text-xl leading-tight">
                  Over 10,000 hours in every master tailor's hands
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-20 bg-[#F8F5E6]">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-[#0A1F44] font-playfair text-3xl md:text-4xl mb-4">The Bespoke Process</h2>
            <p className="text-[#36454F] max-w-2xl mx-auto">
              Creating a bespoke garment is a collaborative journey that unfolds over several weeks, resulting in clothing that fits perfectly and reflects your personal style.
            </p>
            <div className="w-20 h-px bg-[#D4AF37] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 shadow-lg rounded-sm">
              <div className="w-16 h-16 rounded-full bg-[#0A1F44] flex items-center justify-center text-[#D4AF37] font-playfair text-2xl mb-6">1</div>
              <h3 className="text-[#0A1F44] font-playfair text-xl mb-4">Initial Consultation</h3>
              <p className="text-[#36454F]">
                Your journey begins with an in-depth conversation about your style preferences, needs, and the occasions for which you're commissioning garments. We'll discuss fabrics, cuts, and details that align with your vision.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 shadow-lg rounded-sm">
              <div className="w-16 h-16 rounded-full bg-[#0A1F44] flex items-center justify-center text-[#D4AF37] font-playfair text-2xl mb-6">2</div>
              <h3 className="text-[#0A1F44] font-playfair text-xl mb-4">Measurements & Design</h3>
              <p className="text-[#36454F]">
                Our master tailor will take over 30 precise measurements to create your unique pattern. You'll select from our premium fabrics and customize every detail from lapels to linings, buttons to monograms.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 shadow-lg rounded-sm">
              <div className="w-16 h-16 rounded-full bg-[#0A1F44] flex items-center justify-center text-[#D4AF37] font-playfair text-2xl mb-6">3</div>
              <h3 className="text-[#0A1F44] font-playfair text-xl mb-4">Fittings & Refinement</h3>
              <p className="text-[#36454F]">
                Through a series of fittings, we'll perfect your garment. The first fitting with the basted garment allows for structural adjustments, while subsequent fittings refine the fit to your exact proportions and posture.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-8 shadow-lg rounded-sm">
              <div className="w-16 h-16 rounded-full bg-[#0A1F44] flex items-center justify-center text-[#D4AF37] font-playfair text-2xl mb-6">4</div>
              <h3 className="text-[#0A1F44] font-playfair text-xl mb-4">Final Delivery</h3>
              <p className="text-[#36454F]">
                Your completed garment is presented to you, embodying both your vision and our craftsmanship. We'll advise on care to ensure longevity, and your pattern is archived for future orders, making subsequent commissions even more streamlined.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/appointments">
              <a className="inline-block bg-[#D4AF37] text-[#0A1F44] px-8 py-3 uppercase tracking-wider text-sm font-medium hover:bg-[#0A1F44] hover:text-[#D4AF37] transition-colors">
                Schedule Your Consultation
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-20 bg-[#0A1F44]">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-[#D4AF37] font-playfair text-3xl md:text-4xl mb-4">Uncompromising Craftsmanship</h2>
            <p className="text-white max-w-2xl mx-auto">
              Every stitch, every cut, every detail is executed with precision and care by our master tailors.
            </p>
            <div className="w-20 h-px bg-[#D4AF37] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur p-8 rounded-sm border border-[#D4AF37]/20">
              <h3 className="text-[#D4AF37] font-playfair text-xl mb-4">Hand-stitched Details</h3>
              <p className="text-white/80">
                Certain elements of your garment, such as buttonholes, lapels, and linings are meticulously hand-stitched, providing flexibility and resilience that machine stitching cannot match.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur p-8 rounded-sm border border-[#D4AF37]/20">
              <h3 className="text-[#D4AF37] font-playfair text-xl mb-4">Canvassed Construction</h3>
              <p className="text-white/80">
                Our jackets feature full-canvas construction, where layers of horsehair canvas are hand-stitched between the fabric and lining, allowing the jacket to mold to your body over time.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur p-8 rounded-sm border border-[#D4AF37]/20">
              <h3 className="text-[#D4AF37] font-playfair text-xl mb-4">Premium Materials</h3>
              <p className="text-white/80">
                We source the finest fabrics from historic mills in England, Italy, and Scotland, ensuring that every garment not only looks exceptional but will stand the test of time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bespoke;
