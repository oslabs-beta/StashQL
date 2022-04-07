import React from 'react';

const TextArea2 = () => {
  return (
    <div id="textarea-box">
      <div id="doc-code-block">
        <span style={{color:"#ce70cc"}}>const </span>
        <span style={{color:"#ffc91e"}}>StashQL </span>
        <span style={{color:"#56b6c2"}}>= </span>
        <span style={{color:"#ce70cc"}}>new </span>
        <span style={{color:"#ffc91e"}}>stashql(schema, redisCache, 1000)</span>;
      </div>
    </div>
  );
};
export default TextArea2;