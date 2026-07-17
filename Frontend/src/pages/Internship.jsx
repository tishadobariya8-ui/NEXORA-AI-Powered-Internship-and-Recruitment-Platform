import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../Internship.css";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/useAuth";

function Internships() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [visible, setVisible] = useState(6);
  const [saved, setSaved] = useState([]);
  
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const navigate = useNavigate();
    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const response = await API.get("/api/internships/");
                setInternships(response.data);
            }
            catch (err) {
                console.error("Error:", err);
                setError("Failed to load internships.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchInternships();
    }, []);

    useEffect(() => {
        if (!user || internships.length === 0) return;
        const fetchSaved = async () => {
            try {
                const response = await API.get(`/api/save/${user.email}`);
                const savedIds = response.data.map(item => item._id);
                setSaved(savedIds);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSaved();
    }, [user, internships]);

  const filteredInternships = internships.filter((item) => {
    const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.company.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
        category === "All" || item.title.includes(category);

    const matchLocation =
        location === "All" || item.location === location;

    return matchSearch && matchCategory && matchLocation;
    });

    const toggleSave = async (id) => {
        if (!user) {
            alert("Please login first.");
            return;
        }
        try {
            if (saved.includes(id)) {
                await API.delete("/api/save", {
                    data: {
                        user_email: user.email,
                        internship_id: id
                    }
                });
                setSaved(saved.filter(item => item !== id));
            } else {
                await API.post("/api/save", {
                    user_email: user.email,
                    internship_id: id
                });
                setSaved([...saved, id]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // if (loading) {
    //     return (
    //         <>
    //             <Navbar />
    //             <h2 style={{ textAlign: "center", marginTop: "50px" }}>
    //                 Loading internships...
    //             </h2>
    //         </>
    //     );
    // }

    // if (error) {
    //     return (
    //         <>
    //             <Navbar />
    //             <h2 style={{ textAlign: "center", marginTop: "50px" }}>
    //                 {error}
    //             </h2>
    //         </>
    //     );
    // }

    return (

    <>
      <Navbar />

    {/* INTERNSHIP SEARCH */}

      <div className="internship-page">

        <section className="browse-section">

            <div className="page-container">

                <span className="section-tag">
                    OPPORTUNITIES
                </span>

                <h1 className="browse-title">
                    Browse Internships
                </h1>

                <p className="browse-subtitle">
                    {filteredInternships.length} Explore the latest internship opportunities.
                </p>
            
                <div className="browse-filters">

                    <input
                        type="text"
                        placeholder="🔍 Search role, company, skill..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Full Stack">Full Stack</option>
                        <option value="AI / ML">AI / ML</option>
                        <option value="Data Science">Data Science</option>
                        <option value="UI / UX">UI / UX</option>
                        <option value="Cyber Security">Cyber Security</option>
                    </select>

                    <select>
                        <option>All Modes</option>
                        <option>Remote</option>
                        <option>Hybrid</option>
                        <option>On-site</option>
                    </select>

                    <select>
                        <option>Any Duration</option>
                        <option>1 Month</option>
                        <option>2 Months</option>
                        <option>3 Months</option>
                        <option>6 Months</option>
                    </select>

                    <button 
                    className="clear-btn"
                    onClick={() => {
                        setSearch("");
                        setCategory("All");
                        setLocation("All");
                    }}
                    >
                        Clear
                    </button>

                </div>

            </div>

        </section>

        {/* FEATURED INTERNSHIPS */}

        <section className="featured-section">

            <div className="page-container">

            <div className="internship-grid">

                    {loading ? (

                        <div className="loading">
                            <h2>Loading internships...</h2>
                        </div>

                    ) : error ? (

                        <div className="loading">
                            <h2>{error}</h2>
                        </div>

                    ) : filteredInternships.length > 0 ? (

                    filteredInternships.slice(0, visible).map((item) => (

                        <div className="intern-card" key={item._id}>

                        <div className="intern-top">

                            <div className="company-logo">
                                🏢      
                            </div>

                            <button 
                                className="save-btn" 
                                onClick={() => toggleSave(item._id)}
                                >
                                {saved.includes(item._id) ?  "❤️" : "🤍"}
                            </button>

                        </div>

                        <span className="intern-category">
                            {item.workMode}
                        </span>

                        <h3>
                            {item.title}
                        </h3>

                        <p className="company-name">
                            {item.company}
                        </p>

                        <div className="intern-info">

                            <span>📍 {item.location}</span>

                            <span>💰 {item.stipend}</span>

                            <span>🕒 {item.duration}</span>

                        </div>

                        <div className="intern-tags">

                            {item.skills?.map((skill, index) => (
                                <span key={index}>
                                    {skill}
                                </span>
                            ))}

                        </div>

                        <div className="card-buttons">

                            <button
                                className="apply-btn"
                                onClick={() => navigate(`/internships/${item._id}`)}
                            >
                                Apply Now
                            </button>

                            <button 
                                className="details-btn" 
                                onClick={() => navigate(`/internships/${item._id}`)}
                            >
                                View Details
                            </button>

                        </div>

                        </div>

                    ))
                ) : (
                    <div className="no-results">
                        <h2>No internships found</h2>
                        <p>
                        Try another keyword or change your filters.
                        </p>
                    </div>
                )}

                </div>

                <div className="load-more">

                <button
                    onClick={() => setVisible((prev) => prev + 6)}
                    disabled={visible >= filteredInternships.length}
                >
                    Load More Internships
                </button>

                </div>

            </div>

        </section>
      </div>
    </>
  );
}
export default Internships;