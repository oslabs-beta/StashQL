import React, { Component } from 'react';
import filler from '../../images/shepherd.png';
import electricity from '../../images/electricity.png'
import coding from '../../images/coding.png';


const SectionThree = () => {
    return (
      <div id='section-three'>
        <div id="section-three-img">  
          <img id='filler-img' src={electricity}/>
        </div>
        <div id="section-three-text">
          <div>
            <h1>Speed Up Your Apps</h1>
            <h3>StashQL can speed up your GraphQL queries by implementing server-side caching and handling mutations that occur within your database</h3>
          </div>
        </div>
      </div>
    );
};

export default SectionThree;