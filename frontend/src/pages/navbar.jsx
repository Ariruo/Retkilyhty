import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

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

  const handleSearchByCityClick = () => {
    navigate('/search');
    setIsDropdownOpen(false); // Close the dropdown when navigating to a different page
  };

  const handleHomeClick = () => {
    navigate('/');
    setIsDropdownOpen(false); // Close the dropdown when navigating to a different page
  };

  const handleMapClick = () => {
    navigate('/map');
    setIsDropdownOpen(false); // Close the dropdown when navigating to a different page
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-blue-500 py-4 font-sans rounded-b-lg">
      <div className="container mx-auto px-4 flex items-center justify-center">
        {/* Logo */}
        <button onClick={handleHomeClick} className="text-white font-semibold text-xl focus:outline-none absolute left-1/2 transform -translate-x-1/2">Autiotuvat kartalla</button>
        
        {/* Dropdown */}
        <div className="relative ml-auto" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="text-white hover:text-gray-200 transition duration-300 ease-in-out focus:outline-none">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-12 right-0 bg-blue-500 py-2 px-4 rounded-lg navbar-dropdown z-10">
              <ul className="space-y-2">
                <li>
                  <Link to="/" onClick={toggleDropdown} className="text-white hover:text-gray-200 transition duration-300 ease-in-out">Koti</Link>
                </li>
                <li>
                  <button onClick={handleSearchByCityClick} className="text-white hover:text-gray-200 transition duration-300 ease-in-out focus:outline-none">Hae</button>
                </li>
                <li>
                  <Link to="/map" onClick={handleMapClick} className="text-white hover:text-gray-200 transition duration-300 ease-in-out">Map</Link>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-200 transition duration-300 ease-in-out">Tietoa</a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-200 transition duration-300 ease-in-out">Contact</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
