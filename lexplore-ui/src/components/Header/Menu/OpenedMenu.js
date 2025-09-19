import { GrMenu } from "react-icons/gr";
import { useIntl } from "react-intl";
import styles from "../Header.module.css";
import { useNavigate } from "react-router-dom";

const OpenedMenu = ({ toggleMenu }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  return (
    <div className={`${styles.openedMenu} ${styles.buttonColors}`}>
      <GrMenu className={styles.openedMenuIcon} onClick={toggleMenu} />
      <button onClick={() => { navigate("/"); toggleMenu(); }}>
        {intl.formatMessage({ id: "menu.home" })}
      </button>
      <button onClick={() => { navigate("/languages"); toggleMenu(); }}>
        {intl.formatMessage({ id: "menu.availableLanguages" })}
      </button>
      <button onClick={() => { navigate("/about"); toggleMenu(); }}>
        {intl.formatMessage({ id: "menu.about" })}
      </button>
    </div>
  );
};

export default OpenedMenu;
