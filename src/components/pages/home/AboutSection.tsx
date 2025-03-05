import React from "react";
import Title from "../../custom/Topography";
import facultyImg from "../../../assets/logo.jpg";

const AboutSection = () => {
  return (
    <section id="#about" className="mt-10 w-full">
      <Title custom={"font-semibold"}>About FAMSSA</Title>

      <div className="container flex justify-between items-center mt-4">
        <img src={facultyImg} alt="logo" className="w-[40%]" />

        <div className="w-[50%]">
          <p className="text-xl">
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
