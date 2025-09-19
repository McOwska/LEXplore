import { useIntl } from "react-intl";
import LanguageSelector from "./LanguageSelector";
import MenuButton from "./Menu/MenuButton";
import styles from "./Header.module.css";
import { useTranslationLanguage } from "../../contexts/TranslationLanguageContext";

const Header = () => {
  const intl = useIntl();
  const { translationLanguage } = useTranslationLanguage();
  const imgPath = `/languages/${translationLanguage}_en.png`;
  console.log('path', imgPath)

  return (
    <div className={styles.headerContainer}>
      <div className={`${styles.sideContainer} ${styles.sideContainerLeft}`}>
        <MenuButton />
      </div>
      <div className={styles.centerContainer}>
        <img
            className={styles.languageImg}
            src={imgPath}
            alt={translationLanguage}
        />
        <div>
          <h1>{intl.formatMessage({ id: "app.title" })}</h1>
          <h2>{intl.formatMessage({ id: "app.description" })}</h2>
        </div>
        <img
            className={styles.languageImg}
            src={imgPath}
            alt={translationLanguage}
        />
      </div>
        <div className={`${styles.sideContainer} ${styles.sideContainerRight}`}>
          <LanguageSelector />
        </div>
    </div>
  );
};

export default Header;
