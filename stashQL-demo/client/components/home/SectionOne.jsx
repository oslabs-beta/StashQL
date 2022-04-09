import React, { Component } from 'react';
import logo from '../../images/logo1.png';

const SectionOne = () => {
    return (
      // <div id="section-one">
      //   <div id="section-one-text"> 
      //     <h1>Build Faster<br/> Applications <br/> with <span id='section-one-stashql-word'>StashQL</span> </h1>
      //     {/* <h3>StashQL is a light-weight, open-source NPM package that improves the speed of your GraphQL queries in your application.</h3> */}
      //     <h3>StashQL is a light-weight, open-source NPM package that <br/> improves the speed of your GraphQL queries in your application.</h3>
      //   </div>
      //   <div id="section-one-img">
      //     <img id='section-one-img-logo' src={logo}/>
      //   </div>
      // </div>
      
      <div id='section-one'>
        <div id="section-one-text"> 
           <h1>Build Faster<br/> Applications <br/> with <span id='section-one-stashql-word'>StashQL</span> </h1>
           <h3>StashQL is a light-weight, open-source NPM package that improves the speed of your GraphQL queries in your application.</h3>
        </div>
        <div id="section-one-img">
          <img id='logo' src={logo}/>
          {/* <h1>hi</h1> */}
        </div>
      </div>
    );
};

export default SectionOne;