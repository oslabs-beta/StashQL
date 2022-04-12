import React, { Component } from 'react';
import filler from '../../images/shepherd.png';
import electricity from '../../images/electricity.png'
import coding from '../../images/coding.png';
// import vid from '../../images/caching.mp4';
// import vid from '../../images/caching-1.mp4';
import vid from '../../images/caching-3.mp4';

// import filler from '../../../public/images/shepherd.png';
// import electricity from '../../../public/images/electricity.png'
// import coding from '../../../public/images/coding.png';


const SectionThree = () => {
    return (
      <div id='section-three'>
        <div id="section-three-img">  
          {/* <img id='filler-img' src={electricity}/> */}
          <video loop autoPlay muted className="featureVid">
            <source
              src={vid}
              type="video/mp4"
            />
          </video>
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