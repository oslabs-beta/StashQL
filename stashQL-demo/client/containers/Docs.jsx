import React, { Component } from 'react';
import Nav from '../components/Nav.jsx'
import Footer from '../components/footer/Footer.jsx';
import DocsBox from '../components/docs/DocsBox.jsx';
import vid from '../images/clear-logs-1.mp4';


const Docs = () => {
    return (
        <div>
            <Nav />
            <div id='docsContainer'>
              <DocsBox/>
            </div>
            {/* <Footer/> */}
        </div>
    );
};

export default Docs;