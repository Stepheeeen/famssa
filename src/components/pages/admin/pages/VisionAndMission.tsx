import { useEffect, useState } from "react";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Label } from "../../../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Save, ChevronDown, ChevronUp, Pencil } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";
import { BASE_URL } from "../../../../constants";

const AdminVisionAndMission = () => {
  interface Section {
    title: string;
    content: string;
  }

  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchSections = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/vision-mission/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch sections");
        }
        const data = await response.json();
        setSections(data); // assuming `data` is an array
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

  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("edit");

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const handleChange = (
    index: number,
    field: "title" | "content",
    value: string
  ) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/vision-mission/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sections),
      });

      if (!response.ok) throw new Error("Failed to update vision & mission");

      // Success notification
      const notificationElement = document.getElementById("save-notification");
      if (notificationElement) {
        notificationElement.classList.remove("opacity-0");
        setTimeout(() => {
          notificationElement.classList.add("opacity-0");
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating vision & mission:", error);
      alert("Failed to update vision & mission.");
    } finally {
      setLoading(false);
    }
  };

  // Function to format content with proper line breaks for preview
  const formatContent = (content: string) => {
    return content
      .split("\\n")
      .join("\n")
      .split("\n")
      .map((line, i) => (
        <p key={i} className="mb-2">
          {line}
        </p>
      ));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {loading && <p>Loading sections...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <Card className="border border-gray-200 shadow-md">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Vision & Mission Management
              </CardTitle>
              <TabsList className="grid w-64 grid-cols-2">
                <TabsTrigger value="edit" className="text-sm">
                  <Pencil className="w-4 h-4 mr-2" /> Edit
                </TabsTrigger>
                <TabsTrigger value="preview" className="text-sm">
                  Preview
                </TabsTrigger>
              </TabsList>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <TabsContent value="edit" className="space-y-6 mt-0">
              {sections.map((section, index) => (
                <Card
                  key={index}
                  className="border border-gray-100 shadow-sm overflow-hidden"
                >
                  <div
                    className={`flex justify-between items-center p-4 cursor-pointer bg-gray-50 border-b ${
                      expandedSection === index
                        ? "border-gray-200"
                        : "border-transparent"
                    }`}
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700">
                        {section.title}
                      </span>
                      <div
                        id="save-notification"
                        className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-md opacity-0 transition-opacity duration-500"
                      >
                        Saved successfully
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      {expandedSection === index ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </Button>
                  </div>

                  {expandedSection === index && (
                    <div className="p-4 space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor={`title-${index}`}
                          className="text-sm font-medium text-gray-700"
                        >
                          Section Title
                        </Label>
                        <Input
                          id={`title-${index}`}
                          value={section.title}
                          onChange={(e) =>
                            handleChange(index, "title", e.target.value)
                          }
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor={`content-${index}`}
                          className="text-sm font-medium text-gray-700 flex justify-between"
                        >
                          <span>Content</span>
                          <span className="text-gray-500 text-xs">
                            Use \n for new lines • {section.content.length}{" "}
                            characters
                          </span>
                        </Label>
                        <textarea
                          id={`content-${index}`}
                          rows={8}
                          value={section.content}
                          onChange={(e) =>
                            handleChange(index, "content", e.target.value)
                          }
                          placeholder="Use \n for new lines or numbered lists"
                          className="resize-y min-h-[150px] w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </Card>
              ))}

              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save All Changes
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="mt-0">
              <div className="space-y-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                {sections.map((section, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">
                      {section.title}
                    </h3>
                    <div className="prose prose-blue max-w-none">
                      {formatContent(section.content)}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AdminVisionAndMission;
