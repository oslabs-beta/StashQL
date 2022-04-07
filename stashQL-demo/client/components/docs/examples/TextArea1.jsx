import React from 'react';

const TextArea1 = () => {
  const docCodeBlockSyntax = `const StashQL = new stashql(schema, redisCache, 1000);`
  return (
    <div id="textarea">
      <div id="doc-code-block">
        <span style={{color:"#ffc91e"}}>stashql</span>(schema, cache, ttl);
      </div>
    </div>
  );
};
export default TextArea1;