import { useText } from "../../contexts/TextContext";
import styles from "./TextPage.module.css";

const sentenceRegex = /[^.!?]+[.!?]*|\S+/g; 

const TextPage = () => {
    const { text } = useText();

    const content = text?.trim() || "No text content available.";
    const sentences = content.match(/[^.!?]+[.!?]*/g) || [content];

    const handleWordClick = (word) => {
        console.log(word);
    };

    const handleWordContext = (e, sentence) => {
        e.preventDefault();
        console.log(sentence.trim());
     };

     return (
        <div className={styles.pageTextContainer}>
          <p className={styles.pageTextPContent}>
            {sentences.map((sentence, sIdx) => {
              const tokens = sentence.split(/(\s+)/);
              return (
                <span key={`s-${sIdx}`} className={styles.sentence}>
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
                      <span
                        key={`s-${sIdx}-w-${tIdx}`}
                        className={styles.word}
                        onClick={() => handleWordClick(cleanWord)}
                        onContextMenu={(e) => handleWordContext(e, sentence)}
                      >
                        {token}
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