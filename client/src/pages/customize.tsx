import React, { useEffect } from "react";
import CustomizationInterface from "../components/CustomizationInterface";

const Customize: React.FC = () => {
  useEffect(() => {
    document.title = "Customize | The Emperor";
  }, []);

  return (
    <div>
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-10">
            <h1 className="text-[#0A1F44] font-playfair text-4xl md:text-5xl mb-4">Create Your Bespoke Garment</h1>
            <p className="text-[#36454F] max-w-2xl mx-auto">
              Use our interactive design tool to visualize your custom piece before your appointment.
            </p>
            <div className="w-20 h-px bg-[#D4AF37] mx-auto mt-4"></div>
          </div>
        </div>
      </section>
      
      <CustomizationInterface />
    </div>
  );
};

export default Customize;
