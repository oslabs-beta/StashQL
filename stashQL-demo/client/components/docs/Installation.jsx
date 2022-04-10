import React from 'react';
import { FaCopy } from "react-icons/fa";

const Installation = (props) => {
    return (

      <div id="doc-installation">
        <h1>Using StashQL</h1>
        <div id='installation-text'>
          <p>StashQL can be installed as a dependency</p>
          <div id="doc-code-block">
            <span style={{color:"#ffc91e"}} >npm </span><span style={{color:"#ffffff"}} >install stashql</span>
            <FaCopy onClick={() => {props.setCopiedTrue(); navigator.clipboard.writeText('npm install stashql')}} />
          </div>
        </div>
      </div>
    );
};

export default Installation;