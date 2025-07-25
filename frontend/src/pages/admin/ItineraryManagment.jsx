import { useState, useEffect } from "react";
import axios from "../../services/axios";
import { Eye, Plus } from "phosphor-react";
import React from "react";

const ItineraryForm = ({
  setName, setLongitude, setLatitude, setDescription, setImageUrl, setType,
  setAddress, setCity, setDistrict, setCountry, setRating, setEntryFee,
  setContact, setWebsite, setOpening
}) => {
  return (
    <div className="p-4 max-w-3xl">
      <h1 className="text-2xl font-semibold mb-4 dark:text-white">Add Itinerary</h1>

      <div className="grid grid-cols-2 gap-4">
        <input onChange={(e) => setName(e.target.value)} placeholder="Name" className="p-2 border rounded" />
        <input onChange={(e) => setType(e.target.value)} placeholder="Type" className="p-2 border rounded" />
        <input onChange={(e) => setLongitude(e.target.value)} placeholder="Longitude" className="p-2 border rounded" />
        <input onChange={(e) => setLatitude(e.target.value)} placeholder="Latitude" className="p-2 border rounded" />
        <input onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" className="p-2 border rounded" />
        <input onChange={(e) => setRating(e.target.value)} placeholder="Rating" className="p-2 border rounded" />
        <input onChange={(e) => setEntryFee(e.target.value)} placeholder="Entry Fee" className="p-2 border rounded" />
        <input onChange={(e) => setContact(e.target.value)} placeholder="Contact" className="p-2 border rounded" />
        <input onChange={(e) => setWebsite(e.target.value)} placeholder="Website" className="p-2 border rounded" />
        <input onChange={(e) => setOpening(e.target.value)} placeholder="Opening Hours" className="p-2 border rounded" />
        <input onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="p-2 border rounded" />
        <input onChange={(e) => setCity(e.target.value)} placeholder="City" className="p-2 border rounded" />
        <input onChange={(e) => setDistrict(e.target.value)} placeholder="District" className="p-2 border rounded" />
        <input onChange={(e) => setCountry(e.target.value)} placeholder="Country" className="p-2 border rounded" />
      </div>

      <textarea onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="p-2 border rounded w-full mt-4" rows={4} />

    </div>
    
  );
};                      

const ItineraryTable = ({ itineraries }) => {
  return (
    <div className="p-4 overflow-x-auto">
      <h1 className="text-2xl font-semibold mb-4 dark:text-white">Itineraries</h1>
      <table className="min-w-full table-auto border">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-left text-sm font-semibold">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">City</th>
            <th className="p-2 border">Rating</th>
            <th className="p-2 border">Country</th>
          </tr>
        </thead>
        <tbody>
          {itineraries?.map((item, i) => (
            <tr key={i} className="border-b dark:border-gray-600">
              <td className="p-2 border">{item.name}</td>
              <td className="p-2 border">{item.type}</td>
              <td className="p-2 border">{item.city}</td>
              <td className="p-2 border">{item.rating}</td>
              <td className="p-2 border">{item.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function ItineraryManagement() {
  const [itineraries, setItineraries] = useState([]);

  // Form states
  const [name, setName] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [country, setCountry] = useState("");
  const [rating, setRating] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [opening, setOpening] = useState("");

  const [current, setCurrent] = useState("view");

  const fetchItineraries = async () => {
    try {
      const result = await axios.get("/itineraries");
      setItineraries(result.data); // <- fix this line from result.body to result.data
    } catch (err) {
      console.log(err);
    }
  };

  const switchPanel = (page) => {
    setCurrent(page);
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  return (
    <div className="dark:bg-gray-800 min-h-screen">
      <div className="p-4 border-b flex gap-3">
        <button
          onClick={() => switchPanel("view")}
          className={`flex justify-between gap-2 px-4 py-1 rounded-md font-semibold ${
            current === "view"
              ? "text-white bg-blue-500"
              : "text-black bg-gray-300 dark:bg-gray-600 dark:text-gray-300"
          }`}
        >
          <Eye size={24} /> View
        </button>
        <button
          onClick={() => switchPanel("add")}
          className={`flex justify-between gap-2 px-4 py-1 rounded-md font-semibold ${
            current === "add"
              ? "text-white bg-blue-500"
              : "text-black bg-gray-300 dark:bg-gray-600 dark:text-gray-300"
          }`}
        >
          <Plus size={24} /> Add
        </button>
      </div>

      <div>
        {current === "view" ? (
          <ItineraryTable itineraries={itineraries} />
        ) : (
          <ItineraryForm
            setName={setName}
            setLongitude={setLongitude}
            setLatitude={setLatitude}
            setDescription={setDescription}
            setImageUrl={setImageUrl}
            setType={setType}
            setAddress={setAddress}
            setCity={setCity}
            setDistrict={setDistrict}
            setCountry={setCountry}
            setRating={setRating}
            setEntryFee={setEntryFee}
            setContact={setContact}
            setWebsite={setWebsite}
            setOpening={setOpening}
          />
        )}
      </div>
    </div>
  );
}
