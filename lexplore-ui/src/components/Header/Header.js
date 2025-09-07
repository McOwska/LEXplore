import { useIntl } from 'react-intl';
import LanguageSelector from './LanguageSelector';
import MenuButton from './MenuButton';
import styles from './Header.module.css';

const Header = () => {
    const intl = useIntl();

    return (
        <div className={styles.headerContainer}>
            <div className={`${styles.sideContainer} ${styles.sideContainerLeft}}`}>
                <MenuButton />
            </div>
            <div>
                <h1>{intl.formatMessage({ id: "app.title" })}</h1>
                <h2>{intl.formatMessage({ id: "app.description" })}</h2>
            </div>
            <div className={`${styles.sideContainer} ${styles.sideContainerRight}`}>
                <LanguageSelector />
            </div>
            
        </div>
    );
}

export default Header;