import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Internship from "./pages/Internship";
import InternshipDetails from "./pages/InternshipDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CompleteProfile from "./pages/CompleteProfile";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AIResult from "./pages/AIResult";
import "./styles/variables.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
            path="/about"
            element={
                <ProtectedRoute>
                    <About />
                </ProtectedRoute>
            }
        /> 
        <Route
            path="/internships"
            element={
                <ProtectedRoute>
                    <Internship />
                </ProtectedRoute>
            }
        />       
        <Route
            path="/internships/:id"
            element={
                <ProtectedRoute>
                    <InternshipDetails />
                </ProtectedRoute>
            }
        />        
        <Route
            path="/login"
            element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
            }
        />        
        <Route
            path="/signup"
            element={
                <PublicRoute>
                    <Signup />
                </PublicRoute>
            }
        />
        <Route
            path="/complete-profile"
            element={
                <ProtectedRoute>
                    <CompleteProfile />
                </ProtectedRoute>
            }
        />        
        <Route 
            path="/student-dashboard" 
            element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
            } 
        />
        <Route
            path="/ai-result"
            element={<AIResult />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


