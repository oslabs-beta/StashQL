import React from 'react';

const TextArea4 = () => {
  const query = 
    `query {
        books {
            name
        }
    }`;
  return (
    <div id="textarea-box">
      <textarea
        id="doc-code-block"
        rows='5'
        readOnly
        value={query}
      />
    </div>
  );
};
export default TextArea4;