import { Upload } from "lucide-react";

const UploadPDF = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Upload PDF Documents</h3>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Document Type</label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="documentType"
              className="h-4 w-4"
              defaultChecked
            />
            <span>Free Content</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="documentType" className="h-4 w-4" />
            <span>Premium Content</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Category</label>
        <select className="w-full p-2 border rounded">
          <option>Medical</option>
          <option>Legal</option>
          <option>Technical</option>
          <option>Educational</option>
        </select>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-sm text-gray-500 mb-2">
          Drag and drop your PDF files here
        </p>
        <p className="text-xs text-gray-400 mb-4">or</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Browse Files
        </button>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Upload Files
        </button>
      </div>
    </div>
  );
};

export default UploadPDF;
