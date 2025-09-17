import { Link } from "react-router-dom";
import { useIntl } from "react-intl";

const ErrorPage = () => {
  const intl = useIntl();
  return (
    <div>
      <h2>404 {intl.formatMessage({id: "errorPage.title"})}</h2>
      <Link to="/">{intl.formatMessage({id: "link.backHome"})}</Link>
    </div>
  );
};

export default ErrorPage;
