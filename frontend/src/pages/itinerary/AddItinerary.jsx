import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddItinerary = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/itineraries", formData);
      navigate("/admin/itinerary"); // redirect to list
    } catch (error) {
      console.error("Error creating itinerary:", error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">➕ Add New Itinerary</h2>
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
          value={formData.start_date}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="end_date"
          className="w-full border p-2 rounded"
          value={formData.end_date}
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
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddItinerary;
