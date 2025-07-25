import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
