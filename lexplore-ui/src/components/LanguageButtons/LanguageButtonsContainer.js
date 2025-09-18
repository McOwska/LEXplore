import { TRANSLATION_LANGUAGES } from "../../constants";
import LanguageButton from "./LanguageButton";
import styles from "./LanguageButton.module.css";

const LanguageButtonsContainer = () => {
  return (
    <div className={styles.buttonsContainer}>
      {TRANSLATION_LANGUAGES.map((lang) => (
        <LanguageButton languageCode={lang} />
      ))}
    </div>
  );
};

export default LanguageButtonsContainer;
