import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar({
  open,
  toggleSidebar,
  showCabins,
  toggleCabins,
  showVaraustupas,
  toggleVaraustupas,
  showNuotipaikka,
  toggleNuotipaikka,
  showKota,
  toggleKota,
  showLaavu,
  toggleLaavu,
  showPaivatupa,
  togglePaivatupa,
  showKammi,
  toggleKammi,
  showSauna,
  toggleSauna,
  showLintutorni,
  toggleLintutorni,
  showNahtavyys,
  toggleNahtavyys,
  showLuola,
  toggleLuola,
  showLahde,
  toggleLahde,
}) {
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    // Update the individual checkboxes when the "ALL" checkbox changes
    if (selectAll) {
      toggleCabins(true);
      toggleVaraustupas(true);
      toggleNuotipaikka(true);
      toggleKota(true);
      toggleLaavu(true);
      togglePaivatupa(true);
      toggleKammi(true);
      toggleSauna(true);
      toggleLintutorni(true);
      toggleNahtavyys(true);
      toggleLuola(true);
      toggleLahde(true);
    } else {
      // If "ALL" is unchecked, uncheck all other checkboxes
      toggleCabins(false);
      toggleVaraustupas(false);
      toggleNuotipaikka(false);
      toggleKota(false);
      toggleLaavu(false);
      togglePaivatupa(false);
      toggleKammi(false);
      toggleSauna(false);
      toggleLintutorni(false);
      toggleNahtavyys(false);
      toggleLuola(false);
      toggleLahde(false);
    }
  }, [selectAll]);

  const renderCheckbox = (label, checked, onChange) => (
    <label
      className={`mb-2 flex items-center cursor-pointer ${checked ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg p-2`}
      onClick={() => onChange(!checked)}
    >
      {label}
    </label>
  );

  const sidebarWidth = open ? "w-70 transition-width duration-300" : "w-0 transition-width duration-300";
  const sidebarAnimation = open ? "translate-x-0" : "-translate-x-full"; // Slide-in animation
  const hamburgerIconTransition = "transition-transform duration-600"; // Transition for the hamburger icon

  return (
    <div className="flex">
      {/* Hamburger menu button */}
      <div className={`absolute top-7 left-60 cursor-pointer ${hamburgerIconTransition}`}>
        <FontAwesomeIcon
          size="2x"
          icon={open ? faXmark : faBars}
          onClick={toggleSidebar}
        />
      </div>

      <div
        className={`bg-white z-10 h-screen p-5 pt-8 relative ${sidebarWidth} rounded-r-3xl transform ${sidebarAnimation}`}
      >
        {/* Sidebar content */}
        {open && (
          <>
            {renderCheckbox("Autiotupa", showCabins, toggleCabins)}
            {renderCheckbox("Varaustupas", showVaraustupas, toggleVaraustupas)}
            {renderCheckbox("Nuotipaikka", showNuotipaikka, toggleNuotipaikka)}
            {renderCheckbox("Kota", showKota, toggleKota)}
            {renderCheckbox("Laavu", showLaavu, toggleLaavu)}
            {renderCheckbox("Päivätupa", showPaivatupa, togglePaivatupa)}
            {renderCheckbox("Kammi", showKammi, toggleKammi)}
            {renderCheckbox("Sauna", showSauna, toggleSauna)}
            {renderCheckbox("Lintutorni", showLintutorni, toggleLintutorni)}
            {renderCheckbox("Nähtävyys", showNahtavyys, toggleNahtavyys)}
            {renderCheckbox("Luola", showLuola, toggleLuola)}
            {renderCheckbox("Lähde", showLahde, toggleLahde)}
          </>
        )}
{/* 
        <label className="block mb-2 font-semibold">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={() => setSelectAll(!selectAll)}
            className="mr-2 text-blue-500 rounded"
          />
          <span className="text-gray-700">Näytä Kaikki</span>
        </label> */}
      </div>
    </div>
  );
}
