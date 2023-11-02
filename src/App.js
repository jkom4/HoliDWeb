import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './components/pages/SignUpPage';
import LoginPage from './components/pages/LoginPage';
import Home from "./components/pages/HomePage";
import HomePage from "./components/pages/HomePage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
