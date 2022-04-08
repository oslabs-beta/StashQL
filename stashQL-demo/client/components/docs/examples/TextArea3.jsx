import React from 'react';

const TextArea3 = () => {
  const docCodeBlockQueryHandler = 
  `app.use ( '/graphql', StashQL.queryHandler, ( req, res ) => { \n
      return res.status(200).json( res.locals.data );\n
  });`;
  return (
    <div id="textarea-box">
      <div id="doc-code-block">
        <span>app</span>.
        <span style={{color:"#4dafef"}}>use</span>
        <span>&#40;</span>
        <span style={{color:"#98b752"}}>'/graphql'</span>,
        <span style={{color:"#ba55de"}}> StashQL</span>
        <span style={{color:"#4dafef"}}>.queryHandler</span>,
        <span> &#40;</span>
        <span style={{color:"#e06c5e"}}>req</span>,
        <span style={{color:"#e06c5e"}}> res</span>
        <span>&#41; </span>
        <span>=&#62; </span>
        <span>&#123;</span>
        <br></br><span>&nbsp;&nbsp;</span>
        <span style={{color:"#ce70cc"}}>return </span>
        <span style={{color:"#e06c5e"}}>res.</span>
        <span style={{color:"#4dafef"}}>status</span>
        <span>&#40;</span>
        <span>200</span>
        <span>&#41;</span>.
        <span style={{color:"#4dafef"}}>json</span>
        <span>&#40;</span>
        <span>&#123;</span>
        <span>data</span>: 
        <span style={{color:"#e06c5e"}}> res</span>.
        <span>locals</span>.
        <span>data</span>
        <span>&#125;</span>
        <span>&#41;</span>;
        <br></br> <span>&nbsp;</span>
        <span>&#125;</span>
        <span>&#41;</span>;
      </div>
    </div>
  );
};
export default TextArea3;