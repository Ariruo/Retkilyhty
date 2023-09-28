import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

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
      className={`mb-2 flex items-center cursor-pointer ${checked ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg p-2`}
      onClick={() => setShow(!checked)} // Update the state directly
    >
      {label}
    </label>
  );

  const sidebarWidth = open ? "w-70 transition-width duration-300" : "w-0 transition-width duration-300";
  const sidebarAnimation = open ? "translate-x-0" : "-translate-x-full";
  const hamburgerIconTransition = "transition-transform duration-600";

  return (
    <div className="flex">
      <div className={`absolute top-6 left-70 cursor-pointer ${hamburgerIconTransition} bg-white p-2 rounded-md shadow-md`} style={{ left: '13%' }}>
        <FontAwesomeIcon
          size="2x"
          icon={open ? faXmark : faBars}
          onClick={toggleSidebar}
          style={{ width: '30px', height: '30px' }}
        />
      </div>

      <div
        className={`bg-white z-10 h-screen p-5 pt-8 relative ${sidebarWidth} rounded-r-3xl transform ${sidebarAnimation}`}
      >
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
  );
}
