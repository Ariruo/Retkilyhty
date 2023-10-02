import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar({
  open,
  toggleSidebar,
  showCabins,
  setShowCabins, // Pass setShowCabins function
  showVaraustupas,
  setShowVaraustupas, // Pass setShowVaraustupas function
  showNuotipaikka,
  setShowNuotipaikka, // Pass setShowNuotipaikka function
  showKota,
  setShowKota, // Pass setShowKota function
  showLaavu,
  setShowLaavu, // Pass setShowLaavu function
  showPaivatupa,
  setShowPaivatupa, // Pass setShowPaivatupa function
  showKammi,
  setShowKammi, // Pass setShowKammi function
  showSauna,
  setShowSauna, // Pass setShowSauna function
  showLintutorni,
  setShowLintutorni, // Pass setShowLintutorni function
  showNahtavyys,
  setShowNahtavyys, // Pass setShowNahtavyys function
  showLuola,
  setShowLuola, // Pass setShowLuola function
  showLahde,
  setShowLahde, // Pass setShowLahde function
}) {
  const renderCheckbox = (label, checked, setShow) => (
    <label
      className={`mb-2 font-sans flex items-center cursor-pointer ${
        checked
          ? 'bg-orange-800 text-white'
          : 'bg-white text-gray-800'
      } rounded-lg p-2 backdrop-blur-md transition-colors duration-300`}
      onClick={() => setShow(!checked)}
    >
      {label}
    </label>
  );
  
  const sidebarWidth = open ? "w-70 transition-width duration-300" : "w-0 transition-width duration-300";
  const sidebarAnimation = open ? "translate-x-0" : "-translate-x-full";
  const hamburgerIconTransition = open ? "transition duration-300 ease-in-out transform rotate-180" : "transition duration-300 ease-in-out transform rotate-0";
  

  return (
    <div className="flex">
    
    
      <div
        className={`bg-orange-800  bg-opacity-80 z-10 h-screen p-5 pt-8 relative ${sidebarWidth} rounded-r-3xl transform ${sidebarAnimation}`}
      >
         <button
  className="absolute top-2 right-2 p-3 text-gray-600 cursor-pointer"
  onClick={toggleSidebar}
>
  <FontAwesomeIcon icon={open ? faTimes : faBars} size="2x" /> {/* Adjust the size as needed */}
</button>
<div className="mt-10">
        {open && (
          <>
            {renderCheckbox("Autiotupa", showCabins, setShowCabins)}
            {renderCheckbox("Varaustupas", showVaraustupas, setShowVaraustupas)}
            {renderCheckbox("Nuotipaikka", showNuotipaikka, setShowNuotipaikka)}
            {renderCheckbox("Kota", showKota, setShowKota)}
            {renderCheckbox("Laavu", showLaavu, setShowLaavu)}
            {renderCheckbox("Päivätupa", showPaivatupa, setShowPaivatupa)}
            {renderCheckbox("Kammi", showKammi, setShowKammi)}
            {renderCheckbox("Sauna", showSauna, setShowSauna)}
            {renderCheckbox("Lintutorni", showLintutorni, setShowLintutorni)}
            {renderCheckbox("Nähtävyys", showNahtavyys, setShowNahtavyys)}
            {renderCheckbox("Luola", showLuola, setShowLuola)}
            {renderCheckbox("Lähde", showLahde, setShowLahde)}
          </>
        )}
        </div>
      </div>
      </div>
  
  );
}
