import { useEffect, useState } from "react";
import Title from "../../custom/Topography";
import { BASE_URL } from "../../../constants";

const ExcoGallery = () => {
  const [excos, setExcos] = useState([]);

  useEffect(() => {
    const fetchExcos = async () => {
      try {
        const res = await fetch(`${BASE_URL}/exco/`);
        const data = await res.json();
        setExcos(data);
      } catch (error) {
        console.error("Error fetching excos:", error);
      }
    };

    fetchExcos();
  }, []);

  return (
    <section className="py-10 px-6 mt-10 bg-gray-100" id="excos">
      <div className="max-w-4xl mx-auto text-center">
        <Title custom={"font-semibold"}>Excos</Title>
        <p className="text-gray-600 mt-1">Meet our esteemed executives.</p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {excos.map((member: any, index: number) => (
          <div
            key={member._id || index}
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
              {member.department && (
                <p className="text-gray-600">
                  <strong>Department:</strong> {member.department}
                </p>
              )}
              <p className="text-gray-600">
                <strong>State:</strong> {member.state}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExcoGallery;
