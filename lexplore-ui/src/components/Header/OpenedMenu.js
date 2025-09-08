import { GrMenu } from "react-icons/gr";
import { useIntl } from "react-intl";
import styles from './Header.module.css';

const OpenedMenu = ({ toggleMenu }) => {
    const intl = useIntl();
    return (
        <div className={`${styles.openedMenu} ${styles.buttonColors}`}>
            {/* Placeholder for the opened menu content */}
            <GrMenu className={styles.openedMenuIcon} onClick={toggleMenu}/>
            <button>{intl.formatMessage({id: "menu.availableLanguages"})}</button>
            <button>{intl.formatMessage({id: "menu.about"})}</button>
        </div>
    );
}

export default OpenedMenu;