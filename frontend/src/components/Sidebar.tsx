import React, { useState } from 'react';
import { styled } from '@mui/system';
import { IconButton, Drawer } from '@mui/material';
import { FaTimes, FaBars } from 'react-icons/fa';
import { SidebarProps } from '../types/props';
import logoIcon from '../../assets/Logo_text.png'
import marker from '../../assets/marker_sidebar.png'

const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  top: '-0px',
  right: '-0px',
  zIndex: '1',
  '&:hover': {
    transform: 'scale(0.9)',
  },
  '&:hover:focus-visible': {
    outline: '0,1px solid gray',
  },
});

const StyledDrawer = styled(Drawer)({
  // Add any additional styling for the Drawer component here if needed
});

const Sidebar: React.FC<SidebarProps> = ({
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
}) => {
  const [isChecked, setIsChecked] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(true);

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
  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

const renderCheckbox = (label: string, checked: boolean, setShow: React.Dispatch<React.SetStateAction<boolean>>) => (
  <label
    className={`mb-1 font-sans font-Montserrat flex items-center cursor-pointer transition-transform transform-gpu ${
      checked
        ? 'bg-orange-800 text-white border border-orange-900 shadow-md'
        : 'bg-gray-200 text-gray-700 border border-gray-300 shadow-sm'
    } rounded-md p-1 backdrop-blur-md transition-colors duration-300 text-sm hover:opacity-75`} // Added hover styles
    style={{ maxWidth: '60%' }} // Add max-width or set a fixed width
    onClick={() => setShow(!checked)}
  >
    {label}
  </label>
);


  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleSidebar}
    >
      <div className="min-h-screen flex flex-row bg-gray-100">
        <div className="flex flex-col w-52 bg-white rounded-r-3xl overflow-hidden z-10">
          <div className="flex items-center justify-center h-20 shadow-md z-20">
            <img
              src={logoIcon}
              alt="logo"
              className=" hover:bg-opacity-90 active:scale-x-75 w-20 h-20 rounded-full z-12 bg-white pt-3 bg-opacity-80"
            />
          </div>
          <ul className="flex flex-col py-4">
            <li>
              <a
                href="#"
                className="flex flex-row items-center h-12 transform hover:bg-gray-50 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                onClick={toggleSubmenu}
              >
                
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
  <img 
    src={marker}
    alt="Marker"
    style={{ width: '22px', height: '30px', marginTop: '-7px' }}
  />
</span>


<span className="text-sm font-medium">Kohteet</span>

<svg
  sidebar-toggle-item
  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
  fill="currentColor"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fillRule="evenodd"
    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
    clipRule="evenodd"
  ></path>
</svg>
</a>
              {submenuOpen && (
                
                
                <div className="pl-12 pt-3 ">
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
                </div>
              )}
              
            </li>
          </ul>
        </div>
        
      </div>
    </Drawer>
  );
};

export default Sidebar;
