import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { useText } from "../../contexts/TextContext";
import styles from "./TextPage.module.css";
import { API_URL } from "../../constants";

const TextPage = () => {
  const intl = useIntl();
  const { text } = useText();

  const content = text?.trim() || intl.formatMessage({ id: "main.noTextContent" });
  const sentences = content.match(/[^.!?]+[.!?]*/g) || [content];

  const [clickedSentence, setClickedSentence] = useState(null);
  const [clickedWord, setClickedWord] = useState(null);
  const [translation, setTranslation] = useState(null);

  useEffect(() => {
    const handleGlobalPointerDown = () => {
      setClickedSentence(null);
      setClickedWord(null);
      setTranslation(null);
    };

    document.addEventListener("pointerdown", handleGlobalPointerDown, true);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setClickedSentence(null);
        setTranslation(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleGlobalPointerDown,
        true,
      );
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const getTranslation = async (payload, item) => {
    try {
      const res = await fetch(`${API_URL}/translate-${item}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload }),
      });

      if (!res.ok) throw new Error("Translation failed");

      const data = await res.json();
      return data.translation.replaceAll("\n", " / ");
    } catch (err) {
      console.error("Error:", err);
      return err;
    }
  };

  const handleWordClick = async (word, sIdx, tIdx) => {
    setClickedWord({ sIdx, tIdx });
    const translated = await getTranslation(word, "word");
    setTranslation(translated);
  };

  const handleWordContext = async (e, sentence, idx) => {
    e.preventDefault();
    setClickedSentence(idx);
    const translated = await getTranslation(sentence.trim(), "sentence");
    setTranslation(translated);
  };

  if (!text) {
    return (
      <div className={styles.pageTextContainer}>
        <p className={styles.pageTextPContent}>{content}</p>
      </div>
    );
  }

  return (
    <div className={styles.pageTextContainer}>
      <p className={styles.pageTextPContent}>
        {sentences.map((sentence, sIdx) => {
          const tokens = sentence.split(/(\s+)/);
          return (
            <span
              key={`s-${sIdx}`}
              className={`${styles.sentence} ${clickedSentence === sIdx ? styles.sentenceHighlighted : ""}`}
            >
              {tokens.map((token, tIdx) => {
                if (/\s+/.test(token)) return token;

                const cleanWord = token.replace(
                  /^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu,
                  "",
                );

                const isWord = /\p{L}|\p{N}/u.test(cleanWord);
                if (!isWord) {
                  return <span key={`s-${sIdx}-t-${tIdx}`}>{token}</span>;
                }

                return (
                  <span
                    className={styles.wordWrapper}
                    key={`s-${sIdx}-twrap-${tIdx}`}
                  >
                    <button
                      key={`s-${sIdx}-w-${tIdx}`}
                      className={`${styles.wordButton} ${
                        clickedWord?.sIdx === sIdx && clickedWord?.tIdx === tIdx
                          ? styles.sentenceHighlighted
                          : ""
                      }
                      ${!translation ? styles.noTranslation : ""}
                      `}
                      data-tooltip={translation}
                      onClick={(e) => handleWordClick(cleanWord, sIdx, tIdx)}
                      onContextMenu={(e) =>
                        handleWordContext(e, sentence, sIdx)
                      }
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
};

export default TextPage;
