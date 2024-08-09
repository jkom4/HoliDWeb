import './index.css';
import {
    BrowserRouter,
    Routes,
    Route, Outlet, Navigate, HashRouter,
} from "react-router-dom";
import SignupPage from './components/pages/SignUpPage';
import LoginPage from './components/pages/LoginPage';
import HomePage from "./components/pages/HomePage";
import {isExpired} from "react-jwt";

function App() {
    const AuthWrapper = () => {
        return isExpired(localStorage.getItem('token'))
            ? <Navigate to="/login" replace />
            : <Outlet />
    };
  return (
      <HashRouter>
        <Routes>
            <Route >
                <Route path="/" element={<HomePage/>} />
            </Route>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
        </Routes>
      </HashRouter>
  );
}

export default App;
