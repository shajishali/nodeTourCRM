import { useState } from "react";
import { BookBookmark, CrosshairSimple, UserMinus, Users } from "phosphor-react";
import UsersManagement from "./UsersManagement";
import ItineraryManagment from "./ItineraryManagment";
import BookingManagement from "./BookingManagement";

// Capitalize function
function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// MenuItem component
const MenuItem = ({ menu, selected, onSelect }) => {
  const isSelected = selected === menu;

  return (
    <button
      onClick={() => onSelect(menu)}
      className={`px-2 py-2 rounded-md flex items-center w-full gap-2 mt-6 ${
        isSelected
          ? "text-white bg-blue-500"
          : "text-black dark:text-gray-400"
      }`}
    >
      { menu === "itineraries" ? (
        <CrosshairSimple size={24}/>
      ) : menu === "bookings" ? (
        <BookBookmark size={24}/>
      ) : (
        <Users size={24}/>
      )}
      Manage {capitalize(menu)}
    </button>
  );
};

const AdminDashboard = () => {
  const [selected, setSelected] = useState(null);

  const handleSelectMenu = (menu) => {
    setSelected(menu);
  };

  const menus = ["users", "itineraries", "bookings"];

  return (
    <div className="flex justify-between w-screen h-screen dark:bg-gray-800">
      <div className="w-3/10 border-r p-4 text-black dark:text-white">
        <h1 className="font-bold text-2xl dark:text-gray-300">Operations</h1>

        {menus.map((menu) => (
          <MenuItem
            key={menu}
            menu={menu}
            selected={selected}
            onSelect={handleSelectMenu}
          />
        ))}
      </div>

      <div className="flex-1">
        { selected === "users" ? (
          <UsersManagement />
        ) : selected === "itineraries" ? (
          <ItineraryManagment />
        ) : (
          <BookingManagement />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
