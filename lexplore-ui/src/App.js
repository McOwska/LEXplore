import TextLoader from './components/TextLoader/TextLoader';
import './App.css';
import Header from './components/Header/Header';
import TextPage from './components/TextPage/TextPage';
import { TextProvider } from './contexts/TextContext';

function App() {
  return (
    <TextProvider>
      <div className="App">
        <Header />
        <TextLoader />
        <TextPage />
      </div>
    </TextProvider>
  );
}

export default App;
