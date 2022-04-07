import React, { Component } from 'react';
import filler from '../../images/shepherd.png';

const SectionThree = () => {
    return (
      <div id='section-three'>
        <div id="section-three-img">  
          <img id='filler-img' src={filler}/>
        </div>
        <div id="section-three-text">
          <div>
            <h3>What StashQL can offer</h3>
            <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</h5>
          </div>
        </div>
      </div>
    );
};

export default SectionThree;