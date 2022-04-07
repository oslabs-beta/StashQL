import React from 'react';

const TextArea3 = () => {
  const docCodeBlockQueryHandler = 
  `app.use ( '/graphql', StashQL.queryHandler, ( req, res ) => { \n
      return res.status(200).json( res.locals.data );\n
  });`;
  return (
    <div id="textarea-box">
      <textarea
        id="doc-code-block"
        rows='3'
        readOnly
        value={docCodeBlockQueryHandler}
      />
    </div>
  );
};
export default TextArea3;