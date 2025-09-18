import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
import { useTranslationLanguage } from "../contexts/TranslationLanguageContext";
import { TRANSLATION_LANGUAGES } from "../constants";
import LanguageButtonsContainer from "../components/LanguageButtons/LanguageButtonsContainer";
import styles from "./pages.module.css";

const AvailableLanguagesPage = () => {
  const intl = useIntl();
  const { translationLanguage } = useTranslationLanguage();

  console.log("translation Language", translationLanguage);

  return (
    <div className={styles.blockContainer}>
      <p>{intl.formatMessage({ id: "availableLanguages.desc" })}</p>
      {TRANSLATION_LANGUAGES.map((lang) => (
        <li>{intl.formatMessage({ id: `availableLanguages.${lang}` })}</li>
      ))}
      <p>{intl.formatMessage({ id: "availableLanguages.chooseLanguage" })}</p>
      <LanguageButtonsContainer />
      <Link to="/">{intl.formatMessage({ id: "link.backHome" })}</Link>
    </div>
  );
};

export default AvailableLanguagesPage;
