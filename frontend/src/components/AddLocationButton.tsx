import React, { useState } from 'react';
import { AddLocationButtonProps } from '../types/props';
import addbuttonicon from '../../assets/add_marker.png';


const Addlocationbutton: React.FC<AddLocationButtonProps> = ({ toggleAddLocation, }) => {
  const [isActive, setIsActive] = useState(false);
  
  const handleClick = () => {
    setIsActive(!isActive);
    toggleAddLocation(); // Toggle the location here if needed on button click
  };

  return (
    <button
      onClick={handleClick}
      className="z-8 fixed bg-white p-2 rounded-md shadow-md cursor-pointer left-10 top-44 sm:left-56 sm:top-20 first-line:left-10  border hover:bg-opacity-90 active:scale-x-90 active:scale-y-90 transition-transform "
      style={{
        backgroundColor: isActive ? '#9A3412' : '',
        borderColor: isActive ? 'white' : '#9A3412', // Change the border color based on isActive
        borderWidth: '1px', // Set the border width
      }}
      title="Lisää kohde kartalle" 
    >
      <img
        src={addbuttonicon}
        alt="nearby.png"
        style={{ width: '30px', height: '30px' }}
      />
    </button>
  );
};

export default Addlocationbutton;
