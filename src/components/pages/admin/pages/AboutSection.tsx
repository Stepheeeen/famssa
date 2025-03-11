import { useState } from "react";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Label } from "../../../ui/label";
import { BASE_URL } from "../../../../constants";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { FileInput, Upload } from "lucide-react";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dlyu92juc/upload";
const CLOUDINARY_UPLOAD_PRESET = "famssa";

const AdminAboutSection = () => {
  const [aboutText, setAboutText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSave = async () => {
    setLoading(true);

    const logoUrl = await uploadImage();
    if (!logoUrl) {
      alert("Failed to upload image.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/about/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logoUrl,
          aboutText,
        }),
      });

      console.log(logoUrl, aboutText);

      if (!response.ok) throw new Error("Failed to update about section");

      alert("About section updated!");
    } catch (error) {
      console.error("Error updating about section:", error);
      alert("Failed to update about section.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card className="shadow-lg border border-gray-100">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Edit About Section
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="image"
              className="text-sm font-medium text-gray-700"
            >
              About Image
            </Label>
            <div className="flex items-center flex-col-reverse gap-y-3.5 justify-between lg:flex-row-reverse space-x-4">
              <div className="relative">
                <Button
                  variant="outline"
                  className=""
                  // onClick={() => document.getElementById("image").click()}
                >
                  <Input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-32 flex flex-col items-center justify-center border-dashed border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  />
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload Logo</span>
                </Button>
              </div>

              {imagePreview && (
                <div className="relative group">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-96 object-contain rounded-lg shadow-md border border-gray-200"
                  />
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity cursor-pointer"
                    onClick={() => setImagePreview("")}
                  >
                    <span className="text-white text-xs font-medium">
                      Remove
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="about-text"
              className="text-sm font-medium text-gray-700"
            >
              About Description
            </Label>
            <textarea
              id="about-text"
              rows={8}
              placeholder="Describe your company, mission, and values..."
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              className="resize-none w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              {aboutText.length} characters • Recommended: 200-500 characters
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              variant="outline"
              className="mr-2 text-gray-700"
              disabled={loading}
            >
              Cancel
            </Button>
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
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAboutSection;
