import { useState } from "react";

// Import your individual admin section components
import AdminAboutSection from "./AboutSection";
import AdminVisionAndMission from "./VisionAndMission";
import { AdminExcoPage } from "./AdminExcoPage";
import { AdminNewsForum } from "./NewsForum";

const tabs = [
  { label: "About Section", value: "about" },
  { label: "Vision & Mission", value: "vision" },
  { label: "News Forum", value: "news" },
  { label: "Exco Gallery", value: "exco" },
];

const EditHomepage = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Homepage</h1>

      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded-lg font-semibold border ${
              activeTab === tab.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Render Sections */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        {activeTab === "about" && <AdminAboutSection />}
        {activeTab === "vision" && <AdminVisionAndMission />}
        {activeTab === "news" && <AdminNewsForum />}
        {activeTab === "exco" && <AdminExcoPage />}
      </div>
    </div>
  );
};

export default EditHomepage;
