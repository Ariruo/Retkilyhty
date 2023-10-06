import React from 'react';

const FindClosestMarkerButton = ({ onClick }) => {
  return (
    <button
      className="z-8 fixed bg-white p-2  rounded-md shadow-md cursor-pointer top-40 left-10 md:top-20 md:left-40 border border-orange-800"
      onClick={onClick}
    >
      <img
        src="assets/nearby-icon-15.jpg"
        alt="nearby.png"
        style={{ width: '30px', height: '30px' }}
      />
    </button>
  );
};

export default FindClosestMarkerButton;