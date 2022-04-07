import React from 'react';
import { NavLink } from 'react-router-dom';
import StashLogo from '../assets/stash.svg';

const StashLogoSVG = <img src={StashLogo} alt="StashQL" />;
const StashQLHeaderText = 'StashQL';
const StashQLDescription = 'Nimble server-side GraphQL caching solution';
const bodyButtonArr = ['Get started', 'Documentation'];
const bodyButtonNavAddress = ['Examples', 'Documentation'];
// const newLine = <br />;

function StashQLHeaderMain() {
  const buttonLinks = bodyButtonArr.map((link, index) => {
    const newLink = (
      <NavLink to={`/${bodyButtonNavAddress[index]}`} className="buttonLink">
        <div id={`button${index}`}>
          {' '}
          {link}
          {' '}
        </div>
      </NavLink>
    );
    return newLink;
  });

  // const bodyColumn = [StashQLHeaderText, newLine, StashQLDescription];
  return (
    <section className="topHeaderContainer">
      {StashLogoSVG}
      <section className="headerColumnContainer">
        <p id="headerText">
          {StashQLHeaderText}
        </p>
        <p id="headerDescription">
          {StashQLDescription}
        </p>
        <section className="headerButtonContainer">
          {buttonLinks}
        </section>
      </section>
    </section>
  );
}

export default StashQLHeaderMain;
