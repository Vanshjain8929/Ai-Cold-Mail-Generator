import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

    {/* Public */}

    <Route path="/" element={<Landing />} />

    <Route path="/login" element={<Login />} />

    <Route path="/signup" element={<Signup />} />

    <Route path="/verify-otp" element={<VerifyOtp />} />


    {/* Protected */}

    <Route
        path="/dashboard"
        element={
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        }
    />

    <Route
        path="/history"
        element={
            <ProtectedRoute>
                <History />
            </ProtectedRoute>
        }
    />

    <Route
        path="/profile"
        element={
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        }
    />
    

</Routes>
  );
}

export default App;