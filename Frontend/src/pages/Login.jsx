import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Login.css";
import { useAuth } from "../context/useAuth";
import API from "../api";

function Login() {
    const [role, setRole] = useState("student");
    const navigate = useNavigate();

    const { login } = useAuth();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const handleChange = (e) => {

        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => {
            setMessage("");
            setMessageType("");
        }, 3000);
        return () => clearTimeout(timer);
    }, [message]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const response = await API.post(
                "/api/auth/login",
                {
                    email: loginData.email,
                    password: loginData.password
                }
            );

            login(
                response.data.user,
                response.data.access_token
            );

            setMessage(response.data.message);
            setMessageType("success");
            setTimeout(() => {
                navigate("/student-dashboard");
            }, 1000);
        }

        catch (error) {
            if (error.response) {
                setMessage(error.response.data.detail);
            }
            else {
                setMessage("Server Error");
            }
            setMessageType("error");
        }
    };

  return (
    <>
      {/* <Navbar /> */}

      <section className="login-page">
        {message && (
            <div className={`login-message ${messageType}`}>
                {message}
            </div>
        )}

        {/* LEFT SIDE */}

        <div className="login-left">
          <div className="left-content">
            <p className="welcome-tag">
              WELCOME TO NEXORA
            </p>

            <h1>
              Your next <br />
              opportunity <br />
              <span>starts here.</span>
            </h1>

            <p className="left-description">
              Sign in to discover internships,
              track applications, build your profile,
              and unlock new opportunities.
            </p>

            <div className="feature-list">

            <div className="feature-card">
                <span>📈</span>
                <p>Live Internship Tracking</p>
            </div>

            <div className="feature-card">
                <span>🏆</span>
                <p>Verified Certificates</p>
            </div>

            <div className="feature-card">
                <span>🤝</span>
                <p>Mentor Support</p>
            </div>

            <div className="feature-card">
                <span>🚀</span>
                <p>Active Internships</p>
            </div>

            </div>

            <div className="feature-card">
                <span>🎓</span>
                <p>Internship Certificates</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="login-right">
          <div className="login-card">

            <h2>
                {role === "student" && "Student Login"}
                {role === "startup" && "Startup Login"}
                {role === "company" && "Company Login"}
            </h2>

            <p className="login-subtitle">
                {role === "student" &&
                    "Sign in to apply for internships and track applications."}

                {role === "startup" &&
                    "Sign in to manage your internships and applicants."}

                {role === "company" &&
                    "Sign in to recruit talented students from NEXORA."}
            </p>

            <div className="role-tabs">

                <button
                    className={role === "student" ? "active" : ""}
                    onClick={() => setRole("student")}
                    type="button"
                >
                    🎓 Student
                </button>

                <button
                    className={role === "startup" ? "active" : ""}
                    onClick={() => setRole("startup")}
                    type="button"
                >
                    🚀 Startup
                </button>

                <button
                    className={role === "company" ? "active" : ""}
                    onClick={() => setRole("company")}
                    type="button"
                >
                    🏢 Company
                </button>

            </div>

            <form onSubmit={handleLogin}>

              <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
              />

              <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    placeholder="Password"
              />

              <button 
                type="submit"
                className="login-btn">
                {role === "student" && "Log In"}

                {role === "startup" && "Continue as Startup"}

                {role === "company" && "Continue as Company"}
              </button>

              {role === "student" && (
              <button
                type="button"
                className="google-btn"
              >
                Continue with Google
              </button>
              )}

            </form>

            <p className="signup-link">

                {role === "student" && (
                    <>
                        Don't have a student account?
                        <span onClick={() => navigate("/signup")}>
                            {" "}Sign Up
                        </span>
                    </>
                )}

                {role === "startup" && (
                    <>
                        Register your startup.
                        <span onClick={() => navigate("/signup")}>
                            {" "}Sign Up
                        </span>
                    </>
                )}

                {role === "company" && (
                    <>
                        Create a company account.
                        <span onClick={() => navigate("/signup")}>
                            {" "}Sign Up
                        </span>
                    </>
                )}

            </p>
          </div>
        </div>
      </section>
    </>
  );
}
export default Login;
