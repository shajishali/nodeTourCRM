import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  

  return (
    <div className="transition-colors duration-500">
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen transition-colors duration-500">

        {/* 🔝 Hero Section */}
        <section className="flex flex-col items-center text-center py-20 bg-blue-50 dark:bg-gray-800 transition-colors duration-500">
          <h2 className="text-4xl font-bold mb-4 transition-colors duration-500">
            Manage Your Tours with Ease
          </h2>
          <p className="text-lg mb-6 max-w-xl transition-colors duration-500">
            NodeTour CRM helps travel agencies handle itineraries, bookings,
            invoices, and more—all in one place.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-500"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded hover:bg-blue-100 transition-colors duration-500"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* 📋 Features Section */}
        <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 transition-colors duration-500">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition-all duration-500">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2 transition-colors duration-500">
              Itinerary Management
            </h3>
            <p className="transition-colors duration-500">
              Create, edit, and share itineraries with your clients easily.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition-all duration-500">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2 transition-colors duration-500">
              Admin & User Dashboards
            </h3>
            <p className="transition-colors duration-500">
              Separate dashboards for admins and users to stay organized.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition-all duration-500">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2 transition-colors duration-500">
              PDF Generation
            </h3>
            <p className="transition-colors duration-500">
              Generate downloadable summaries of itineraries with ease.
            </p>
          </div>
        </section>

        {/* 📞 Call to Action */}
        <footer className="bg-blue-600 dark:bg-blue-800 text-white text-center py-8 transition-colors duration-500">
          <p className="text-lg mb-4 transition-colors duration-500">Ready to start?</p>
          <Link
            to="/signup"
            className="px-6 py-3 bg-white text-blue-600 rounded hover:bg-gray-100 transition-colors duration-500"
          >
            Sign Up Now
          </Link>
        </footer>
      </div>
    </div>
  );
}
