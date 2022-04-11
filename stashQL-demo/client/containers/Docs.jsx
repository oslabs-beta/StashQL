import React, { Component } from 'react';
import Nav from '../components/Nav.jsx'
import Footer from '../components/footer/Footer.jsx';
import DocsBox from '../components/docs/DocsBox.jsx';


const Docs = () => {
    return (
        <div>
            <Nav />
            <div id='docsContainer'>
              <DocsBox/>
            </div>
            <Footer/>            
        </div>
    );
};

export default Docs;