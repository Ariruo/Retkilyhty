import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@mui/material';
import { FaTimes } from 'react-icons/fa';

export default function Sidebar({
  open,
  toggleSidebar,
  showCabins,
  setShowCabins,
  showVaraustupas,
  setShowVaraustupas,
  showNuotipaikka,
  setShowNuotipaikka,
  showKota,
  setShowKota,
  showLaavu,
  setShowLaavu,
  showPaivatupa,
  setShowPaivatupa,
  showKammi,
  setShowKammi,
  showSauna,
  setShowSauna,
  showLintutorni,
  setShowLintutorni,
  showNahtavyys,
  setShowNahtavyys,
  showLuola,
  setShowLuola,
  showLahde,
  setShowLahde,
  showRuokailukatos,
  setShowRuokailukatos,
}) {
  const [isChecked, setIsChecked] = useState(true);

  const toggleAll = () => {
    setIsChecked(!isChecked);
    setShowCabins(!isChecked);
    setShowVaraustupas(!isChecked);
    setShowNuotipaikka(!isChecked);
    setShowKota(!isChecked);
    setShowLaavu(!isChecked);
    setShowPaivatupa(!isChecked);
    setShowKammi(!isChecked);
    setShowSauna(!isChecked);
    setShowLintutorni(!isChecked);
    setShowNahtavyys(!isChecked);
    setShowLuola(!isChecked);
    setShowLahde(!isChecked);
    setShowRuokailukatos(!isChecked);
  };

  const renderCheckbox = (label, checked, setShow) => (
    <label
      className={`mb-2 font-sans font-Montserrat flex items-center cursor-pointer ${
        checked
          ? 'bg-orange-800 text-white border border-orange-900'
          : 'bg-white text-gray-900 border border-orange-900'
      } rounded-lg p-2 backdrop-blur-md transition-colors duration-300 font-bold`}
      onClick={() => setShow(!checked)}
    >
      {label}
    </label>
  );

  const sidebarWidth = open ? 'w-70 transition-width duration-300' : 'w-0 transition-width duration-300';
  const sidebarAnimation = open ? 'translate-x-0' : '-translate-x-full';
  const hamburgerIconTransition = open ? 'transition duration-300 ease-in-out transform rotate-180' : 'transition duration-300 ease-in-out transform rotate-0';

  return (
    <div className="flex">
      <div
        className={`bg-white z-20 bg-opacity-80 fixed h-screen p-5 pt-8 border border-orange-800 ${sidebarWidth} rounded-r-3xl transform ${sidebarAnimation}`}
      >
<IconButton
  className="absolute top-1 right-1 p-2 cursor-pointer"
  onClick={toggleSidebar}
  sx={{
    position: 'absolute',
    
    color: 'black',
    top: '4px',
    right: '-0px',
    zIndex: '1',
    '&:hover': {
      transform: 'scale(0.9)',
    },
    '& .MuiSvgIcon-root': {
      fontWeight: 'bold', // Adjust the icon's weight
    },
  }}
>
<FaTimes className="h-6 w-6 text-gray-700 hover:text-gray-900" />
</IconButton>
        {open && (
          <label className={`relative inline-flex items-center cursor-pointer top-7 `}>
            <input
              type="checkbox"
              checked={isChecked}
              className="sr-only peer focus:outline-none"
              onClick={toggleAll}
            />
            <div
              className={`w-11 h-6 bg-gray-700 peer rounded-full dark:black peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-800 border shadow`}
              // Removed border-orange-800 and added border-orange-900
            ></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
          </label>
        )}
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
              {renderCheckbox("Ruokailukatos", showRuokailukatos, setShowRuokailukatos)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
