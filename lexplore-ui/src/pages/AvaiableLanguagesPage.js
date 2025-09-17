import { Link } from "react-router-dom";

const AvailableLanguagesPage = () => {
  return (
    <div>
      <h2>Currently available languages</h2>
      <p>swedish</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default AvailableLanguagesPage;
