import { Upload } from "lucide-react";

const UploadCBE = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Upload CBE Questions</h3>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Question Type</label>
        <select className="w-full p-2 border rounded">
          <option>Multiple Choice</option>
          <option>True/False</option>
          <option>Fill in the Blank</option>
          <option>Essay</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Difficulty Level
        </label>
        <select className="w-full p-2 border rounded">
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
          <option>Expert</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Subject Area</label>
        <select className="w-full p-2 border rounded">
          <option>Anatomy</option>
          <option>Physiology</option>
          <option>Biochemistry</option>
          <option>Pharmacology</option>
        </select>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-sm text-gray-500 mb-2">
          Upload questions file (CSV or Excel format)
        </p>
        <p className="text-xs text-gray-400 mb-4">or</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Browse Files
        </button>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Upload Questions
        </button>
      </div>
    </div>
  );
};

export default UploadCBE;
