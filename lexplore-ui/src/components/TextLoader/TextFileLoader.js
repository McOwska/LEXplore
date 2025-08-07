import React, { useState } from 'react';
import TextDisplay from './TextDisplay';

const TextFileLoader = () => {
  const [fileContent, setFileContent] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type === 'text/plain') {
      const reader = new FileReader();

      reader.onload = (e) => {
        setFileContent(e.target.result);
      };

      reader.readAsText(file, 'UTF-8');
    } else {
      alert('Choose a .txt file');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      {fileContent && (
        <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
          <TextDisplay text={fileContent} />
        </div>
      )}
    </div>
  );
};

export default TextFileLoader;
