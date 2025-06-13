import React, { useMemo } from 'react';

const TextDisplay = ({ text = '' }) => {
  const sentences = useMemo(() => {
    const parts = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
    return parts.map((s) => s.trim());
  }, [text]);

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
                onClick={() => console.log('WORD:', word)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  console.log('SENTENCE:', sentence);
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
