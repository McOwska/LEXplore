import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";
import styles from './pages.module.css'

export default function AboutPage() {
  const [md, setMd] = useState("");

  useEffect(() => {
    fetch("/README.md", { cache: "no-store" })
      .then(r => r.text())
      .then(setMd)
      .catch(() => setMd("# Error\nNie udało się wczytać README."));
  }, []);

  return (
    <>
      <div className={styles.readme}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
      </div>
      <Link to="/">Go back to Home</Link>
    </>
  );
}
