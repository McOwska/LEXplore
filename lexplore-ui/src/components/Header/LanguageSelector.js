import { useState, useEffect, useRef } from "react";
import { SUPPORTED_LANGUAGES } from "../../constants";
import styles from './Header.module.css';
import { GrLanguage } from "react-icons/gr";

const LanguageSelector = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(SUPPORTED_LANGUAGES[0]['code']);
    const containerRef = useRef(null);

    const changeLanguage = (lang) => {
        setSelectedLanguage(lang);
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
                <p>{SUPPORTED_LANGUAGES.filter(({code}) => code === selectedLanguage)[0].label}</p>
            </button>
            {
                openDropdown && 
                (
                    <div className={styles.languageSelectorOptionsWrapper}>{
                        SUPPORTED_LANGUAGES.filter(({code}) => code !== selectedLanguage).map(({ code, label }) => {
                        return (
                            <button className={styles.languageOptionButton} key={code} onClick={() => changeLanguage(code)}>
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