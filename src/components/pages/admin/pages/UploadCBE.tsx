import { Upload } from "lucide-react";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { useState } from "react";
import * as XLSX from "xlsx";
import { BASE_URL } from "../../../../constants";

const UploadCBE = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const extractQuestionsFromExcel = async (file: File) => {
    return new Promise<{ questions: any[] }>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet);

          const formattedQuestions = jsonData.map((row: any) => ({
            question: row.Question,
            correctAnswer: row.CorrectAnswer,
            options: [
              row.OptionA,
              row.OptionB,
              row.OptionC,
              row.OptionD,
            ].filter(Boolean),
          }));

          resolve({ questions: formattedQuestions });
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const handleUpload = async () => {
    setMessage("");

    if (!courseTitle || !courseCode || !file) {
      setMessage("Please fill all fields and select a file.");
      return;
    }

    setLoading(true);

    try {
      const { questions } = await extractQuestionsFromExcel(file);

      const response = await fetch(`${BASE_URL}/cbepdf/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: courseTitle,
          courseCode,
          difficulty,
          description,
          questions,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed");
      }

      setMessage("✅ Upload successful!");
      window.location.reload();
    } catch (error: any) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Upload CBE Questions</h3>

      <p
        className={`mb-4 text-sm ${
          message.includes("✅") ? "text-green-600" : "text-red-600"
        }`}
      >
        {message}
      </p>

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

      <div className="mb-4">
        <Label htmlFor="difficulty">Difficulty Level</Label>
        <select
          id="difficulty"
          className="w-full p-2 border rounded mt-2"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
          <option>Expert</option>
        </select>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-3" />
        <p className="text-sm text-gray-500">
          Upload questions file (CSV or Excel)
        </p>
        <input
          type="file"
          accept=".csv, .xls, .xlsx"
          onChange={handleFileChange}
          className="mt-4"
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`px-6 py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600"
          }`}
        >
          {loading ? "Uploading..." : "Upload Questions"}
        </button>
      </div>
    </div>
  );
};

export default UploadCBE;
