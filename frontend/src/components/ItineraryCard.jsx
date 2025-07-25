import { useState } from "react";
import axios from "../services/axios";
import { useAuth } from "../context/AuthContext";
import { Bookmarks, Heart, Trash, FilePdf } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

export default function ItineraryCard({ itinerary }) {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [booked, setBooked] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const usr = JSON.parse(user || "{}");

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      await axios.post("/bookings", {
        itinerary_id: itinerary.id,
        user_id: usr.id,
      });
      setBooked(true);
      alert("Booking successful!");
    } catch (error) {
      console.error(error);
      alert("Failed to book itinerary. Please try again.");
    }
  };

  const handleWishList = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      await axios.post("/wish_list/add", {
        user_id: usr.id,
        location_id: itinerary.id,
      });
      setWishlisted(true);
      alert("Added to Wish List!");
    } catch (error) {
      console.error(error);
      alert("Failed to add to Wish List.");
    }
  };

  const handlePDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Itinerary Summary", 20, 20);

    doc.setFontSize(12);
    doc.text(`Client: ${usr.name || "N/A"}`, 20, 30);
    doc.text(`Destination: ${itinerary.destination}`, 20, 40);
    doc.text(`Dates: ${new Date(itinerary.start_date).toLocaleDateString()} - ${new Date(itinerary.end_date).toLocaleDateString()}`, 20, 50);
    doc.text(`Activities: ${itinerary.activities}`, 20, 60);
    doc.text(`Total Price: ${itinerary.total_price || "N/A"}`, 20, 70);

    // Load and add the image if available
    if (itinerary.image_url) {
      try {
        const imgResponse = await fetch(itinerary.image_url);
        const imgBlob = await imgResponse.blob();
        const reader = new FileReader();
        reader.onloadend = function () {
          const base64data = reader.result;
          doc.addImage(base64data, "PNG", 20, 80, 160, 90);
          doc.save(`Itinerary_${itinerary.destination}.pdf`);
        };
        reader.readAsDataURL(imgBlob);
      } catch (err) {
        console.error("Failed to load image:", err);
        doc.save(`Itinerary_${itinerary.destination}.pdf`);
      }
    } else {
      doc.save(`Itinerary_${itinerary.destination}.pdf`);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 mb-6 bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-2">{itinerary.title}</h2>
      <p><span className="font-semibold">Destination:</span> {itinerary.destination}</p>
      <p><span className="font-semibold">Dates:</span> {new Date(itinerary.start_date).toLocaleDateString()} - {new Date(itinerary.end_date).toLocaleDateString()}</p>
      <p><span className="font-semibold">Activities:</span> {itinerary.activities}</p>
      <p><span className="font-semibold">Total Price:</span> ${itinerary.total_price || "N/A"}</p>

      <div className="mt-4 flex gap-3">
        <button
          onClick={handleBooking}
          disabled={booked}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-white ${booked ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          {booked ? "Booked" : "Book"} <Bookmarks size={20} />
        </button>

        <button
          onClick={handleWishList}
          disabled={wishlisted}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-white ${wishlisted ? "bg-gray-400" : "bg-pink-500 hover:bg-pink-600"}`}
        >
          {wishlisted ? <Trash size={20} /> : <Heart size={20} />}
        </button>

        <button
          onClick={handlePDF}
          className="flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-white bg-green-600 hover:bg-green-700"
        >
          Generate PDF <FilePdf size={20} />
        </button>
      </div>
    </div>
  );
}
