import { useState, useEffect } from "react";
import { useText } from "../../contexts/TextContext";
import styles from "./TextPage.module.css";
import { API_URL } from "../../constants";

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

    const getTranslation = async (payload, item) => {
        try {
          const res = await fetch(`${API_URL}/translate-${item}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ payload }),
          });
      
          if (!res.ok) throw new Error('Translation failed');
      
          const data = await res.json();
          return data.translation;
        } catch (err) {
          console.error('Error:', err);
          return err; 
        }
    };

    const handleWordClick = async (word) => {
        const translated = await getTranslation(word, 'word');
        setTranslation(translated);
    };

    const handleWordContext = async (e, sentence, idx) => {
        e.preventDefault();
        console.log(sentence.trim());
        setClickedSentence(idx);
        const translated = await getTranslation(sentence.trim(), 'sentence');
        setTranslation(translated);
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