import { useEffect, useState } from "react";
import { BASE_URL, COLORS } from "../../../constants";

const VisionAndMission = () => {
  interface SectionContent {
    _id: string;
    title: string;
    content: string;
  }

  const [sectionContent, setSectionContent] = useState<SectionContent[]>([]);

  const fetchVisionMission = async () => {
    try {
      const response = await fetch(`${BASE_URL}/vision-mission/all`);
      const data = await response.json();

      setSectionContent(data);
    } catch (error) {
      console.error("Failed to fetch vision and mission content:", error);
    }
  };

  useEffect(() => {
    fetchVisionMission();
  }, []);

  return (
    <section id="vision-&-mission" className="w-full bg-gray-100 py-16 px-4">
      <div className="container mx-auto max-w-4xl space-y-12">
        {sectionContent.length > 0 ? (
          sectionContent.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md p-8 transform transition-all hover:scale-[1.02] hover:shadow-lg"
            >
              <h2
                className="text-4xl md:text-5xl font-bold text-center mb-6 pb-4 border-b-4 border-yellow-500"
                style={{ color: COLORS.Yellow }}
              >
                {item.title}
              </h2>

              <div className="text-lg md:text-xl text-gray-800 leading-relaxed whitespace-pre-line prose prose-lg prose-yellow">
                {item.content.split("\n").map((paragraph, i) => (
                  <p key={i} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </section>
  );
};

export default VisionAndMission;
