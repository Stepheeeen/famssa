import React from "react";
import Navbar from "../components/custom/Navbar";
import LandingSection from "../components/pages/home/LandingSection";
import AboutSection from "../components/pages/home/AboutSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto mt-[12%]">
        <LandingSection />
        <AboutSection />
      </main>
    </>
  );
};

export default Home;
