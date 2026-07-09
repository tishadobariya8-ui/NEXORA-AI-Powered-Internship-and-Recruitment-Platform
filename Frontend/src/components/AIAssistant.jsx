import { useEffect, useState } from "react";
import axios from "axios";
import "./AIAssistant.css";
import { useNavigate } from "react-router-dom";

function AIAssistant() {

    const API_URL = "http://127.0.0.1:8000";
    const [internships, setInternships] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedInternship, setSelectedInternship] = useState(
        localStorage.getItem("selectedInternship") || ""
    );
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/api/internships`
                );
                setInternships(response.data);
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchInternships();
    }, []);

    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => {
            setMessage("");
        }, 3000);
        return () => clearTimeout(timer);
    }, [message]);

    const analyzeResume = () => {
        navigate("/ai-result", {
            state: {
                type: "resume"
            }
        });
    };

    // Job Match

    const checkJobMatch = () => {

        if (!selectedInternship) {
            setMessage("Please select an internship first.");
            return;
        }

        navigate("/ai-result", {
            state: {
                type: "jobmatch",
                internshipId: selectedInternship
            }
        });

    };

    const generateCoverLetter = () => {

        if (!selectedInternship) {
            setMessage("Please select an internship first.");
            return;
        }

        navigate("/ai-result", {
            state: {
                type: "cover",
                internshipId: selectedInternship
            }
        });

    };

    const generateInterviewQuestions = () => {

        if (!selectedInternship) {
            setMessage("Please select an internship first.");
            return;
        }

        navigate("/ai-result", {
            state: {
                type: "interview",
                internshipId: selectedInternship
            }
        });

    };

    return (

        <div className="ai-page">
            {message && (
                <div className="page-message">
                    {message}
                </div>
            )}
            <div className="ai-header">
                <h2>
                    AI Career Assistant
                </h2>
                <p>
                    Analyze your resume, compare it with internships and improve your chances.
                </p>
            </div>

            {/* Resume Analyzer */}

            <div className="ai-card">

                <h3>
                    Resume Analyzer
                </h3>

                <p>

                    Analyze your uploaded resume using AI.

                </p>

                <button
                    className="analyze-btn"
                    onClick={analyzeResume}
                >
                    Analyze Resume
                </button>
            </div>

            {/* Job Match */}

            <div className="ai-card">

                <h3>

                    Job Match Score

                </h3>

                <p>

                    Compare your resume with any internship.

                </p>

                <select

                    value={selectedInternship}

                    onChange={(e)=>{

                        setSelectedInternship(e.target.value);

                        localStorage.setItem(
                            "selectedInternship",
                            e.target.value
                        );

                    }}

                >

                    <option value="">

                        Select Internship

                    </option>

                    {

                        internships.map(

                            (internship) => (

                                <option

                                    key={internship._id}

                                    value={internship._id}

                                >

                                    {internship.title}
                                    {" - "}
                                    {internship.company}

                                </option>

                            )

                        )

                    }

                </select>

                <button
                    className="analyze-btn"
                    onClick={checkJobMatch}
                >
                    Check Match
                </button>

            </div>

            {/* Cover Letter */}

            <div className="ai-card">

                <h3>
                    AI Cover Letter
                </h3>

                <p>
                    Generate a professional cover letter for the selected internship.
                </p>

                <button
                    className="analyze-btn"
                    onClick={generateCoverLetter}
                >
                    Generate Cover Letter
                </button>

            </div>

            {/* AI Interview Questions */}

            <div className="ai-card">

                <h3>
                    AI Interview Questions
                </h3>

                <p>
                    Generate interview questions based on your resume and the selected internship.
                </p>

                <button
                    className="analyze-btn"
                    onClick={generateInterviewQuestions}
                >
                    Generate Questions
                </button>

            </div>

        </div>

    );

}

export default AIAssistant;
