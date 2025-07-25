import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SunDim, Moon } from "phosphor-react";
import { useAuth } from "../../context/AuthContext";

export default function Navigation() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  // On initial load, sync dark mode with document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              NodeTour CRM
            </Link>
          </div>

          {/* Menu Links */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/itinerary" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
              Itinerary
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
              About
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-500"
            >
              {darkMode ? <Moon size={32} /> : <SunDim size={32} />}
            </button>
            { isAuthenticated ? (
              <button onClick={handleLogout} className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-600">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-600">
                  Login
                </Link>  
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) }
          </div>
        </div>
      </div>
    </nav>
  );
}
