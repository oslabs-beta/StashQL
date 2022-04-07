import React from 'react';
import { NavLink } from 'react-router-dom';
import StashLogo from '../assets/stash.svg';

const StashLogoSVG = <img src={StashLogo} alt="StashQL" />;

const navLinksArr = [StashLogoSVG, 'StashQL', 'Documentation', 'Examples', 'GitHub Links'];
const navLinksToField = ['', '', 'Documentation', 'Examples', 'GitHub Links'];

function NavBar() {
  const navlinks = navLinksArr.map((link, index) => {
    const newLink = (
      <NavLink to={`/${navLinksToField[index]}`} className="navLink">
        <div id={`navbar${index}`}>
          {' '}
          {link}
          {' '}
        </div>
      </NavLink>
    );
    return newLink;
  });

  const navLogoCombo = navlinks.splice(0, 2);

  return (
    <div className="navContainer">
      <div className="navComboContainer">
        {navLogoCombo}
      </div>
      {navlinks}
    </div>
  );
}

export default NavBar;
