import { useIntl } from "react-intl";
import CustomButton from "../CustomButton/CustomButton";
import styles from "./TextLoader.module.css";
import { useText } from "../../contexts/TextContext";

const TextArea = ({ content, setContent, closeTextArea }) => {
    const intl = useIntl();
    const { setText } = useText();

    const handleSubmit = () => {
        setText(content);
        closeTextArea();
    };

    return (
        <div className={styles.textAreaContainer}>
            <textarea
                className={styles.textArea}
                placeholder={intl.formatMessage({ id: "textLoader.placeholder" })}
                rows={10} value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <CustomButton
                primary
                label={intl.formatMessage({ id: "textLoader.submit" })}
                onClick={handleSubmit}
            />
        </div>
    );
}

export default TextArea;