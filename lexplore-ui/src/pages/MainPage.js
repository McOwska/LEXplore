import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import TextLoader from "../components/TextLoader/TextLoader";
import TextPage from "../components/TextPage/TextPage";
import { useTranslationLanguage } from "../contexts/TranslationLanguageContext";
import { API_URL } from "../constants";

const MainPage = () => {
  const intl = useIntl();

  const { translationLanguage } = useTranslationLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const loadLanguageModel = async () => {
    try {
      const res = await fetch(`${API_URL}/change-language`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language_code: translationLanguage }),
      });

      if (!res.ok) throw new Error("Loading model failed");

      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error:", err);
      return err;
    }
  };

  useEffect(() => {
    console.log('load language model', translationLanguage);
    loadLanguageModel().then((res) => {
      if(res.status !== 'success') setIsLoadingError(true);
       setIsLoading(false)
      });
  }, [])

  if (isLoadingError) {
    return (
      <p>{ intl.formatMessage({id: "main.loadingModelError"}) }</p>
    );
  }

  if (isLoading) {
    return (
      <p>{ intl.formatMessage({id: "main.loadingModel" }) }</p>
    );
  };

  return (
    <div>
      <TextLoader />
      <TextPage />
    </div>
  );
};

export default MainPage;
