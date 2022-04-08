import React from 'react';
// mutation{
//   addAuthor( name: "John Smith", refillCache:"authors"){
//     name
//   }
// }
const TextArea5 = () => {
  return (
    <div id="textarea-box">
      <div id="doc-code-block">
        <span style={{color:"#e06c5e"}}>mutation</span>
        <span> &#123;</span>
        <br></br><span>&nbsp;&nbsp;</span>
        <span style={{color:"#4dafef"}}>addAuthor </span>
        <span>&#40; </span>
        <span style={{color:"#ce70cc"}}>name</span>:
        <span style={{color:"#98b752"}}>"John Smith"</span>, 
        <span style={{color:"#ce70cc"}}> refillCache</span>:
        <span style={{color:"#98b752"}}>"authors"</span>,
        <span>&#41;</span>
        <span>&#123;</span>
        <br></br><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span style={{color:"#4dafef"}}>name</span>
        <br></br><span>&nbsp;&nbsp;</span>
        <span>&#125;</span>
        <br></br>
        <span>&#125;</span>
      </div>
    </div>
  );
};
export default TextArea5;