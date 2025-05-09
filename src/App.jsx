import { Route, Routes } from "react-router";
import Landing from "./features/landing/pages/LandingPage";
import Registration from "./features/auth/pages/Registration";
import Login from "./features/auth/pages/Login";
import Home from "./features/home/pages/home";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
