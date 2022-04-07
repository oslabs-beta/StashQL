import React, { Component } from 'react';

const FooterLogo = (props) => {
    return (
        <a id="footer-logo-a" href="#">
          <div id="footer-logo-a-div">
            <img id="footer-logo-a-div-img" src={props.image} ></img>
          </div>
        </a>
    );
};

export default FooterLogo;