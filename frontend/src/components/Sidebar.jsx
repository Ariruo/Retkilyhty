import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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
  <label className=" mb-2 flex items-center">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="mr-2 appearance-none w-5 h-5 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"
    />
    <span className="text-gray-700 font-semibold">{label}</span>
  </label>
);


  const sidebarWidth = open ? "w-70 transition-width duration-300" : "w-0 transition-width duration-300";
  

  return (
    <div className="flex">
     <div className={`bg-white z-10 h-screen p-5 pt-8 relative ${open ? sidebarWidth : 'hidden'} rounded-r-3xl`}>

      
  
         
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

<label className="block mb-2 font-semibold">
  <input
    type="checkbox"
    checked={selectAll}
    onChange={() => setSelectAll(!selectAll)}
    className="mr-2 text-blue-500 rounded"
  />
  <span className="text-gray-700">Näytä Kaikki</span>
</label>
  <FontAwesomeIcon
  size="2x"
  icon={faXmark} 
  className={`absolute top-3 right-3 cursor-pointer`}
  onClick={toggleSidebar}
/>
</div>


      </div>
      
    </div>
  );
}
