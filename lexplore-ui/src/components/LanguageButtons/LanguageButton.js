import styles from "./LanguageButton.module.css";
import { useTranslationLanguage } from "../../contexts/TranslationLanguageContext";

const LanguageButton = ({ languageCode }) => {
  const imgPath = `/languages/${languageCode}.png`;
  const { translationLanguage, setTranslationLanguage } =
    useTranslationLanguage();

  const changeLanguage = () => {
    setTranslationLanguage(languageCode.split("_")[0]);
    // API CALL
  };

  return (
    <img
      className={`${styles.languageButton} ${translationLanguage === languageCode.split("_")[0] ? styles.languageButtonActive : styles.languageButtonInactive}`}
      onClick={changeLanguage}
      src={imgPath}
      alt={languageCode}
    />
  );
};

export default LanguageButton;
