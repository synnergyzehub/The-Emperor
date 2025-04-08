import React, { useEffect } from "react";
import AppointmentBooking from "../components/AppointmentBooking";

const Appointments: React.FC = () => {
  useEffect(() => {
    document.title = "Appointments | The Emperor";
  }, []);

  return (
    <div>
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-10">
            <h1 className="text-[#0A1F44] font-playfair text-4xl md:text-5xl mb-4">Schedule Your Appointment</h1>
            <p className="text-[#36454F] max-w-2xl mx-auto">
              Begin your bespoke journey with a personal consultation at one of our boutiques.
            </p>
            <div className="w-20 h-px bg-[#D4AF37] mx-auto mt-4"></div>
          </div>
        </div>
      </section>
      
      <AppointmentBooking />
    </div>
  );
};

export default Appointments;
