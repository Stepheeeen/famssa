import { COLORS } from "../../../constants";
import Title from "../../custom/Topography";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Link } from "react-router-dom";

const newsData = [
  {
    id: 1,
    title: "FAMSSA Launches New Initiative",
    summary:
      "FAMSSA introduces a new program to support students and enhance academic excellence.",
    link: "#",
  },
  {
    id: 2,
    title: "Upcoming General Meeting",
    summary:
      "Join us for the next general meeting to discuss future plans and events.",
    link: "#",
  },
  {
    id: 3,
    title: "Scholarship Opportunities Available",
    summary: "Check out the latest scholarships available for FAMSSA students.",
    link: "#",
  },
];

const NewsForum = () => {
  return (
    <section className="py-10 px-6 mt-10" id="news-forum">
      <div className="max-w-4xl mx-auto text-center">
        <Title custom={"font-semibold"}>News Forum</Title>
        <p className="text-gray-600 mt-1">
          Stay updated with the latest news and updates from FAMSSA.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {newsData.map((news) => (
          <Card key={news.id} className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-xl" style={{ color: COLORS.Yellow }}>
                {news.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{news.summary}</p>
              <Link
                to={news.link}
                className="hover:underline text-sm mt-2 inline-block "
                style={{ color: COLORS.Primary }}
              >
                Read more →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default NewsForum;
