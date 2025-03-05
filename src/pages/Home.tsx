import Navbar from "../components/custom/Navbar";
import LandingSection from "../components/pages/home/LandingSection";
import AboutSection from "../components/pages/home/AboutSection";
import VisionAndMission from "../components/pages/home/VisionAndMission";
import NewsForum from "../components/pages/home/NewsForum";
import ExcoGallery from "../components/pages/home/ExcoGallery";
import Newsletter from "../components/pages/home/NewsLetter";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto mt-[9.5%]">
        <LandingSection />
        <AboutSection />
        <VisionAndMission />
        <NewsForum />
        <ExcoGallery />
        <Newsletter />
      </main>
    </>
  );
};

export default Home;
