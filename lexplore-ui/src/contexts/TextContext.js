import { createContext, useContext, useState, useEffect } from "react";

const TextContext = createContext();

export const useText = () => useContext(TextContext);

export const TextProvider = ({ children }) => {
  const [text, setText] = useState(() => {
    return localStorage.getItem("textContent") || "";
  });

  useEffect(() => {
    localStorage.setItem("textContent", text);
  }, [text]);

  return (
    <TextContext.Provider value={{ text, setText }}>
      {children}
    </TextContext.Provider>
  );
};
