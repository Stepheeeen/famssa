import { useEffect, useState } from "react";
import { BASE_URL, COLORS } from "../../../constants";
import Title from "../../custom/Topography";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Link } from "react-router-dom";

const NewsForum = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${BASE_URL}/news-forum/all`);
        const data = await res.json();
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching news forum:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="py-10 px-6 mt-10" id="news-forum">
      <div className="max-w-4xl mx-auto text-center">
        <Title custom={"font-semibold"}>News Forum</Title>
        <p className="text-gray-600 mt-1">
          Stay updated with the latest news and updates from FAMSSA.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {newsData.map((news: any) => (
          <Card key={news._id} className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-xl" style={{ color: COLORS.Yellow }}>
                {news.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{news.summary}</p>
              <Link
                to={news.link || "#"}
                className="hover:underline text-sm mt-2 inline-block"
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
