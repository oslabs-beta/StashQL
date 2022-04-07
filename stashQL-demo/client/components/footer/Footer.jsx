import React from 'react';
import FooterNav from './FooterNav.jsx';
import FooterLogos from './FooterLogos.jsx';

class Footer extends React.Component {
  render() {
    return (
      <div id="footer-box">
        <FooterNav/>
        <FooterLogos/>
        <div id="copyright"><p >StashQL © 2022</p></div>
      </div>
    )
  }
}

export default Footer;