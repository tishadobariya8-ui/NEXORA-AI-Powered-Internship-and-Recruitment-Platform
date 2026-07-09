import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard() {

    const navigate = useNavigate();

    return (
        <div className="student-dashboard">

            {/* Sidebar */}

            <aside className="dashboard-sidebar">
                <div className="sidebar-logo">
                    <h2>NEXORA</h2>
                    <p>Student Portal</p>
                </div>

                <div className="sidebar-menu">

                    <button className="active-menu">
                        Dashboard
                    </button>

                    <button>
                        Browse Internships
                    </button>

                    <button>
                        My Applications
                    </button>

                    <button>
                        Saved Internships
                    </button>

                    <button>
                        Certificates
                    </button>

                    <button>
                        My Profile
                    </button>

                    <button>
                        Settings
                    </button>
                </div>

                <button
                    className="logout-btn"
                    onClick={() => navigate("/")}
                >
                    Logout
                </button>
            </aside>

            {/* Main */}

            <main className="dashboard-content">
                <div className="dashboard-header">
                    <div>
                        <h1>Welcome Back 👋</h1>
                        <p>
                            Track your internships, applications and career journey.
                        </p>
                    </div>
                    <button className="find-btn">
                        Find Internship
                    </button>
                </div>
            </main>
        </div>
    );
}
export default StudentDashboard;