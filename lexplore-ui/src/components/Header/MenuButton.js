import { useState, useEffect, useRef } from "react";
import { GrMenu } from "react-icons/gr";
import styles from './Header.module.css';

const MenuButton = () => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsMenuOpened(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={containerRef} className={styles.menuContainer}>
            <button className={styles.menuIcon} onClick={() => setIsMenuOpened(!isMenuOpened)}>
                <GrMenu />
            </button>
        </div>
    );
}

export default MenuButton;