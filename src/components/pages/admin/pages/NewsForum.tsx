import { useEffect, useState } from "react";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Label } from "../../../ui/label";
import { Card } from "../../../ui/card";
import { BASE_URL } from "../../../../constants";

export const AdminNewsForum = () => {
  interface NewsItem {
    _id: any;
    title: string;
    summary: string;
    link: string;
  }

  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSections = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/news-forum/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch News");
        }
        const data = await response.json();
        setNewsList(data); // assuming `data` is an array
        setError("");
      } catch (err) {
        setError("Error loading sections");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  const handleChange = (
    index: number,
    field: "title" | "summary" | "link",
    value: string
  ) => {
    const updated = [...newsList];
    updated[index][field] = value;
    setNewsList(updated);
  };

  const handleAdd = () => {
    setNewsList([
      ...newsList,
      { _id: Date.now(), title: "", summary: "", link: "#" },
    ]);
  };

  const handleDelete = (id: number) => {
    const updated = newsList.filter((item) => item._id !== id);
    setNewsList(updated);
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/news-forum/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsList),
      });

      if (!response.ok) throw new Error("Failed to update news forum");

      alert("News Forum updated successfully!");
    } catch (error) {
      console.error("Error updating news forum:", error);
      alert("Failed to update news forum.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Edit News Forum</h2>
        <Button onClick={handleAdd}>+ Add News Item</Button>
      </div>

      {newsList.map((item, index) => (
        <Card key={item?._id} className="p-4 space-y-4 relative">
          <div className="grid gap-4">
            <div>
              <Label htmlFor={`title-${index}`}>Title</Label>
              <Input
                id={`title-${index}`}
                value={item.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
              />
            </div>

            <div className="my-2">
              <Label htmlFor={`summary-${index}`}>Summary</Label>
              <textarea
                id={`summary-${index}`}
                value={item.summary}
                rows={4}
                className="w-full border-1 p-2 rounded"
                onChange={(e) => handleChange(index, "summary", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor={`link-${index}`}>Link</Label>
              <Input
                id={`link-${index}`}
                value={item.link}
                onChange={(e) => handleChange(index, "link", e.target.value)}
              />
            </div>
          </div>

          <Button
            variant="destructive"
            className="absolute top-4 right-4"
            onClick={() => handleDelete(item._id)}
          >
            Delete
          </Button>
        </Card>
      ))}

      <Button className="mt-4" onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
};
