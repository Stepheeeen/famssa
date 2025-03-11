import { useEffect, useState } from "react";
import Title from "../../custom/Topography";
import { BASE_URL } from "../../../constants";

const AboutSection = () => {
  const [aboutData, setAboutData] = useState({
    logoUrl: "",
    aboutText: "",
  });

  const fetchAboutData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/about/get`);
      const data = await response.json();

      setAboutData({
        logoUrl: data.logoUrl,
        aboutText: data.aboutText,
      });
    } catch (error) {
      console.error("Failed to fetch about data:", error);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  return (
    <section id="about" className="mt-10 w-full px-4 py-8">
      <Title custom="font-bold text-center">About FAMSSA</Title>

      <div className="container mx-auto flex flex-col md:flex-row items-center mt-4 gap-6">
        {aboutData.logoUrl && (
          <img
            src={aboutData.logoUrl}
            alt="logo"
            className="w-full md:w-2/5 max-w-xs md:max-w-sm lg:max-w-md mx-auto"
          />
        )}

        <div className="w-full md:w-3/5 text-center md:text-left">
          <p className="text-lg md:text-xl leading-relaxed">
            {aboutData.aboutText || "Loading..."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
