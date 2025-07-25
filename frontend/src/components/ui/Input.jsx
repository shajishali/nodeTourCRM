import React from "react";

export function Input({ className = "", icon, ...props }) {
  return (
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
      <input
        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 ${
          icon ? "pl-10" : ""
        } ${className}`}
        {...props}
      />
    </div>
  );
}
