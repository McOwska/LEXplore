import { useState, useEffect } from "react";
import { useText } from "../../contexts/TextContext";
import styles from "./TextPage.module.css";

const sentenceRegex = /[^.!?]+[.!?]*|\S+/g; 

const TextPage = () => {
    const { text } = useText();

    const content = text?.trim() || "No text content available.";
    const sentences = content.match(/[^.!?]+[.!?]*/g) || [content];

    const [clickedSentence, setClickedSentence] = useState(null);
    const [translation, setTranslation] = useState(null);

    useEffect(() => {
        const handleGlobalPointerDown = () => {
            setClickedSentence(null);
        };
      
        document.addEventListener("pointerdown", handleGlobalPointerDown, true);
      
        const handleKeyDown = (e) => {
          if (e.key === "Escape") setClickedSentence(null);
        };
        document.addEventListener("keydown", handleKeyDown);
      
        return () => {
          document.removeEventListener("pointerdown", handleGlobalPointerDown, true);
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, []);

    const handleWordClick = (word) => {
        console.log(word);
        setTranslation(`translated word: ${word}`);
    };

    const handleWordContext = (e, sentence, idx) => {
        e.preventDefault();
        console.log(sentence.trim());
        setClickedSentence(idx);
        setTranslation(`translated sentence: ${sentence.trim()}`);
     };

     return (
        <div className={styles.pageTextContainer}>
          <p className={styles.pageTextPContent}>
            {sentences.map((sentence, sIdx) => {
              const tokens = sentence.split(/(\s+)/);
              return (
                <span key={`s-${sIdx}`} className={`${styles.sentence} ${clickedSentence === sIdx ? styles.sentenceHighlighted : ""}`}
>
                  {tokens.map((token, tIdx) => {
                    if (/\s+/.test(token)) return token;
    
                    const cleanWord = token.replace(
                      /^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu,
                      ""
                    );
    
                    const isWord = /\p{L}|\p{N}/u.test(cleanWord);
                    if (!isWord) {
                      return (
                        <span key={`s-${sIdx}-t-${tIdx}`}>{token}</span>
                      );
                    }
    
                    return (
                        <span className={styles.wordWrapper}>
                            <button
                                key={`s-${sIdx}-w-${tIdx}`}
                                className={styles.wordButton}
                                data-tooltip={translation} 
                                onClick={(e) => {
                                    if (e.button === 0) {
                                      handleWordClick(cleanWord);
                                    } else if (e.button === 2) {
                                      handleWordContext(e, sentence, sIdx);
                                    }
                                  }}
                                onContextMenu={(e) => handleWordContext(e, sentence, sIdx)}
                            >
                                {token}
                            </button>
                        </span>   
                    );
                  })}
                </span>
              );
            })}
          </p>
        </div>
      );
}

export default TextPage;