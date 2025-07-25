import { useEffect, useState } from "react";
import axios from "../../services/axios";
import ItineraryCard from "../../components/ItineraryCard";

export default function ItineraryPage() {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    axios.get("/itineraries")
      .then(res => setItineraries(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 dark:bg-gray-800">
      <h1 className="w-full flex justify-center text-4xl font-bold mb-[40px] mt-[40px] dark:text-gray-300">Available Itineraries</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {itineraries.length === 0 ? (
          <p>No itineraries available.</p>
        ) : (
          itineraries.map(itinerary => (
            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
          ))
        )}
      </div>
    </div>
  );
}
