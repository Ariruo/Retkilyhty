
import React from "react";

function Button({ onClick, children, }) {
  return (
    
    <button
      onClick={onClick}
      className="bg-blue-500 absolute z-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      style={{ left: "220px", top: "3px" }}
    >
      {children}
    </button>
    
  );
}

export default Button;