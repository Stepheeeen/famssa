const EditHomepage = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Edit Homepage Content</h3>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Hero Title</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          defaultValue="Professional PDF Resources & CBE Question Bank"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          defaultValue="Access thousands of professional resources to ace your exams"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Featured Content
        </label>
        <div className="border p-4 rounded mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Section 1</span>
            <div className="flex space-x-2">
              <button className="text-gray-500">Edit</button>
              <button className="text-red-500">Remove</button>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Medical Resources - Over 500 PDFs available
          </p>
        </div>

        <div className="border p-4 rounded mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Section 2</span>
            <div className="flex space-x-2">
              <button className="text-gray-500">Edit</button>
              <button className="text-red-500">Remove</button>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Question Bank - Practice with 10,000+ CBE questions
          </p>
        </div>

        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">
          + Add New Section
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Pricing Section Title
        </label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          defaultValue="Choose the Right Plan for You"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Homepage Banner
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <img
            src="/api/placeholder/1200/300"
            alt="placeholder"
            className="mx-auto mb-4 rounded"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Change Banner Image
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button className="border border-gray-300 px-6 py-2 rounded">
          Preview Changes
        </button>
        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditHomepage;
