import CustomButton from "../CustomButton/CustomButton";
import styles from "./TextLoader.module.css";

const TextArea = ({ content, setContent, closeTextArea }) => {
    const handleSubmit = () => {
        console.log("Submitted content:", content);
        closeTextArea();
    };
    return (
        <div className={styles.textAreaContainer}>
            <textarea className={styles.textArea} placeholder="Type your own text..." rows={10} value={content} onChange={(e) => setContent(e.target.value)} />
            <CustomButton primary={true} label="Submit" onClick={handleSubmit}/>
        </div>
    );
}

export default TextArea;