import React from "react";
import Highlighter from "react-highlight-words";
import allLogs from '../../images/all-logs-3.mp4';
import clearLogs from '../../images/clear-logs-1.mp4';


const Cli = () => {
  return (
    <div id="doc-how-to-use">
      <h1>Using the StashQL CLI</h1>
      <div className='cli-text'>
        <p>Upon running your GraphQL queries, StashQL will create a logs file that will contain detailed information about each query and mutation you run.</p>
        <p>To view the logs, you can use StashQL's CLI.</p>
        <p><Highlighter highlightClassName="YourHighlightClass" searchWords={["stashql all logs"]} autoEscape={true} textToHighlight="stashql all logs"/></p> 
        <video loop autoPlay muted id="myVideo">
          <source
            src={allLogs}
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  )
};

export default Cli;