import React, { useState, useEffect } from 'react';

import {  Drawer } from '@mui/material';

import { SidebarProps } from '../types/props';
import logoIcon from '../../assets/Logo_text.png'
import envelope from '../../assets/envelope.png'
import marker from '../../assets/sidebar-marker.png'
import user from '../../assets/user.png'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectToken, selectUserId, selectUsername, logout } from '../redux/reducers/userReducer';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





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
  setShowLogin,
  showUser,
  setShowUser,
  setShowRegister,

}) => {
  


  const [isChecked, setIsChecked] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [rekisteroidySubmenuOpen, setRekisteroidySubmenuOpen] = useState(false);

  const dispatch = useDispatch();
  
  const userState = useSelector((state) => state.user);

  const username = selectUsername(userState)
  const isLoggedIn = userState.loggedIn;
  const handleLogout = () => {
    dispatch(logout());
  
    // Display toast notification for successful logout
    toast.success('Kirjauduttu ulos!');
  };
  

 

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
    setShowUser(!isChecked);
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
    } rounded-md p-1 backdrop-blur-md transition-colors duration-300 text-s lg:hover:bg-opacity-90`} // Added hover styles
    style={{ maxWidth: '73%' }} // Add max-width or set a fixed width
    onClick={() => setShow(!checked)}
  >
    {label}
  </label>
);

const handleContactClick = () => {
  const emailAddress = 'trailtorchinfo@gmail.com';
  const subject = 'Palaute'; // Optional subject
  const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}`;
  window.location.href = mailtoLink;
};



const toggleRekisteroidySubmenu = () => {
  setRekisteroidySubmenuOpen(!rekisteroidySubmenuOpen);
};





  return (
    <Drawer anchor="left" open={open} onClose={toggleSidebar}>
    <div className="min-h-screen flex flex-row bg-gray-100">
      <div className="flex flex-col w-48 bg-white overflow-hidden z-10">
        <div className="flex items-center justify-center h-20 shadow-md z-20">
          <img
            src={logoIcon}
            alt="logo"
            className="hover:bg-opacity-90 active:scale-x-75 w-20 h-20 rounded-full z-12 bg-white pt-3 bg-opacity-80"
          />
        </div>
        <ul className="flex flex-col py-4">
          <li>
            <a
              href="#"
              className="flex flex-row items-center h-12 transform hover:bg-gray-50 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              onClick={toggleRekisteroidySubmenu}
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <img
                  src={user}
                  alt="Login"
                  style={{ width: '22px', height: '22px' }}
                />
              </span>
              <span className="text-m font-medium">
  {isLoggedIn ? ` ${username}` : 'Kirjaudu sisään'}
</span>
              <svg
                sidebar-toggle-item
                className={`flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white transform ${rekisteroidySubmenuOpen ? 'rotate-180' : 'rotate-0'}`}
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

            {rekisteroidySubmenuOpen && (
  <div>
    <div className="pl-14  ">
      {isLoggedIn ? (
        <div>
          <span
            className="text-s font-medium cursor-pointer text-gray-500 hover:text-gray-800"
            onClick={() => {
              toggleSidebar();
              handleLogout();
            }}
          >
            Kirjaudu ulos
          </span>
        </div>
      ) : (
        <div className=''>
        <div>
          <span
            className="text-s font-medium cursor-pointer text-gray-500 hover:text-gray-800"
            onClick={() => {
              setShowLogin(true);
              toggleSidebar();
            }}
          >
            Kirjaudu sisään
          </span>
        </div>
        <div className="pt-2 pb-1">
          <span
            className="text-s font-medium cursor-pointer text-gray-500 hover:text-gray-800"
            onClick={() => {
              setShowRegister(true);
              toggleSidebar();
            }}
          >
            Rekisteröidy
          </span>
        </div>
      </div>
      
      )}
    </div>
  </div>
)}


          </li>
            <li>
              <a
                href="#"
                className="flex flex-row items-center h-12 transform hover:bg-gray-50 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                onClick={toggleSubmenu}
                style={{ outline: 'none !important' }}
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <img 
                    src={marker}
                    alt="Marker"
                    style={{ width: '22px', height: '22px', marginTop: '-7px' }}
                  />
                </span>
                <span className="text-m font-medium pr-2">Kohteet</span>

                <svg
                  sidebar-toggle-item
                  className={`flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white transform ${submenuOpen ? 'rotate-180' : 'rotate-0'}`}
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
                <div>
                  <label className={`relative inline-flex items-center lg:cursor-pointer left-11 top-2 pb-3 `}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      className="sr-only peer"
                      onClick={toggleAll}
                    />
                    <div
                      className={`w-11 h-6 bg-gray-700 peer rounded-full dark:black peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-800 border shadow`}
                    
                    ></div>
                  
                  </label>
  
                <div className="pl-11 pt-3 ">
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

                  {isLoggedIn && (
                   renderCheckbox("Oma kohde", showUser, setShowUser)
                   )}

                </div>
              </div>
            )}
          </li>

          <li>
              <a
                href="#"
                className="flex flex-row items-center h-12 transform hover:bg-gray-50 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                onClick={handleContactClick}
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <img 
                    src={envelope}
                    alt="Envelope"
                    style={{ width: '22px', height: '22px' }}
                  />
                </span>
                <span className="text-m font-medium">Ota yhteyttä</span>
              </a>
            </li>
          </ul>
          <div className="mt-auto p-4 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Retkilyhty
          </div>
        </div>
      </div>
      <ToastContainer />
    </Drawer>
  );
};

export default Sidebar;
