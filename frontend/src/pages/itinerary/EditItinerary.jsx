import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditItinerary = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  // Fetch itinerary by ID
  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/itineraries/${id}`);
        setFormData(res.data);
      } catch (error) {
        console.error("Failed to load itinerary", error);
      }
    };

    fetchItinerary();
  }, [id]);

  // Update state on input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/itineraries/${id}`, formData);
      navigate("/admin/itinerary");
    } catch (error) {
      console.error("Failed to update itinerary", error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">✏️ Edit Itinerary</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="destination"
          placeholder="Destination"
          className="w-full border p-2 rounded"
          value={formData.destination}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="start_date"
          className="w-full border p-2 rounded"
          value={formData.start_date?.split("T")[0]}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="end_date"
          className="w-full border p-2 rounded"
          value={formData.end_date?.split("T")[0]}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded"
          rows={4}
          value={formData.description}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditItinerary;
