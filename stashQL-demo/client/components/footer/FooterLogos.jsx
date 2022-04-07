import React, { Component } from 'react';
import github from '../../images/logos/White_GitHub.png';
import linkedin from '../../images/logos/White_LinkedIn.png';
import npm from '../../images/logos/White_NPM.png';
import twitter from '../../images/logos/White_Twitter.png';
import FooterLogo from './FooterLogo.jsx';

const FooterLogos = () => {
  const logoArr = [github, linkedin, npm, twitter];
  const logoNameArr = ['github', 'linkedin', 'npm', 'twitter'];
  const FooterLogoArr = [];
  for(let i = 0; i < logoArr.length; i++){
    FooterLogoArr.push(<FooterLogo key={logoNameArr[i]} image={logoArr[i]}/>)
  }
  return (
    <div id="footer-logo-box">
      {FooterLogoArr}
    </div>
  );
};

export default FooterLogos;