import React, { Component } from 'react';
import logo from '../../images/logo1.png';

const SectionOne = () => {
    return (
      <div id="section-one">
        <div id="section-one-text"> 
          <h1>Build Faster<br/> Applications <br/> with <span id='section-one-stashql-word'>StashQL</span> </h1>
          <p>StashQL is a light-weight, open-source NPM package for <br/> improving the speed of your GraphQL.</p>
        </div>
        <div id="section-one-img">
          <img id='section-one-img-logo' src={logo}/>
        </div>
      </div>
    );
};

export default SectionOne;