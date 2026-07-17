import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../StudentDashboard.css";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/useAuth";
import axios from "axios";
import AIAssistant from "../components/AIAssistant";
import Api from "../api";

function StudentDashboard() {

    const navigate = useNavigate();
    const location = useLocation();
    const API_URL = "http://127.0.0.1:8000";
    const { user, logout } = useAuth();
    
    const [activePanel, setActivePanel] = useState(
        location.state?.panel || "overview"
    );
    const [profile, setProfile] = useState(null);
    const [applications, setApplications] = useState([]);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [savedInternships, setSavedInternships] = useState([]);

    const currentUser = {
        fullName: profile?.fullName || user?.fullName || "Student",
        email: profile?.email || user?.email || "",
        role: profile?.role || user?.role || "Student",
        college: profile?.college || "-",
        degree: profile?.degree || "-",
        branch: profile?.branch || "-"
    };

    useEffect(() => {
        if (!currentUser.email) return;
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/api/profile/me`,
                    {
                        params: {
                            email: currentUser.email
                        }
                    }
                );
                setProfile(response.data);
            }
            catch (error) {            
                console.error(error);
            }
        };
        fetchProfile();

    }, [currentUser.email]);

    useEffect(() => {
        if (!currentUser.email) return;
        const fetchApplications = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/api/applications/my-applications`,
                    {
                        params: {
                            email: currentUser.email
                        }
                    }
                );
                setApplications(response.data);
            }
            catch (error) {
                console.error(error);
            }
        };
        fetchApplications();
    }, [currentUser.email]);

    useEffect(() => {
        if (!user) return;
        const fetchSavedInternships = async () => {
            try {
                const response = await Api.get(`/api/save/${user.email}`);
                setSavedInternships(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSavedInternships();
    }, [user]);

    const initials = currentUser.fullName
        ? currentUser.fullName.charAt(0).toUpperCase()
        : "?";

    const removeSaved = async (id) => {
        try {
            await Api.delete("/api/save", {
                data: {
                    user_email: user.email,
                    internship_id: id
                }
            });
            setSavedInternships(prev =>
                prev.filter(item => item._id !== id)
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Navbar />

            <div id="page-dashboard">
                <div className="dash-layout">
                    <aside className="dash-sb">
                        <div>
                            <div className="sb-brand">
                                <div className="sb-brand-name">
                                    NEX<span>ORA</span>
                                </div>
                                <div className="sb-brand-sub">
                                    Student Dashboard
                                </div>
                            </div>
                            <button
                                className={`sb-item ${activePanel === "overview" ? "act" : ""}`}
                                onClick={() => setActivePanel("overview")}
                            >
                                Overview
                            </button>

                            <button
                                className={`sb-item ${activePanel === "progress" ? "act" : ""}`}
                                onClick={() => setActivePanel("progress")}
                            >
                                My Internship
                            </button>

                            <button
                                className={`sb-item ${activePanel === "apps" ? "act" : ""}`}
                                onClick={() => setActivePanel("apps")}
                            >
                                Applications
                            </button>

                            <button
                                className={`sb-item ${activePanel === "saved" ? "act" : ""}`}
                                onClick={() => setActivePanel("saved")}
                            >
                                Saved Internships
                            </button>

                            <div className="sb-sec">
                                Achievements
                            </div>

                            <button
                                className={`sb-item ${activePanel === "certificates" ? "act" : ""}`}
                                onClick={() => setActivePanel("certificates")}
                            >
                                Certificates
                            </button>

                            <button
                                className={`sb-item ${activePanel === "ai" ? "act" : ""}`}
                                onClick={() => setActivePanel("ai")}
                            >
                                AI Career Assistant
                            </button>

                        </div>
                        <button
                            className="logout-btn"
                            onClick={() => setShowLogoutModal(true)}
                        >
                            Logout
                        </button>
                    </aside>

                    <div className="dash-main">
                        {activePanel === "overview" && (
                            <>
                                <div className="dash-hdr">
                                    <div>
                                        <h2>
                                            Welcome,
                                            <span style={{ color: "#4A7C59" }}>
                                                {" "}{currentUser.fullName}
                                            </span>
                                        </h2>
                                        <p>
                                            Your internship journey starts here
                                        </p>
                                    </div>
                                    <button
                                        className="btn btn-sage btn-sm"
                                        onClick={() => navigate("/internships")}
                                    >
                                        + Find Internships
                                    </button>
                                </div>

                                {/* PROFILE CARD */}

                                <div className="prof-card">
                                    <div className="prof-av">
                                        {initials}
                                    </div>

                                    <div className="prof-info">
                                        <div className="prof-name">
                                            {currentUser.fullName}
                                        </div>
                                        <div className="prof-email">
                                            {currentUser.email}
                                        </div>
                                    </div>
                                            
                                    <button
                                        className="edit-profile-btn"
                                        onClick={() => navigate("/complete-profile")}
                                    >
                                        Edit Profile
                                    </button>
                                </div>

                                {/* METRIC CARDS */}

                                <div className="met-grid">
                                    <div className="met-c sage">
                                        <div className="met-l">
                                            Applications
                                        </div>

                                        <div className="met-v">
                                            {applications.length}
                                        </div>

                                        <div className="met-sub">
                                            {applications.length > 0
                                                ? `${applications.length} Application${applications.length > 1 ? "s" : ""}`
                                                : "No applications yet"}
                                        </div>
                                    </div>

                                    <div className="met-c terra">
                                        <div className="met-l">
                                            Active Internship
                                        </div>

                                        <div className="met-v">
                                            0
                                        </div>

                                        <div className="met-sub">
                                            Apply to get started
                                        </div>
                                    </div>

                                    <div className="met-c gold">
                                        <div className="met-l">
                                            Certificates
                                        </div>

                                        <div className="met-v">
                                            0
                                        </div>

                                        <div className="met-sub">
                                            Complete internship to earn
                                        </div>
                                    </div>

                                    <div className="met-c blue">
                                        <div className="met-l">
                                            Interviews
                                        </div>

                                        <div className="met-v">
                                            0
                                        </div>

                                        <div className="met-sub">
                                            After application review
                                        </div>
                                    </div>
                                </div>

                                <div className="ps">
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: "12px"
                                        }}
                                    >
                                        <div className="sh3">
                                            Active Internship
                                        </div>
                                    </div>

                                    <div className="icard">
                                        <div className="empty">
                                            <div className="empty-ico">
                                                📋
                                            </div>

                                            <h3>
                                                No active internship yet
                                            </h3>

                                            <p>
                                                Apply for internships and once accepted,
                                                your progress will appear here.
                                            </p>

                                            <button
                                                className="btn btn-sage btn-sm"
                                                onClick={() => navigate("/internships")}
                                            >
                                                Browse Internships →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                </>
                                )}

                                {activePanel === "progress" && (
                                    <>
                                        <div className="dash-hdr">
                                            <div>

                                                <h2>My Internship</h2>

                                                <p>
                                                    Your active internship details & progress
                                                </p>

                                            </div>
                                        </div>
                                        <div className="icard">
                                            <div className="empty">
                                                <div className="empty-ico">
                                                    🎯
                                                </div>

                                                <h3>
                                                    No active internship yet
                                                </h3>

                                                <p>
                                                    Once you apply and get accepted for an internship,
                                                    your internship details will appear here.
                                                </p>

                                                <button
                                                    className="btn btn-sage btn-sm"
                                                    onClick={() => navigate("/internships")}
                                                >
                                                    Browse & Apply Now →
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {activePanel === "saved" && (
                                    <div className="ps">
                                        <h2 className="sh3">
                                            Saved Internships
                                        </h2>
                                        {savedInternships.length === 0 ? (
                                            <div className="empty">
                                                <div className="empty-ico">❤️</div>
                                                <h3>No Saved Internships</h3>
                                                <p>
                                                    Save internships from the internship page.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="applications-list">
                                                {savedInternships.map((item) => (
                                                    <div className="application-card" key={item._id}>
                                                        <h3>{item.title}</h3>
                                                        <p><strong>Company:</strong> {item.company}</p>
                                                        <p><strong>Location:</strong> {item.location}</p>
                                                        <p><strong>Stipend:</strong> {item.stipend}</p>
                                                        <p><strong>Duration:</strong> {item.duration}</p>
                                                        <button
                                                            className="btn btn-sage"
                                                            onClick={() =>
                                                                navigate(`/internships/${item._id}`)
                                                            }
                                                        >
                                                            View Details
                                                        </button>
                                                        <button
                                                            className="btn btn-outline"
                                                            onClick={() => removeSaved(item._id)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    )}

                                {activePanel === "apps" && (
                                    <>
                                        <div className="dash-hdr">
                                            <div>
                                                <h2>My Applications</h2>
                                                <p>All your internship applications</p>
                                            </div>

                                            <button
                                                className="btn btn-sage btn-sm"
                                                onClick={() => navigate("/internships")}
                                            >
                                                + Apply New
                                            </button>

                                        </div>
                                        <div className="icard">
                                            {applications.length > 0 ? (
                                                <div className="applications-list">
                                                    {applications.map((item) => (
                                                        <div
                                                            key={item._id}
                                                            className="application-card"
                                                        >
                                                            <h3>{item.title}</h3>

                                                            <p>
                                                                <strong>Company:</strong> {item.company}
                                                            </p>

                                                            <p>
                                                                <strong>Location:</strong> {item.location}
                                                            </p>

                                                            <p>
                                                                <strong>Mode:</strong> {item.workMode}
                                                            </p>

                                                            <p>
                                                                <strong>Duration:</strong> {item.duration}
                                                            </p>

                                                            <p>
                                                                <strong>Stipend:</strong> {item.stipend}
                                                            </p>

                                                            <p>
                                                                <strong>Status:</strong> ✅ Applied
                                                            </p>

                                                            <p>
                                                                <strong>Applied On:</strong>{" "}
                                                                {new Date(item.appliedAt).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="empty">
                                                    <div className="empty-ico">
                                                        📄
                                                    </div>

                                                    <h3>No applications yet</h3>

                                                    <p>
                                                        Every internship you apply for will
                                                        be tracked here.
                                                    </p>

                                                    <button
                                                        className="btn btn-sage btn-sm"
                                                        onClick={() => navigate("/internships")}
                                                    >
                                                        Browse Internships →
                                                    </button>
                                                </div>
                                            )}
                                        </div>                                      
                                    </>
                                )}

                                {activePanel === "certificates" && (
                                    <>
                                        <div className="dash-hdr">
                                            <div>
                                                <h2>Certificates</h2>

                                                <p>Your verified achievements</p>
                                            </div>
                                        </div>

                                        <div className="icard">
                                            <div className="empty">
                                                <div className="empty-ico">
                                                    🏅
                                                </div>

                                                <h3>No certificates yet</h3>

                                                <p>
                                                    Complete an internship to earn
                                                    verified certificates.
                                                </p>

                                                <button
                                                    className="btn btn-sage btn-sm"
                                                    onClick={() => navigate("/internships")}
                                                >
                                                    Find Your First Internship →
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {activePanel === "skills" && (
                                    <>
                                        <div className="dash-hdr">
                                            <div>
                                                <h2>Skills</h2>
                                                <p>Your professional toolkit</p>
                                            </div>

                                            <button
                                                className="btn btn-sage btn-sm"
                                                onClick={() => navigate("/complete-profile")}
                                            >
                                                + Add Skill
                                            </button>
                                        </div>
                                       <div className="icard">
                                            {profile?.skills?.length > 0 ? (
                                                <div className="skills-container">
                                                    {profile.skills.map((skill, index) => (

                                                        <span
                                                            key={index}
                                                            className="skill-badge"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="empty">
                                                    <div className="empty-ico">
                                                        ⚡
                                                    </div>

                                                    <h3>No skills added yet</h3>

                                                    <p>
                                                        Add your skills to stand out to companies.
                                                    </p>

                                                    <button
                                                        className="btn btn-sage btn-sm"
                                                        onClick={() => navigate("/complete-profile")}
                                                    >
                                                        Add First Skill
                                                    </button>
                                                </div>
                                            )}
                                        </div> 
                                    </>
                                )}

                                {activePanel === "ai" && (
                                    <AIAssistant />
                                )}

                                {showLogoutModal && (
                                    <div className="logout-overlay">
                                        <div className="logout-modal">
                                            <p>Are you sure you want to logout?</p>
                                            <div className="logout-actions">
                                                <button
                                                    className="cancel-btn"
                                                    onClick={() => setShowLogoutModal(false)}
                                                >
                                                    Cancel
                                                </button>

                                                <button
                                                    className="confirm-btn"
                                                    onClick={() => {
                                                        logout();
                                                        navigate("/");
                                                    }}
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                    </div>                                    

                </div>

            </div>
        </>
    );

}

export default StudentDashboard;