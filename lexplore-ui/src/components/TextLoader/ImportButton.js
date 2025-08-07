import { useRef } from "react";
import { useIntl } from "react-intl";
import CustomButton from "../CustomButton/CustomButton";

const ImportButton = ({ toggleTextArea, primary, setTextContent }) => {
  const intl = useIntl();
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        setTextContent(text);
        toggleTextArea();
        event.target.value = "";
      };
      reader.readAsText(file);
    } else {
      alert("Choose a .txt file");
    }
  };

  return (
    <>
      <CustomButton
        label={intl.formatMessage({ id: "button.importText" })}
        onClick={handleButtonClick}
        primary={primary}
      />
      <input
        type="file"
        accept=".txt"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </>
  );
};

export default ImportButton;
