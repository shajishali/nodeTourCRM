import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/common/Navigation";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import About from "./pages/About"; 
import ItineraryPage from "./pages/itinerary/ItineraryPage"; 


// Itinerary Management Pages
// import ItineraryList from "./pages/itinerary/ItineraryList";
import AddItinerary from "./pages/itinerary/AddItinerary";
// import EditItinerary from "./pages/itinerary/EditItinerary";
// import ViewItinerary from "./pages/itinerary/ViewItinerary";
// import BookingPage from "./pages/itinerary/BookingPage";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        {/* 🌐 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Add this line: */}
        <Route path="/about" element={<About />} />

        {/* 👥 User Routes */}
        <Route path="/user/dashboard" element={<UserDashboard />} />

        {/* 🛠️ Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* 📋 Itinerary Management Routes */}
        {/* <Route path="/itineraries" element={<ItineraryList />} /> */}
        {/*<Route path="/itineraries/add" element={<AddItinerary />} />*/}
        {/* <Route path="/itineraries/edit/:id" element={<EditItinerary />} /> */}
        {/* <Route path="/itineraries/view/:id" element={<ViewItinerary />} /> */}
        {/* <Route path="/itineraries/book/:id" element={<BookingPage />} /> */}

        {/* 🚨 Catch-all route */}
        <Route path="*" element={<h1 className="text-center mt-10 text-2xl">404 - Page Not Found</h1>} />

        {/* other routes */}
      <Route path="/itinerary" element={<ItineraryPage />} /> {/* ✅ Add this */}
      </Routes>
    </Router>
  );
}

export default App;
