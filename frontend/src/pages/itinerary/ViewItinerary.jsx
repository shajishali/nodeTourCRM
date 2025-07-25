// src/pages/ViewItinerary.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ViewItinerary = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch one itinerary by ID
  const fetchItinerary = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/itineraries/${id}`);
      setItinerary(res.data);
    } catch (err) {
      console.error("Error fetching itinerary:", err);
      alert("Could not fetch itinerary");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItinerary();
  }, [id]);

  if (loading) return <p className="p-4 animate-pulse">🔄 Loading...</p>;

  if (!itinerary) return <p className="p-4 text-red-500">Itinerary not found.</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📋 Itinerary Details</h2>

      <div className="space-y-3 text-lg">
        <p><strong>Title:</strong> {itinerary.title}</p>
        <p><strong>Destination:</strong> {itinerary.destination}</p>
        <p><strong>Start Date:</strong> {new Date(itinerary.start_date).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(itinerary.end_date).toLocaleDateString()}</p>
      </div>

      <Link
        to="/admin/itineraries"
        className="mt-6 inline-block bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
      >
        ⬅ Back to Itineraries
      </Link>
    </div>
  );
};

export default ViewItinerary;
