import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import { TextProvider } from "./contexts/TextContext";
import { TranslationLanguageProvider } from "./contexts/TranslationLanguageContext";
import MainPage from "./pages/MainPage";
import ErrorPage from "./pages/ErrorPage";
import AboutPage from "./pages/AboutPage";
import AvailableLanguagesPage from "./pages/AvaiableLanguagesPage";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <TextProvider>
        <TranslationLanguageProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/languages" element={<AvailableLanguagesPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </TranslationLanguageProvider>
      </TextProvider>
    </div>
  );
}

export default App;
