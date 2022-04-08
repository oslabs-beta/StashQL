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
        <div id="installation-code-and-btn-box">
          <div id="doc-code-block">
          <span>npm install stashql</span>
          </div>
          <button id="installBtn" onClick={() => {
              navigator.clipboard.writeText('npm install stashql');
              document.getElementById("installBtn").innerText = "Copied!";
              document.getElementById("installBtn").style.backgroundColor = "#FC5CAC";
              setTimeout(()=>{
                document.getElementById("installBtn").innerText = "Copy";
                document.getElementById("installBtn").style.backgroundColor = "#9A51F7";
              }, 1000)
            }}>Copy</button>
        </div> 
      </div>
    );
};

export default Installation;