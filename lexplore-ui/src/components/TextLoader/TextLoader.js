import { useState } from "react";
import ImportButton from "./ImportButton";
import TypeTextButton from "./TypeTextButton";
import styles from "./TextLoader.module.css";
import { useIntl } from "react-intl";

const TextLoader = () => {
    const intl = useIntl();
    const [shouldShowTextArea, setShouldShowTextArea] = useState(false);
    return (
        <div>
            <div className={styles.backgroundContainer}>
                <ImportButton toggleTextArea={() => setShouldShowTextArea(true)} primary={!shouldShowTextArea}/>
                <p>{intl.formatMessage({id: "textLoader.or"})}</p>
                <TypeTextButton toggleTextArea={() => setShouldShowTextArea(true)}/>
            </div>
            {shouldShowTextArea && <p>text area</p>}
        </div>
    );
}

export default TextLoader;