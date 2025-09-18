import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.logo}>
        <img src={process.env.PUBLIC_URL + "/LEXlogo.png"} alt="logo" />
      </div>
      <div className={styles.info}>
        <p>@2025 McOwska</p>
        <a className={styles.link} href="https://github.com/McOwska/LEXplore">
          Github
        </a>
        <p>zuza.m.makowska@gmail.com</p>
      </div>
      <div></div>
    </div>
  );
};

export default Footer;
