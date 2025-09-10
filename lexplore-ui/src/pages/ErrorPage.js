import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <>
            <h2>404</h2>
            <p>Page not found</p>
            <Link to="/">Go back to Home</Link>
        </>
    );
}

export default ErrorPage;