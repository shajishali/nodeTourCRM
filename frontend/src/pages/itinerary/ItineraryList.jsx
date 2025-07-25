// src/pages/ItineraryList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ItineraryList = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch all itineraries
  const fetchItineraries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/itineraries");
      setItineraries(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      alert("Failed to fetch itineraries.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  // Delete itinerary
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this itinerary?")) return;
    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:5000/api/itineraries/${id}`);
      fetchItineraries();
    } catch (error) {
      console.error("Error deleting itinerary:", error);
      alert("Failed to delete itinerary.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <p className="text-center py-4 animate-pulse">🔄 Loading itineraries...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Itineraries</h2>
      <Link
        to="/admin/itinerary/add"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 inline-block"
      >
        ➕ Add New Itinerary
      </Link>

      {itineraries.length === 0 ? (
        <p>No itineraries found.</p>
      ) : (
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Destination</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">End Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {itineraries.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.title}</td>
                <td className="border px-4 py-2">{item.destination}</td>
                <td className="border px-4 py-2">{new Date(item.start_date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{new Date(item.end_date).toLocaleDateString()}</td>
                <td className="border px-4 py-2 space-x-2">
                  <Link
                    to={`/admin/itinerary/view/${item.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    to={`/admin/itinerary/edit/${item.id}`}
                    className="text-yellow-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className={`text-red-600 hover:underline ${deletingId === item.id ? "opacity-50" : ""}`}
                  >
                    {deletingId === item.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ItineraryList;
