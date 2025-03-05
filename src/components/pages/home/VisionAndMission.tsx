import { COLORS } from "../../../constants";

const VisionAndMission = () => {
  const sectionContent = [
    {
      text: "Mission",
      content: `The Faculty of Management Sciences at Federal University Lokoja is committed to providing high-quality education, research, and community service in the fields of business, management, and related disciplines. 

Our mission is to:
1. Empower students – Provide students with the knowledge, skills, and values necessary to succeed in their chosen careers and contribute meaningfully to society.
2. Advance knowledge – Conduct research that enhances the understanding of management sciences and informs best practices in business and industry.
3. Foster partnerships – Collaborate with businesses, government agencies, and stakeholders to drive economic development, entrepreneurship, and social responsibility.
4. Develop leaders – Inspire and equip students to become effective leaders, entrepreneurs, and change agents within their communities.`,
    },
    {
      text: "Vision",
      content: `Our vision is to become a leading faculty in this great citadel of learning, recognized for our academic excellence, research relevance, and community impact.`,
    },
    {
      text: "Our Values",
      content: `We uphold the following core values:

1. Excellence – Striving for excellence in teaching, research, and service.
2. Integrity – Operating with transparency, honesty, and accountability.
3. Innovation – Encouraging creativity, innovation, and entrepreneurship.
4. Diversity – Promoting inclusivity, equity, and respect for all.`,
    },
  ];

  return (
    <section id="vision-&-mission" className="w-full bg-gray-100 py-16 px-4">
      <div className="container mx-auto max-w-4xl space-y-12">
        {sectionContent.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-8 transform transition-all hover:scale-[1.02] hover:shadow-lg"
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-center mb-6 pb-4 border-b-4 border-yellow-500"
              style={{ color: COLORS.Yellow }}
            >
              {item.text}
            </h2>

            <div className="text-lg md:text-xl text-gray-800 leading-relaxed whitespace-pre-line prose prose-lg prose-yellow">
              {item.content.split("\n").map((paragraph, i) => (
                <p key={i} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VisionAndMission;
