import Title from "../../custom/Topography";
import styles from "./page.module.css";

const LandingSection = () => {
  return (
    <section className={`${styles.bgHero} relative h-[500px] w-full bg-cover`}>
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Welcome To <br />{" "}
        </h1>
        <Title custom={"font-bold w-2/3"}>
          Faculty of management sciences student association <br />( FAMSSA)
        </Title>
      </div>
    </section>
  );
};

export default LandingSection;
