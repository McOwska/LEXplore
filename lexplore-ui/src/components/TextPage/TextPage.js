import { useText } from "../../contexts/TextContext";

const TextPage = () => {
    const { text } = useText();

    return (
        <div>
            <p>{text ? text : "No text content available."}</p>
        </div>
    );
}

export default TextPage;