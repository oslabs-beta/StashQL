import React from 'react';

const TextArea6 = () => {
  const mutation = `mutation {
  addAuthor(name: "John Smith", refillCache: "authors") {
    name
  }
}`;

  return (
    <div id="textarea-box">
      <textarea
        id="doc-code-block"
        rows='5'
        readOnly
        value={mutation}
      />
    </div>
  );
};
export default TextArea6;