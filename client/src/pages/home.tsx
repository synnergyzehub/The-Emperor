import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import FeaturedCollections from "../components/FeaturedCollections";
import BespokeExperience from "../components/BespokeExperience";
import CustomizationInterface from "../components/CustomizationInterface";
import Testimonials from "../components/Testimonials";
import AppointmentBooking from "../components/AppointmentBooking";
import { Helmet } from "react-helmet";

const Home: React.FC = () => {
  useEffect(() => {
    // Set page title
    document.title = "The Emperor - Bespoke Tailoring Experience";
  }, []);

  return (
    <>
      <Helmet>
        <title>The Emperor - Bespoke Tailoring Experience</title>
        <meta name="description" content="Discover the art of bespoke tailoring where every stitch tells a story of tradition, precision, and uncompromising quality." />
      </Helmet>
      
      <HeroSection />
      <FeaturedCollections />
      <BespokeExperience />
      <CustomizationInterface />
      <Testimonials />
      <AppointmentBooking />
    </>
  );
};

export default Home;
