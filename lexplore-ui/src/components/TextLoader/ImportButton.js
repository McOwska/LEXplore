import { useIntl } from "react-intl";
import CustomButton from "../CustomButton/CustomButton";

const ImportButton = ({toggleTextArea, primary}) => {
    const intl = useIntl();

    return <CustomButton label={intl.formatMessage({ id: "button.importText" })} onClick={toggleTextArea} primary={primary}/>;
}

export default ImportButton;