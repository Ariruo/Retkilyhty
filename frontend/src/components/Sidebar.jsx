import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar({
 
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
  const [open, setOpen] = useState(false);
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

  const sidebarWidth = open ? "w-72 transition-width duration-300" : "w-0 transition-width duration-300";
  

  return (
    <div className="flex">
      <div className={`bg-white z-10 h-screen p-5 pt-8 relative ${sidebarWidth}`}>
      {open && 
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={() => setSelectAll(!selectAll)}
            className="mr-2 text-blue-500 rounded"
          />
          <span className="text-gray-700">näytä kaikki</span>
        </label>
         }
        <div>
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
</div>
<FontAwesomeIcon icon={faArrowLeft} className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer`} onClick={toggleSidebar} />

      </div>

    </div>
  );
}
