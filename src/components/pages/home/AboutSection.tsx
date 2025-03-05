import React from "react";
import Title from "../../custom/Topography";
import facultyImg from "../../../assets/logo.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="mt-10 w-full px-4 py-8">
      <Title custom="font-bold text-center">About FAMSSA</Title>

      <div className="container mx-auto flex flex-col md:flex-row items-center mt-4 gap-6">
        <img
          src={facultyImg}
          alt="logo"
          className="w-full md:w-2/5 max-w-xs md:max-w-sm lg:max-w-md mx-auto"
        />

        <div className="w-full md:w-3/5 text-center md:text-left">
          <p className="text-lg md:text-xl leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            magnam quos dolores reiciendis accusamus accusantium natus
            architecto voluptatibus odit iste dolorum, minima consectetur cumque
            totam ad maiores vel voluptates! Tenetur. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Architecto accusantium doloremque
            temporibus porro rerum impedit placeat doloribus reiciendis dolore
            autem? Veniam nobis enim amet! Repellat, aspernatur possimus. Totam,
            eum ad.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
