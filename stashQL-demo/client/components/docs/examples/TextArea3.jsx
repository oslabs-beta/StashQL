import React from 'react';

const TextArea3 = () => {
  const docCodeBlockQueryHandler = 
  `app.use('/graphql', StashQL.queryHandler, (req, res) => {
    return res.status(200).json(res.locals.data);
});`;
  return (
    // <div id="textarea-box">
    //   <textarea
    //     id="doc-code-block"
    //     rows='5'
    //     readOnly
    //     value={docCodeBlockQueryHandler}
    //   />
    // </div>

    <div id="doc-code-block-3">
      <div>
        <span style={{color:"#ce70cc"}}>app.</span>
        <span style={{color:"#ffc91e"}}>use</span>
        <span style={{color:"#56b6c2"}}>(</span>
        <span style={{color:"#fff"}}>"</span>
        <span style={{color:"#a3a3ff"}}>/graphql</span>
        <span style={{color:"#fff"}}>", </span>
        <span style={{color:"#51f793"}}>StashQL</span>
        <span style={{color:"#36a8ff"}}>.queryHandler, </span>
        <span style={{color:"#f536ff"}}>(</span>
        <span style={{color:"#7d9af8"}}>req, res</span>
        <span style={{color:"#f536ff"}}>) </span>
        <span style={{color:"#f8b47d"}}>=> </span>
        <span style={{color:"#ff6161"}}>&#123;</span> 
        <br/>
        <span style={{color:"#ce70cc", marginLeft: '20px'}}>return </span> 
        <span style={{color:"#7d9af8"}}>res.status</span> 
        <span style={{color:"#51f793"}}>(</span> 
        <span style={{color:"#a3a3ff"}}>200</span> 
        <span style={{color:"#51f793"}}>)</span> 
        <span style={{color:"#ffc91e"}}>.json</span> 
        <span style={{color:"#f536ff"}}>(</span> 
        <span style={{color:"#36a8ff"}}>res.locals.data</span> 
        <span style={{color:"#f536ff"}}>)</span> 
        <br />
        <span style={{color:"#ff6161"}}>&#125;</span> 
        <span style={{color:"#56b6c2"}}>)</span> 
        <span style={{color:"fff"}}>;</span> 
      </div>
        
    </div>
  );
};
export default TextArea3;

// app.use("/api/graphql", StashQL.queryHandler, (req, res) => {
//   return res.status(200).json({data: res.locals.data, runTime: res.locals.runTime});
// });


{/* <div id="doc-code-block-2">
      <div>
      <span style={{color:"#ce70cc"}}>const </span>
        <span style={{color:"#ffc91e"}}>StashQL </span>
        <span style={{color:"#56b6c2"}}>= </span>
        <span style={{color:"#ce70cc"}}>new </span>
        <span style={{color:"#ffc91e"}}>stashql(schema, redisCache, 1000)</span>;
      </div>
        
      </div> */}


{/* <span style={{color:"#ce70cc"}}>const </span>
        <span style={{color:"#ffc91e"}}>StashQL </span>
        <span style={{color:"#56b6c2"}}>= </span>
        <span style={{color:"#ce70cc"}}>new </span>
        <span style={{color:"#ffc91e"}}>stashql(schema, redisCache, 1000)</span>; */}