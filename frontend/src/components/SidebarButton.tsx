import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars } from '@fortawesome/free-solid-svg-icons';

interface SidebarButtonProps {
  open: boolean;
  toggleSidebar: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ open, toggleSidebar }) => {
  const hamburgerIconTransition = open ? "transition duration-300 ease-in-out transform rotate-180" : "transition duration-300 ease-in-out transform rotate-0  hover:bg-opacity-90";

  return (
    <div
      className={`fixed top-4 md:top-20 md:left-24 left-10 cursor-pointer ${hamburgerIconTransition} bg-white p-2 rounded-md shadow-md border border-orange-800  active:bg-orange-800`}
    >
      <FontAwesomeIcon
        size="2x"
        icon={open ? faXmark : faBars}
        onClick={toggleSidebar}
        style={{ width: '30px', height: '30px' }}
      />
    </div>
  );
};

export default SidebarButton;
