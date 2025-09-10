import { Link } from 'react-router-dom';

const AvailableLanguagesPage = () => {
    return (
        <>
            <h2>Currently available languages</h2>
            <p>swedish</p>
            <Link to="/">Go back to Home</Link>
        </>
    );
}

export default AvailableLanguagesPage;