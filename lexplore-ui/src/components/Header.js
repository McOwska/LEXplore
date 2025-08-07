import { useIntl } from 'react-intl';

const Header = () => {
    const intl = useIntl();

    return (
        <>
            <h1>{intl.formatMessage({ id: "app.title" })}</h1>
            <h2>{intl.formatMessage({ id: "app.description" })}</h2>
        </>
    );
}

export default Header;