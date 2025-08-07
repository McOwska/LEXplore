import CustomButton from "../CustomButton/CustomButton";
import styles from "./TextLoader.module.css";

const TextArea = ({ content, setContent }) => {
    return (
        <div className={styles.textAreaContainer}>
            <textarea className={styles.textArea} placeholder="Type your own text..." rows={10} value={content} onChange={(e) => setContent(e.target.value)} />
            <CustomButton primary={true} label="Submit" />
        </div>
    );
}

export default TextArea;