import styles from "./CustomButton.module.css";

const CustomButton = ({label, primary, onClick}) => {
    console.log('button', label, primary)
    return (
        <button onClick={onClick} className={primary ? styles.primary : styles.secondary}>
            {label}
        </button>
    );
}

export default CustomButton;