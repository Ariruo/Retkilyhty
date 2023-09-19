import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar2({
    isOpen,
  
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
  const [open, setOpen] = useState(true);

  const renderCheckbox = (label, checked, onChange) => (
    <label className="block mb-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mr-2 text-blue-500 rounded"
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const sidebarWidth = open ? "w-72" : "w-0";
  const sidebarOpacity = open ? "opacity-100" : "opacity-0 pointer-events-none"; // Hide and disable interactions when closed

  return (
    <div className='flex'>
      <div className={`bg-white z-10 h-screen p-5 pt-8 relative ${sidebarWidth} ${sidebarOpacity}`}>
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
        <FontAwesomeIcon icon={faArrowLeft} className='absolute right-3 top-9 cursor-pointer' onClick={toggleSidebar} />
      </div>
      {!open && (
        <div
          onClick={toggleSidebar}
          className='fixed top-4 left-4 text-gray-700 cursor-pointer'
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      )}
    </div>
  );
}
