import CustomButton from "../CustomButton/CustomButton";
import styles from "./TextLoader.module.css";

const TextArea = ({ content }) => {
    return (
        <div className={styles.textAreaContainer}>
            <textarea className={styles.textArea} placeholder="Type your own text..." rows={10} value={content}/>
            <CustomButton primary={true} label="Submit" />
        </div>
    );
}

export default TextArea;