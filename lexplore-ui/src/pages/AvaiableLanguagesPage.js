import { Link } from "react-router-dom";
import { useIntl } from "react-intl";

const AvailableLanguagesPage = () => {
  const intl = useIntl();

  return (
    <div>
      <p>{intl.formatMessage({id: "availableLanguages.desc"})}</p>
      <Link to="/">{intl.formatMessage({id: "link.backHome"})}</Link>
    </div>
  );
};

export default AvailableLanguagesPage;
