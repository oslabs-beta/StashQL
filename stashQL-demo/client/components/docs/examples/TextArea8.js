import React from 'react';

const TextArea8 = () => {
  const mutation = `mutation {
  addAuthor(name: "John Smith", clearRelatedFields: "authors") {
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
export default TextArea8;