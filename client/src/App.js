import './App.css';
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';


function App() {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
