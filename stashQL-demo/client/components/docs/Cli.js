import React from "react";
import Highlighter from "react-highlight-words";
import allLogs from '../../images/all-logS.mp4';
import clearLogs from '../../images/clear-logs.mp4';


const Cli = () => {
  return (
    <div id="doc-how-to-use">
      <h1>Using the StashQL CLI</h1>
      <div id='cli-text'>
        <p>Upon running your GraphQL queries, StashQL will create a logs file that will contain detailed information about each query and mutation you run.</p>
        <p>To view the logs, you can run the StashQL CLI command <b><Highlighter highlightClassName="YourHighlightClass" searchWords={["stashql all logs"]} autoEscape={true} textToHighlight="stashql all logs"/></b>.</p>
        <video loop autoPlay muted id="myVideo">
          <source
            src={allLogs}
            type="video/mp4"
          />
        </video>

        <p>To clear the logs, you can run the commannd <b><Highlighter highlightClassName="YourHighlightClass" searchWords={["stashql clear logs"]} autoEscape={true} textToHighlight="stashql clear logs"/></b>.</p>
        <video loop autoPlay muted id="myVideo">
          <source
            src={clearLogs}
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  )
};

export default Cli;