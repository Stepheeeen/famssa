import { useState, useEffect } from "react";
import { BASE_URL } from "../../../../constants";

export const AdminExcoPage = () => {
  interface Exco {
    id?: string;
    _id?: string;
    image: string;
    name: string;
    department: string;
    position: string;
    state: string;
    lga: string;
  }

  const [excos, setExcos] = useState<Exco[]>([]);
  const [formData, setFormData] = useState<Exco>({
    image: "",
    name: "",
    department: "",
    position: "",
    state: "",
    lga: "",
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExcos();
  }, []);

  const fetchExcos = async () => {
    try {
      const response = await fetch(`${BASE_URL}/exco/`);
      const data = await response.json();
      setExcos(data);
    } catch (error) {
      console.error("Error fetching excos:", error);
    }
  };

  const handleChange = async (e: any) => {
    const { name, value, files } = e.target;

    if (name === "image" && files?.[0]) {
      try {
        const file = files[0];
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("upload_preset", "famssa");

        const uploadResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dlyu92juc/image/upload",
          {
            method: "POST",
            body: uploadData,
          }
        );

        const result = await uploadResponse.json();
        setFormData((prev) => ({ ...prev, image: result.secure_url }));
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = editIndex !== null ? "PUT" : "POST";
      const url =
        editIndex !== null
          ? `${BASE_URL}/exco/${excos[editIndex].id}` // Replace with your actual id field
          : `${BASE_URL}/exco/`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save Exco");
      }

      await fetchExcos(); // Refresh the list
      alert("Exco saved successfully!");

      setFormData({
        image: "",
        name: "",
        department: "",
        position: "",
        state: "",
        lga: "",
      });
      setEditIndex(null);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      alert(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index: number) => {
    setFormData(excos[index]);
    setEditIndex(index);
  };

  const handleDelete = async (index: number) => {
    const excoToDelete = excos[index];

    try {
      const response = await fetch(`${BASE_URL}/exco/${excoToDelete._id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete Exco member");

      await fetchExcos(); // Refresh after deletion
    } catch (error) {
      console.error("Error deleting Exco:", error);
      alert("Failed to delete Exco.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Admin - Exco Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block text-sm font-semibold mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="w-full h-40 object-cover mt-2 rounded"
            />
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2"
            required
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            className="border p-2"
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="text"
            name="lga"
            placeholder="LGA"
            value={formData.lga}
            onChange={handleChange}
            className="border p-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : editIndex !== null
              ? "Update Exco"
              : "Add Exco"}
          </button>
        </div>
      </form>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">All Excos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {excos.map((member, index) => (
            <div
              key={member.id || index}
              className="border p-4 rounded-lg bg-gray-50 shadow-sm"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover rounded"
              />
              <div className="mt-2">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.position}</p>
                {member.department && (
                  <p className="text-sm text-gray-500">
                    Dept: {member.department}
                  </p>
                )}
                <p className="text-sm">
                  {member.state} - {member.lga}
                </p>
              </div>
              <div className="flex justify-between mt-3">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
