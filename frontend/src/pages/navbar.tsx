import React from 'react';
import logoIcon from '../../assets/Logo_text.png'

const Navbar = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <img
      src={logoIcon}
      alt="logo"
      className=" hover:bg-opacity-90 active:scale-x-75 w-24 h-24 rounded-full z-10 bg-white pt-3 bg-opacity-80 border border-orange-800"
      style={{
        width: '80px', // Adjust the width as needed
        height: '80px', // Adjust the height as needed
        cursor: 'pointer',
        position: 'fixed',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
      onClick={handleRefresh}
    />
  );
};

export default Navbar;
