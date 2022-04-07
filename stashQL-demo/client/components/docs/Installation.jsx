import React from 'react';

const Installation = () => {
    return (
      <div id="doc-installation">
        <div id="header-bold">
          <h1 id="header-bold-text">Installation</h1>
        </div>
        <div className="text-box">
          <p>You can install StashQL as a dependency</p>
        </div>
        <div id="doc-code-block">
          <span style={{color:"#ffc91e"}} >npm </span><span style={{color:"#ffffff"}} >install stashql</span>
        </div>
        <button id="installBtn" onClick={() => {
            navigator.clipboard.writeText('npm install stashql');
            var win = window.open("", "Title", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=780, height=200, top="+(screen.height-400)+", left="+(screen.width-840));
            win.document.body.innerText = "Text";
          }}>Copy</button>
      </div>
    );
};

export default Installation;