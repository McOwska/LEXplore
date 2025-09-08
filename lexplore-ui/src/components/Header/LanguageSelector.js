import { useState, useEffect, useRef } from "react";
import { SUPPORTED_LANGUAGES } from "../../constants";
import styles from './Header.module.css';
import { GrLanguage } from "react-icons/gr";
import { useI18n } from "../../contexts/LanguageContext";

const LanguageSelector = () => {
    const { locale, setLocale } = useI18n();
    const [openDropdown, setOpenDropdown] = useState(false);
    const containerRef = useRef(null);

    const changeLanguage = (lang) => {
        setLocale(lang);   
        setOpenDropdown(false);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpenDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={containerRef} className={`${styles.languageSelectorContainer} ${openDropdown ? styles.languageSelectorOpened : ''}`}>
            <button className={styles.languageSelectorMainButton} onClick={() => setOpenDropdown(!openDropdown)}>
                <GrLanguage />
                <p>{SUPPORTED_LANGUAGES.filter(({code}) => code === locale)[0].label}</p>
            </button>
            {
                openDropdown && 
                (
                    <div className={styles.languageSelectorOptionsWrapper}>{
                        SUPPORTED_LANGUAGES.filter(({code}) => code !== locale).map(({ code, label }) => {
                        return (
                            <button className={`${styles.languageOptionButton} ${styles.buttonColors}`} key={code} onClick={() => changeLanguage(code)}>
                                {label}
                            </button>
                        )
                    })
                    }</div>
                )
            }
        </div>
    );
}

export default LanguageSelector;