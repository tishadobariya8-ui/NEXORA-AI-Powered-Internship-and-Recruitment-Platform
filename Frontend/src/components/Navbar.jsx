import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/useAuth";

function Navbar() {

    const navigate = useNavigate();
    const { user } = useAuth();
    const isLoggedIn = !!user;
    
    return (

        <header className="navbar">

            <div className="nav-container">

                <div
                    className="logo"
                    onClick={() => navigate("/")}
                    style={{ cursor: "pointer" }}
                >
                    NEX<span>ORA</span>
                </div>

                <nav className="nav-links">

                    <Link to="/">Home</Link>

                    <Link to="/about">About</Link>

                    <Link to="/internships">Internships</Link>

                    {isLoggedIn && (
                        <Link to="/student-dashboard">
                            Dashboard
                        </Link>
                    )}

                </nav>

                <div className="nav-buttons">

                    {!isLoggedIn && (

                        <>
                            <Link to="/login">
                                <button className="btn-outline">
                                    Log In
                                </button>
                            </Link>

                            <Link to="/signup">
                                <button className="btn-primary">
                                    Sign Up Free
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
export default Navbar;