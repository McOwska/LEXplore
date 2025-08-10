import { useText } from "../../contexts/TextContext";
import styles from "./TextPage.module.css";

const TextPage = () => {
    const { text } = useText();

    return (
        <div className={styles.pageTextContainer} >
            <p className={styles.pageTextPContent}> {text ? text : "No text content available."}</p>
        </div>
    );
}

export default TextPage;