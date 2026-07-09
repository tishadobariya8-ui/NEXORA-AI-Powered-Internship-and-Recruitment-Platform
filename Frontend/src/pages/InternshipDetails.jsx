import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../InternshipDetails.css";
import API from "../api";
import { useAuth } from "../context/useAuth";

function InternshipDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applied, setApplied] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  
  useEffect(() => {
      const fetchInternship = async () => {
          try {
              const response = await API.get(`/api/internships/${id}`);
              setInternship(response.data);
          }
          catch (err) {
            console.error(err);
            setError("Unable to load internship.");
          }
          finally {
              setLoading(false);
          }
      };
      fetchInternship();
  }, [id]);

  useEffect(() => {

      if (!user || !internship) return;

      const checkApplied = async () => {

          try {

              const response = await API.get(
                  "/api/applications/check",
                  {
                      params: {
                          email: user.email,
                          internshipId: internship._id
                      }
                  }
              );

              if (response.data.applied) {

                  setApplied(true);
              }
          }
          catch (error) {
            console.error(error);
          }
        };
        checkApplied();
      
  }, [user, internship]);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [message]);

  const handleApply = async () => {
      try {
          const response = await API.post(
              "/api/applications/apply",
              {
                email: user.email,
                internshipId: internship._id
              }
          );
          setMessage(response.data.message);
          setMessageType("success");
          setApplied(true);
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
  
  if (loading) {
      return <h2>Loading...</h2>;
  }

  if (error) {
      return <h2>{error}</h2>;
  }

  if (!internship) {
      return <h2>Internship not found.</h2>;
  }

  return (
    <>
      {message && (
        <div className={`internship-message ${messageType}`}>
          {message}
        </div>
      )}
      <Navbar />

      <section className="details-hero">

        <div className="page-container">

          <div className="company-badge">
            <span>🏢</span> {internship.company}
          </div>

          <h1 className="details-title">
            {internship.title}
          </h1>

          <p className="details-company">
            {internship.company} • {internship.location} • {internship.workMode}
          </p>

          <div className="details-info">

            <div className="info-card">
              <h4>Stipend</h4>
              <p>{internship.stipend}</p>
            </div>

            <div className="info-card">
              <h4>Duration</h4>
              <p>{internship.duration}</p>
            </div>

            <div className="info-card">
              <h4>Start Date</h4>
              <p>As Soon As Possible</p>
            </div>

            <div className="info-card">
              <h4>Mode</h4>
              <p>{internship.workMode}</p>
            </div>

          </div>

        </div>

      </section>

      {/* ABOUT INTERNSHIP */}

      <section className="details-section">

        <div className="page-container">

          <div className="details-card">

            <h2>About this Internship</h2>

            <p>
              {internship.description}
              This internship provides hands-on experience with real-world projects,
              mentorship from experienced professionals, and an opportunity to enhance
              your technical and problem-solving skills.
            </p>

          </div>

          <div className="details-card">

            <h2>Responsibilities</h2>

            <ul>

              <li>✔ Develop responsive React components.</li>

              <li>✔ Integrate REST APIs with frontend.</li>

              <li>✔ Fix bugs and improve performance.</li>

              <li>✔ Collaborate with designers and backend developers.</li>

              <li>✔ Write clean and reusable code.</li>

            </ul>

          </div>

        </div>

      </section>

      {/* REQUIREMENTS */}

      <section className="details-section">

        <div className="page-container">

          <div className="details-grid">

            {/* LEFT */}

            <div className="details-card">

              <h2>Requirements</h2>

              <ul>

                <li>✔ Strong knowledge of HTML, CSS and JavaScript</li>

                <li>✔ Basic understanding of React.js</li>

                <li>✔ Familiarity with Git & GitHub</li>

                <li>✔ Good problem-solving skills</li>

                <li>✔ Excellent communication</li>

              </ul>

            </div>


            {/* RIGHT */}

            <div className="details-card">

              <h2>Benefits</h2>

              <ul>

                <li>Internship Certificate</li>

                <li>PPO Opportunity</li>

                <li>Letter of Recommendation</li>

                <li>Flexible Remote Work</li>

                <li>Mentorship from Senior Developers</li>

              </ul>

            </div>

          </div>

          <div className="details-card skills-card">

            <h2>Skills You'll Learn</h2>

            <div className="skills-list">

              {internship.skills?.map((skill, index) => (

                  <span key={index}>
                      {skill}
                  </span>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* ACTION BUTTONS */}

      <section className="details-actions">

        <div className="page-container">

          <div className="action-buttons">

            <button
                className="apply-now-btn"
                onClick={handleApply}
                disabled={applied}
            >

                {applied ? "Applied ✓" : "Apply Now"}

            </button>

            <button
              className="back-btn"
              onClick={() => window.history.back()}
            >
              ← Back to Internships
            </button>

          </div>

        </div>

      </section>

    </>
  );
}

export default InternshipDetails;