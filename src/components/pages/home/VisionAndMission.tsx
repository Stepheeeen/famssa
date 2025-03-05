import React from "react";
import Title from "../../custom/Topography";
import { COLORS } from "../../../constants";

const VisionAndMission = () => {
  return (
    <section
      id="#about"
      className="mt-10 w-full grid place-items-center bg-gray-100 py-10 pb-20"
    >
      {[
        {
          text: "Mission",
          content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            magnam quos dolores reiciendis accusamus accusantium natus
            architecto voluptatibus odit iste dolorum, minima consectetur cumque
            totam ad maiores vel voluptates! Tenetur.`,
        },
        {
          text: "Vision",
          content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            magnam quos dolores reiciendis accusamus accusantium natus
            architecto voluptatibus odit iste dolorum, minima consectetur cumque
            totam ad maiores vel voluptates! Tenetur.`,
        },
      ].map((item, index) => (
        <div
          key={index}
          className="container flex flex-col justify-center items-center"
        >
          <h1
            className={`py-3 text-5xl font-semibold text-center `}
            style={{ color: COLORS.Yellow }}
          >
            {item.text}
          </h1>

          <p className="text-xl text-center">{item.content}</p>
        </div>
      ))}
    </section>
  );
};

export default VisionAndMission;
