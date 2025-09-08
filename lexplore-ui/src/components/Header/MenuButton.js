import { useState, useEffect, useRef } from "react";
import { GrMenu } from "react-icons/gr";
import styles from './Header.module.css';
import OpenedMenu from "./OpenedMenu";

const MenuButton = () => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsMenuOpened(false);
                console.log("clicked outside")
                console.log(isMenuOpened)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
 
    return (
        <div ref={containerRef} className={styles.menuContainer}>
            { !isMenuOpened ? 
                <button className={`${styles.menuIcon} ${styles.buttonColors}`} onClick={() => setIsMenuOpened(!isMenuOpened)}>
                    <GrMenu />
                </button> 
                :
                <OpenedMenu toggleMenu={() => setIsMenuOpened(!isMenuOpened)}/>
            }
        </div>
    );
}

export default MenuButton;