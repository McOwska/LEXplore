import { useIntl } from "react-intl";
import CustomButton from "../CustomButton/CustomButton";

const TypeTextButton = ({toggleTextArea, clearContent}) => {
    const intl = useIntl();
    const handleButtonClick = () => {
        toggleTextArea();
        clearContent();
    }

    return (
        <CustomButton
            label={intl.formatMessage({ id: "button.typeText" })}
            onClick={handleButtonClick}
        />
    );
}

export default TypeTextButton;