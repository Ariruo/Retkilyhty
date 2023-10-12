import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleHomeClick = () => {
    navigate('/');
    setIsDropdownOpen(false); // Close the dropdown when navigating to a different page
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-orange-900  font-sans fixed h-0 top-0 w-full z-10">
      <div className="container mx-auto px-4 flex items-center justify-center">
        {/* Larger Logo with custom styling */}
        <button onClick={handleHomeClick} className="text-white center font-semibold text-lg focus:outline-none">
          <img
            src="assets/logo_text.png"
            alt="logo"
            style={{
              width: '90x', // Adjust the width as needed
              height: '90px', // Adjust the height as needed
              position: 'absolute',
              paddingTop : '10px',
            
            }}
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
