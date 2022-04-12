import React, { Component } from 'react';
import filler from '../../images/shepherd.png';
import electricity from '../../images/electricity.png';
import coding from '../../images/coding.png';
import vid from '../../images/caching-3.mp4';
// import vid from '../../images/caching-2.mp4';


// import filler from '../../../public/images/shepherd.png';
// import electricity from '../../../public/images/electricity.png';
// import coding from '../../../public/images/coding.png';

const SectionFour = () => {
    return (
      <div id='section-four'>
        <div id="section-four-text">
          <div>
            <h1>Use the StashQL CLI</h1>
            <h3>The StashQL package comes with a built-in command-line interface that you can use to check your query logs</h3>
          </div>
        </div>
        <div id="section-four-img">  
          {/* <img id='filler-img' src={coding}/> */}
          <video loop autoPlay muted className="featureVid">
            <source
              src={vid}
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    );
};

export default SectionFour;