import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../AIResult.css";
import API from "../api";

function AIResult() {

    const storedUser =
        JSON.parse(localStorage.getItem("user"));

    const [loading, setLoading] = useState(true);

    const [result, setResult] = useState(null);
    const [matchResult, setMatchResult] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const [coverLetter, setCoverLetter] = useState(null);
    const [interviewQuestions, setInterviewQuestions] = useState(null);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);

    const { type, internshipId } = location.state || {};

    const loadResumeAnalysis = useCallback(async () => {
        try {
            const response = await API.post("/api/ai/resume-analyzer",
                null,
                {
                    params: {
                        email: storedUser.email
                    }
                }
            );
            setResult(
                response.data.analysis
            );
        }
        catch (error) {
            setError(
                error.response?.data?.detail ||
                "Something went wrong."
            );
        }
        finally {
            setLoading(false);
        }
    }, [storedUser?.email]);

    const loadJobMatch = useCallback(async () => {
        try {
            const response = await API.post("/api/ai/job-match",
                null,
                {
                    params: {
                        email: storedUser.email,
                        internship_id: internshipId
                    }
                }
            );
            setMatchResult(response.data.analysis);
        }
        catch (error) {
            setError(
                error.response?.data?.detail ||
                "Something went wrong."
            );
        }
        finally {

            setLoading(false);
        }
    }, [storedUser?.email, internshipId]);

    const loadCoverLetter = useCallback(async () => {
        try {
            const response = await API.post("/api/ai/cover-letter",
                null,
                {
                    params: {
                        email: storedUser.email,
                        internship_id: internshipId
                    }
                }
            );
            setCoverLetter(
                response.data.cover_letter
            );
        }
        catch (error) {
            setError(
                error.response?.data?.detail ||
                "Something went wrong."
            );
        }
        finally {
            setLoading(false);
        }

    }, [storedUser?.email, internshipId]);

    const copyCoverLetter = async () => {
        try {
            await navigator.clipboard.writeText(
                coverLetter.cover_letter
            );
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 5000);   // visible for 5 seconds
        }
        catch (err) {
            console.log(err);
        }
    };

    const loadInterviewQuestions = useCallback(async () => {
        try {
            const response = await API.post("/api/ai/interview-questions",
                null,
                {
                    params: {
                        email: storedUser.email,
                        internship_id: internshipId
                    }
                }
            );
            setInterviewQuestions(
                response.data.questions
            );
        }
        catch (error) {
            setError(
                error.response?.data?.detail ||
                "Something went wrong."
            );
        }
        finally {
            setLoading(false);
        }
    }, [storedUser?.email, internshipId]);

    useEffect(() => {
        if (type === "resume") {
            loadResumeAnalysis();
        }
        else if (type === "jobmatch") {
            loadJobMatch();
        }
        else if (type === "cover") {
            loadCoverLetter();
        }
        else if (type === "interview") {
            loadInterviewQuestions();
        }
    }, [type, loadResumeAnalysis, loadJobMatch, loadCoverLetter, loadInterviewQuestions]);

    if (!type) {
        return (
            <div className="loading-page">
                <h2>
                    No AI Result Found
                </h2>
                <button
                    className="back-btn"
                    onClick={() => 
                        navigate("/student-dashboard", {
                            state: {
                                panel: "ai"
                            }
                        })
                    }
                >
                    Go Back
                </button>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="loading-page">
                <h2>
                    {error}
                </h2>
                <button
                    className="back-btn"
                    onClick={() => 
                        navigate("/student-dashboard", {
                            state: {
                                panel: "ai"
                            }
                        })
                    }
                >
                    Go Back
                </button>
           </div>
        );
    }
    
    if (loading) {
        return (
            <div className="loading-page">
                <div className="loader"></div>
                <h2>
                {
                    type === "resume"
                        ? "Analyzing Resume..."
                    : type === "jobmatch"
                        ? "Checking Job Match..."
                    : type === "cover"
                        ? "Generating Cover Letter..."
                    : "Generating Interview Questions..."
                }
                </h2>
                <p>
                    Please wait a few seconds...
                </p>
            </div>
        );
    }

    return (
        <>

            {type === "resume" && (

                <div className="analysis-container">

                    <div className="score-card">

                        <div className="score-content">

                            <div className="score-left">

                                <h3>
                                    ATS Resume Score
                                </h3>

                                <p>

                                    Your resume has been analyzed using AI and ATS standards.This score indicates 
                                    how well your resume can pass automated screening systems used by recruiters.

                                </p>

                            </div>

                            <div className="score-right">

                                <div className="score-number">

                                    {result.score}
                                    <span>/100</span>
                                
                                </div>

                                <div className="progress-bar">

                                     <div
                                        className="progress-fill"
                                        style={{ width: `${result.score}%` }}
                                    ></div>

                                </div> 

                            </div>

                        </div>

                    </div>

                    <div className="analysis-card">

                        <h3>
                            ✅ Strengths
                        </h3>

                        <ul>

                            {

                                result.strengths.map((item, index) => (

                                    <li key={index}>

                                        <strong>{index + 1}.</strong> {item}

                                    </li>

                                ))

                            }

                        </ul>

                    </div>

                    <div className="analysis-card">

                        <h3>
                            ❌ Weaknesses
                        </h3>

                        <ul>

                            {

                                result.weaknesses.map((item, index) => (

                                    <li key={index}>

                                        <strong>{index + 1}.</strong> {item}

                                    </li>

                                ))

                            }

                        </ul>

                    </div>

                    <div className="analysis-card">

                        <h3>
                            🚀 Missing Skills
                        </h3>

                        <div className="skill-tags">

                            {

                                result.missing_skills.map((skill, index) => (

                                    <div
                                        key={index}
                                        className="skill-tag"
                                    >

                                        {skill}

                                    </div>

                                ))

                            }

                        </div>

                    </div>

                    <div className="analysis-card">

                        <h3>
                            💡 Suggestions
                        </h3>

                        <ul>

                            {

                                result.suggestions.map((item, index) => (

                                    <li key={index}>

                                        <strong>{index + 1}.</strong> {item}

                                    </li>

                                ))

                            }

                        </ul>

                    </div>

                    <div className="analysis-card">

                        <h3>
                            🎯 Career Recommendation
                        </h3>

                        <p>

                            {result.career_recommendation}

                        </p>

                    </div>

                    <div className="bottom-back">

                        <button
                            className="back-btn"
                            onClick={() =>
                                navigate("/student-dashboard", {
                                    state: {
                                        panel: "ai"
                                    }
                                })
                            }
                        >
                            ← Back
                        </button>

                    </div>

                </div>

            )}

            {type === "jobmatch" && (

                <div className="analysis-container">

                    <div className="score-card">

                        <div className="score-content">

                            <div className="score-left">

                                <h3>
                                    Job Match Score
                                </h3>

                                <p>

                                    Your resume has been compared with the selected internship. The score shows 
                                    how closely your profile matches the required skills and qualifications.
                                </p>

                            </div>

                            <div className="score-right">

                                <div className="score-number">

                                    {matchResult.match_score}

                                    <span>%</span>

                                </div>

                                <div className="progress-bar">

                                    <div
                                        className="progress-fill"
                                        style={{
                                            width: `${matchResult.match_score}%`
                                        }}
                                    ></div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="analysis-card">

                        <h3>✅ Skills You Already Have</h3>

                        <ul>

                            {matchResult.strengths.map((item, index) => (

                                <li key={index}>

                                    <strong>{index + 1}.</strong>

                                    {item}

                                </li>
                            ))}

                        </ul>

                    </div>

                    <div className="analysis-card">

                        <h3>🚀 Skills You Should Learn</h3>

                        <div className="skill-tags">

                            {matchResult.missing_skills.map((item, index) => (

                                <div
                                    key={index}
                                    className="skill-tag"
                                >
                                    {item}
                                </div>

                            ))}

                        </div>

                    </div>

                    <div className="analysis-card">

                        <h3>💡AI Recommendation</h3>

                        <p>

                            {matchResult.recommendation}

                        </p>

                    </div>

                    <div className="bottom-back">

                        <button
                            className="back-btn"
                            onClick={() =>
                                navigate("/student-dashboard", {
                                    state: {
                                        panel: "ai"
                                    }
                                })
                            }
                        >
                            ← Back 
                        </button>

                    </div>

                </div>


            )}

            {type === "cover" && (

            <div className="analysis-container">

                <div className="analysis-card">

                    <h3>
                        ✉️ AI Generated Cover Letter
                    </h3>

                    <p className="section-description">

                        A personalized cover letter generated based on your resume and the selected internship.

                    </p>

                    <div className="cover-content">

                        {
                            coverLetter.cover_letter
                                .split("\n")
                                .map((line, index) => (

                                    <p key={index}>

                                        {line}

                                    </p>

                                ))
                        }

                    </div>

                    <button
                        className="copy-btn"
                        onClick={copyCoverLetter}
                    
                    >
                        📋 Copy Cover Letter

                    </button>
                    {showToast && (
                        <div className="copy-toast">
                            ✔ Cover Letter Copied
                        </div>
                    )}

                    <div className="bottom-back">
                        <button
                            className="back-btn"
                            onClick={() =>
                                navigate("/student-dashboard", {
                                    state: {
                                        panel: "ai"
                                    }
                                })
                            }
                        >
                            ← Back
                        </button>
                    </div>

                </div>

            </div>

            )}

            {type === "interview" && (

            <div className="analysis-container">

                <div className="analysis-card">

                    <h3>
                        🎤 AI Interview Questions
                    </h3>

                    <p className="section-description">

                        Practice these AI-generated interview questions based on your resume and the selected internship.

                    </p>

                </div>

                {/* Technical */}

                <div className="analysis-card">

                    <h3>
                        💻 Technical Questions
                    </h3>

                    <div className="question-section">

                        {interviewQuestions.technical.map((item, index) => (

                            <div key={index} className="question-card">

                                <h4>
                                    Question {index + 1}
                                </h4>

                                <p className="question-text">
                                    {item.question}
                                </p>

                                <h4>
                                    Answer = 
                                </h4>

                                <p className="answer-text">
                                    {item.answer}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

                {/* HR */}

                <div className="analysis-card">

                    <h3>
                        👤 HR Questions
                    </h3>

                    <div className="question-section">

                        {interviewQuestions.hr.map((item, index) => (

                            <div key={index} className="question-card">

                                <h4>
                                    Question {index + 1}
                                </h4>

                                <p className="question-text">
                                    {item.question}
                                </p>

                                <h4>
                                    Answer =
                                </h4>

                                <p className="answer-text">
                                    {item.answer}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

                {/* Project */}

                <div className="analysis-card">

                    <h3>
                        🚀 Project Questions
                    </h3>

                    <div className="question-section">

                        {interviewQuestions.project.map((item, index) => (

                            <div key={index} className="question-card">

                                <h4>
                                    Question {index + 1}
                                </h4>

                                <p className="question-text">
                                    {item.question}
                                </p>

                                <h4>
                                    Answer =
                                </h4>

                                <p className="answer-text">
                                    {item.answer}
                                </p>

                            </div>

                        ))}

                    </div>
                    
                    <div className="bottom-back">

                        <button
                            className="back-btn"
                            onClick={() =>
                                navigate("/student-dashboard", {
                                    state: {
                                        panel: "ai"
                                    }
                                })
                            }
                        >
                            ← Back
                        </button>

                    </div>

                </div>

            </div>

            )}
            

        </>

    );

}

export default AIResult;