import { useState } from "react";
import ImportButton from "./ImportButton";
import TypeTextButton from "./TypeTextButton";
import styles from "./TextLoader.module.css";
import { useIntl } from "react-intl";
import TextArea from "./TextArea";

const TextLoader = () => {
    const intl = useIntl();
    const [shouldShowTextArea, setShouldShowTextArea] = useState(false);
    const [textContent, setTextContent] = useState('');

    return (
        <div>
            <div className={styles.backgroundContainer}>
                <ImportButton toggleTextArea={() => setShouldShowTextArea(true)} primary={!shouldShowTextArea} setTextContent={setTextContent} />
                <p>{intl.formatMessage({id: "textLoader.or"})}</p>
                <TypeTextButton toggleTextArea={() => setShouldShowTextArea(true)} clearContent={() => setTextContent('')}/>
            </div>
            {shouldShowTextArea && <TextArea content={textContent} setContent={setTextContent} closeTextArea={() => setShouldShowTextArea(false)}/>}
        </div>
    );
}

export default TextLoader;