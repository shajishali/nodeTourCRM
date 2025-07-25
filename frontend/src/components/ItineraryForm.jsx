import { useState } from 'react';

export default function ItineraryForm({ initialData, onSubmit }) {
  const [form, setForm] = useState(
    initialData || {
      client_name: '',
      destination: '',
      start_date: '',
      end_date: '',
      price: '',
      activities: ''
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      activities: form.activities.split(',').map((act) => act.trim())
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="client_name"
        placeholder="Client Name"
        value={form.client_name}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />
      <input
        name="destination"
        placeholder="Destination"
        value={form.destination}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="date"
        name="start_date"
        value={form.start_date}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="date"
        name="end_date"
        value={form.end_date}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />
      <textarea
        name="activities"
        placeholder="Activities (comma separated)"
        value={form.activities}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Itinerary
      </button>
    </form>
  );
}
