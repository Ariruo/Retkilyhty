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
    <nav className="bg-orange-900 py-2 font-sans">
      <div className="container mx-auto px-4 flex items-center justify-center">
        {/* Logo */}
        <button onClick={handleHomeClick} className="text-white  center font-semibold text-xl focus:outline-none">
         Retkilyhty
        </button>

      
       
          
          
        
      </div>
    </nav>
  );
};

export default Navbar;