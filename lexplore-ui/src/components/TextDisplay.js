import React, { useMemo } from 'react';

const TextDisplay = ({ text = '' }) => {
  const sentences = useMemo(() => {
    const parts = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
    return parts.map((s) => s.trim());
  }, [text]);

  const translateWord = (word) => {
    console.log('Translating word:', word);
  
    fetch('http://localhost:8000/translate-word', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Translation failed');
        return res.json();
      })
      .then((data) => {
        console.log('Translation:', data.translation);
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };
  
  const translateSentence = (sentence) => {
    console.log('Translating word:', sentence);
  
    fetch('http://localhost:8000/translate-sentence', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sentence }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Translation failed');
        return res.json();
      })
      .then((data) => {
        console.log('Translation:', data.translation);
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  return (
    <div style={{ lineHeight: 1.6 }}>
      {sentences.map((sentence, sIdx) => {
        const words = sentence.split(/\s+/);

        return (
          <span key={sIdx}>
            {words.map((word, wIdx) => (
              <span
                key={wIdx}
                style={{ cursor: 'pointer' }}
                onClick={() => translateWord(word)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  translateSentence(sentence);
                }}
              >
                {word}{' '}
              </span>
            ))}
          </span>
        );
      })}
    </div>
  );
};

export default TextDisplay;
