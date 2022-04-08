import React from 'react';

const TextArea2 = () => {
  return (
    <div id="textarea-box">
      <div id="doc-code-block">
        <span>const </span>
        <span style={{color:"#ba55de"}}>StashQL </span>
        <span>= </span>
        <span>new </span>
        <span style={{color:"#FC5CAC"}}>stashql</span>
        <span>&#40; stashqlSchema, redisCache, 1000 &#41;</span>  
      </div>
    </div>
  );
};
export default TextArea2;