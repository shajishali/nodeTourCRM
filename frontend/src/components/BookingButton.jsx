import { useNavigate } from 'react-router-dom';

export default function BookingButton({ itineraryId }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/book/${itineraryId}`)}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-2"
    >
      Book Now
    </button>
  );
}
