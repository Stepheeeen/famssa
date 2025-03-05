import exco1 from "../../../assets/exco/president.jpg";
import exco2 from "../../../assets/exco/exco2.jpg";
import exco3 from "../../../assets/exco/exco3.jpg";
import exco4 from "../../../assets/exco/exco4.jpg";
import exco5 from "../../../assets/exco/exco5.jpg";
import exco6 from "../../../assets/exco/exco6.jpg";
import exco7 from "../../../assets/exco/exco7.jpg";
import exco8 from "../../../assets/exco/exco8.jpg";
import exco9 from "../../../assets/exco/exco9.jpg";
import Title from "../../custom/Topography";
const excoImages = [
  exco1,
  exco2,
  exco3,
  exco4,
  exco5,
  exco6,
  exco7,
  exco8,
  exco9,
];

const ExcoGallery = () => {
  return (
    <section className="py-10 px-6 mt-10 bg-gray-100" id="#exco">
      <div className="max-w-4xl mx-auto text-center">
        <Title custom={"font-semibold"}>Excos</Title>
        <p className="text-gray-600 mt-1">Meet our esteemed executives.</p>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {excoImages.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={src}
              alt={`Exco ${index + 1}`}
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExcoGallery;
