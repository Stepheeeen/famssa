import { Upload } from "lucide-react";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { useState } from "react";
import { BASE_URL } from "../../../../constants";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dlyu92juc/upload";
const CLOUDINARY_UPLOAD_PRESET = "famssa";

const UploadPDF = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [description, setDescription] = useState("");
  const [documentType, setDocumentType] = useState("Free Material");
  const [file, setFile] = useState<File | null>(null);
  const [price, setPrice] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file to Cloudinary");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };

  const handleUpload = async () => {
    setMessage("");

    if (!courseTitle || !courseCode || !file) {
      setMessage("Please fill all fields and select a file.");
      return;
    }

    setLoading(true);

    try {
      // Upload to Cloudinary first
      const fileUrl = await uploadToCloudinary(file);
      if (!fileUrl) {
        throw new Error("File upload failed. Please try again.");
      }

      // Determine boolean value for isPremium
      const isPremium = documentType === "Premium Material";

      // Send the file URL to backend
      const response = await fetch(`${BASE_URL}/library/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: courseTitle,
          courseCode,
          description,
          isPremium, // Send boolean instead of string
          price,
          fileUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed");
      }

      setMessage("✅ Upload successful!");
      setCourseTitle("");
      setCourseCode("");
      setDescription("");
      setFile(null);
      setDocumentType("Free Material");

      window.location.reload();
    } catch (error: any) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Upload PDF Documents</h3>

      <p
        className={`mb-4 text-sm ${
          message.startsWith("✅") ? "text-green-600" : "text-red-600"
        }`}
      >
        {message}
      </p>

      <div className="mb-6">
        <div className="mb-4">
          <Label htmlFor="courseTitle">Course Title</Label>
          <Input
            id="courseTitle"
            type="text"
            className="mt-2"
            placeholder="Human Resource Management"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="courseCode">Course Code</Label>
          <Input
            id="courseCode"
            type="text"
            className="mt-2"
            placeholder="HSM 201"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="Description">Description</Label>
          <Input
            id="Description"
            type="text"
            className="mt-2"
            placeholder="Course description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <label className="block text-sm font-medium mb-2">Document Type</label>
        <div className="flex space-x-4 mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="documentType"
              value="Free Material"
              checked={documentType === "Free Material"}
              onChange={(e) => setDocumentType(e.target.value)}
              className="h-4 w-4"
            />
            <span>Free Material</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="documentType"
              value="Premium Material"
              checked={documentType === "Premium Material"}
              onChange={(e) => setDocumentType(e.target.value)}
              className="h-4 w-4"
            />
            <span>Premium Material</span>
          </label>
        </div>

        <div
          className={`mb-4 ${
            documentType === "Premium Material" ? "block" : "hidden"
          }`}
        >
          <Label htmlFor="price" className="text-base">
            Price
          </Label>
          <div className="mt-2 flex items-center space-x-2">
            <span>NGN</span>
            <Input
              id="price"
              type="number"
              placeholder="500"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-sm text-gray-500 mb-2">
          Drag and drop your PDF files here
        </p>
        <p className="text-xs text-gray-400 mb-4">or</p>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mt-4"
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`px-6 py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600"
          }`}
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </div>
    </div>
  );
};

export default UploadPDF;
