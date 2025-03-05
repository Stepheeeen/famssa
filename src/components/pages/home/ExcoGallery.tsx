import exco1 from "../../../assets/exco/president.jpg";
import exco2 from "../../../assets/exco/exco2.jpg";
import exco3 from "../../../assets/exco/exco3.jpg";
import exco4 from "../../../assets/exco/exco4.jpg";
import exco5 from "../../../assets/exco/exco5.jpg";
import exco6 from "../../../assets/exco/exco6.jpg";
import exco7 from "../../../assets/exco/exco7.jpg";
import exco8 from "../../../assets/exco/exco8.jpg";
import exco9 from "../../../assets/exco/exco9.jpg";
import exco10 from "../../../assets/exco/exco10.jpg";
import exco11 from "../../../assets/exco/exco11.jpg";
import exco12 from "../../../assets/exco/exco12.jpg";
import Title from "../../custom/Topography";

const excoMembers = [
  {
    image: exco1,
    name: "Olowo Abdulhakeem Jeremiah",
    department: "Banking and finance",
    position: "President",
    state: "Kogi",
    lga: "Adavi",
  },
  {
    image: exco2,
    name: "Onoja Princess Ojonugwa",
    department: "Accounting",
    position: "Vice President",
    state: "Kogi",
    lga: "Igalamela/Odolu",
  },
  {
    image: exco3,
    name: "Bamisayo Timothy Richard",
    department: "Business Administration",
    position: "Treasurer",
    state: "Kogi",
    lga: "Ijumu",
  },
  {
    image: exco4,
    name: "Akinsoto Mary",
    department: "Business Administration",
    position: "Auditor",
    state: "Ondo",
    lga: "ile-oluji oke-igbo",
  },
  {
    image: exco5,
    name: "Elijah Bobwealth Mamud",
    department: "Accounting",
    position: "Financial Secretary",
    state: "Kogi",
    lga: "Ajaokuta",
  },
  {
    image: exco6,
    name: "Abah Victoria",
    department: "Public Administration",
    position: "Public relations officer (P.R.O)",
    state: "Kogi",
    lga: "Olamaboro",
  },
  {
    image: exco7,
    name: "Olorunpomi Funmi Evelyn",
    department: "Accounting",
    position: "Ass. Gen sec",
    state: "Kogi",
    lga: "kabba bunu",
  },
  {
    image: exco8,
    name: "Ukwubile Timothy",
    department: "Banking and Finance",
    position: "Director of Academics",
    state: "Kogi",
    lga: "Ibaji",
  },
  {
    image: exco9,
    name: "Ojame Elizabeth Edhereveno",
    department: "Accounting",
    position: "Director of welfare and Transportation",
    state: "Delta",
    lga: "Isoko north",
  },
  {
    image: exco10,
    name: "Suleiman Mohammed Baba (tun'chi)",
    department: "Banking and Finance",
    position: "Director of Sports",
    state: "Kogi",
    lga: "Okehi",
  },
  {
    image: exco11,
    name: "Tajudeen Jubril Olanrewaju",
    department: "Banking and Finance",
    position: "National Association of Finance Students (NAFS)",
    state: "Oyo",
    lga: "Egbeda",
  },
  {
    image: exco12,
    name: "Adewole Daniel Oluwatofunmi",
    // department: "Banking and Finance",
    position: "(NUMBAS) President",
    state: "Ekiti",
    lga: "Ikole",
  },
];

const ExcoGallery = () => {
  return (
    <section className="py-10 px-6 mt-10 bg-gray-100" id="excos">
      <div className="max-w-4xl mx-auto text-center">
        <Title custom={"font-semibold"}>Excos</Title>
        <p className="text-gray-600 mt-1">Meet our esteemed executives.</p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {excoMembers.map((member, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg shadow-lg bg-white p-4"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="mt-4 text-center">
              <h2 className="text-xl font-bold text-gray-800">{member.name}</h2>
              <p className="text-gray-600">{member.position}</p>
              <p className="text-gray-600">
                <strong>Department:</strong> {member.department}
              </p>
              <p className="text-gray-600">
                <strong>State:</strong> {member.state}
              </p>
              <p className="text-gray-600">
                <strong>LGA:</strong> {member.lga}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExcoGallery;
