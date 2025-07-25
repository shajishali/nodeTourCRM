export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow mt-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">About NodeTour CRM</h1>
      <p className="text-gray-700 mb-4">
        <strong>NodeTour CRM</strong> is a powerful, all-in-one Customer Relationship Management system designed
        specifically for the tourism and travel industry. Our platform helps travel agencies and tour operators 
        efficiently manage client itineraries, bookings, and invoices with ease.
      </p>
      <p className="text-gray-700 mb-4">
        Whether you're planning complex travel packages or simple getaways, NodeTour CRM provides tools to 
        create, edit, and manage itineraries seamlessly. From uploading beautiful destination images to 
        generating professional PDF summaries for your clients, NodeTour CRM streamlines your workflow 
        and enhances client satisfaction.
      </p>
      <h2 className="text-2xl font-bold text-blue-600 mt-6 mb-2">Key Features</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>📋 Easy Itinerary Management (Create, Read, Update, Delete)</li>
        <li>🖼 Upload destination images for each itinerary</li>
        <li>📄 Generate and download PDF summaries for clients</li>
        <li>🔒 Secure login system with route protection</li>
        <li>📱 Fully responsive design for mobile, tablet, and desktop</li>
      </ul>
      <h2 className="text-2xl font-bold text-blue-600 mt-6 mb-2">Our Mission</h2>
      <p className="text-gray-700 mb-4">
        At NodeTour, we aim to simplify travel management for businesses by providing a modern,
        intuitive CRM system that improves efficiency and enhances client experiences.
      </p>
      <h2 className="text-2xl font-bold text-blue-600 mt-6 mb-2">Contact Us</h2>
      <p className="text-gray-700">
        📧 Email: <a href="mailto:support@nodetour.com" className="text-blue-600 hover:underline">support@nodetour.com</a><br />
        📞 Phone: +94 77 639 5789<br />
        📍 Address: 63A, Manning Place, Wellawatta, Colombo-00600
      </p>
    </div>
  );
}
