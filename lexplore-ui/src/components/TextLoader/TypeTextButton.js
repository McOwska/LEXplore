import { useIntl } from "react-intl";
import CustomButton from "../CustomButton/CustomButton";

const TypeTextButton = ({toggleTextArea, clearContent}) => {
    const intl = useIntl();

    return <CustomButton label={intl.formatMessage({ id: "button.typeText" })} onClick={() => { toggleTextArea(); clearContent(); } }/>;
}

export default TypeTextButton;