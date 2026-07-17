import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Signup.css";
import API from "../api";

function Signup() {

    const [role, setRole] = useState("student");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        startupName: "",
        companyName: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleBlur = (e) => {
        setTouched({
            ...touched,
            [e.target.name]: true
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let newErrors = {};

        // Student Validation

        if(role === "student"){

            if(!formData.fullName.trim()){
                newErrors.fullName = "Full Name is required";
            }

            if(!formData.mobile.trim()){
                newErrors.mobile = "Mobile Number is required";
            }
            else if(!/^[0-9]{10}$/.test(formData.mobile)){
                newErrors.mobile = "Mobile Number must contain exactly 10 digits";
            }

        }

        // Startup Validation

        if(role === "startup"){
            if(!formData.startupName.trim()){
                newErrors.startupName = "Startup Name is required";
            }
        }

        // Company Validation

        if(role === "company"){
            if(!formData.companyName.trim()){
                newErrors.companyName = "Company Name is required";
            }
        }

        // Common Email

        if(!formData.email.trim()){
            newErrors.email = "Email is required";
        }
        else if(
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
        ){
            newErrors.email = "Enter a valid email address";
        }

        // Password

        if(!formData.password){
            newErrors.password = "Password is required";
        }
        if(formData.password !== formData.confirmPassword){
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                 const response = await API.post(
                    
                    "/api/auth/signup",
                    {
                        fullName: formData.fullName,
                        email: formData.email,
                        password: formData.password,
                        mobile: formData.mobile,
                        role:
                            role.charAt(0).toUpperCase() +
                            role.slice(1)
                    }
                );

                localStorage.setItem(
                    "token",
                    response.data.access_token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                setSuccessMessage("Account created successfully!");
                setTimeout(() => {
                    navigate("/complete-profile");
                }, 1500);

            } catch (error) {
                if (error.response) {
                    setErrors({
                        server: error.response.data.detail
                    });
                }
                else {
                    setErrors({
                        server: "Server Error"
                    });
                }
            }
        }
    };

    return (
        <>
            {/* <Navbar /> */}

            <section className="signup-page">

                {/* LEFT */}

                <div className="signup-left">

                    <div className="left-content">

                        <p className="welcome-tag">
                            JOIN NEXORA
                        </p>

                        <h1>

                            {role === "student" && (
                                <>
                                    Start your <br />
                                    career <br />
                                    <span>with us.</span>
                                </>
                            )}

                            {role === "startup" && (
                                <>
                                    Grow your <br />
                                    startup <br />
                                    <span>with NEXORA.</span>
                                </>
                            )}

                            {role === "company" && (
                                <>
                                    Hire the <br />
                                    best talent <br />
                                    <span>faster.</span>
                                </>
                            )}

                        </h1>

                        <p className="left-description">

                            {role === "student" &&
                                "Build your profile, discover internships, and kickstart your career with AI-powered guidance."}

                            {role === "startup" &&
                                "Connect with talented students, post internships, and build your dream team."}

                            {role === "company" &&
                                "Recruit skilled students, streamline hiring, and discover future talent effortlessly."}

                        </p>

                        <div className="feature-list">

                        {role === "student" && (
                        <>
                            <div className="feature-card">
                                <span>🎯</span>
                                <p>AI Internship Matching</p>
                            </div>

                            <div className="feature-card">
                                <span>📄</span>
                                <p>Resume Analysis</p>
                            </div>

                            <div className="feature-card">
                                <span>🧠</span>
                                <p>Career Mentor</p>
                            </div>

                            <div className="feature-card">
                                <span>📈</span>
                                <p>Track Applications</p>
                            </div>
                        </>
                        )}

                        {role === "startup" && (
                        <>
                            <div className="feature-card">
                                <span>📢</span>
                                <p>Post Internships</p>
                            </div>

                            <div className="feature-card">
                                <span>🤖</span>
                                <p>AI Candidate Ranking</p>
                            </div>

                            <div className="feature-card">
                                <span>📂</span>
                                <p>Manage Applications</p>
                            </div>

                            <div className="feature-card">
                                <span>🚀</span>
                                <p>Build Your Startup Team</p>
                            </div>
                        </>
                        )}

                        {role === "company" && (
                        <>
                            <div className="feature-card">
                                <span>🏢</span>
                                <p>Hire Top Talent</p>
                            </div>

                            <div className="feature-card">
                                <span>📊</span>
                                <p>Recruitment Dashboard</p>
                            </div>

                            <div className="feature-card">
                                <span>🤖</span>
                                <p>AI Resume Screening</p>
                            </div>

                            <div className="feature-card">
                                <span>⭐</span>
                                <p>Employer Branding</p>
                            </div>

                            <p className="trust-text">
                                Trusted by 15,000+ students across India.
                            </p>
                        </>
                        )}

                        </div>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="signup-right">

                    <div className="signup-card">

                        <h2>

                            {role === "student" && "Student Registration"}

                            {role === "startup" && "Startup Registration"}

                            {role === "company" && "Company Registration"}

                        </h2>

                        <p className="signup-subtitle">

                            {role === "student" &&
                                "Create your student account to start applying."}

                            {role === "startup" &&
                                "Register your startup and post internships."}

                            {role === "company" &&
                                "Create your company account to hire talent."}

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

                        {successMessage && (
                            <div className="success-message">
                                {successMessage}
                            </div>
                        )}

                        {errors.server && (
                            <div className="error-message">
                                {errors.server}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            {role === "student" && (
                                <>

                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Full Name"
                                />

                                {touched.fullName && errors.fullName && (
                                    <p className="error-text">
                                        {errors.fullName}
                                    </p>
                                )}

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Email Address"
                                />

                                {touched.email && errors.email && (
                                    <p className="error-text">
                                        {errors.email}
                                    </p>
                                )}

                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "");
                                        if(value.length <= 10){
                                            setFormData({
                                                ...formData,
                                                mobile:value
                                            });
                                        }
                                    }}
                                    onBlur={handleBlur}
                                    placeholder="Mobile Number"
                                />

                                {touched.mobile && errors.mobile && (
                                    <p className="error-text">
                                        {errors.mobile}
                                    </p>
                                )}
                                <div className="password-field">

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Password"
                                    />

                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                    
                                </div>

                                {touched.password && errors.password && (
                                    <p className="error-text">
                                        {errors.password}
                                    </p>
                                )}

                                <div className="password-field">

                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Confirm Password"
                                    />

                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                    >
                                        {showConfirmPassword ? "Hide" : "Show"}
                                    </button>

                                </div>

                                {touched.confirmPassword && errors.confirmPassword && (
                                    <p className="error-text">
                                        {errors.confirmPassword}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className="signup-btn"
                                >                                    
                                Create Student Account
                                </button>

                                </>
                            )}

                            {role === "startup" && (
                                <>

                                <input
                                    type="text"
                                    name="startupName"
                                    value={formData.startupName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Startup Name"
                                />

                                {touched.startupName && errors.startupName && (
                                    <p className="error-text">
                                        {errors.startupName}
                                    </p>
                                )}

                                <input
                                    type="email"
                                    name="companyEmail"
                                    value={formData.companyEmail}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Company Email"
                                />

                                {touched.companyEmail && errors.companyEmail && (
                                    <p className="error-text">
                                        {errors.companyEmail}
                                    </p>
                                )}

                                <div className="password-field">

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Password"
                                    />

                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>

                                </div>

                                {touched.password && errors.password && (
                                    <p className="error-text">
                                        {errors.password}
                                    </p>
                                )}

                                <div className="password-field">

                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Confirm Password"
                                    />

                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                    >
                                        {showConfirmPassword ? "Hide" : "Show"}
                                    </button>

                                </div>

                                {touched.confirmPassword && errors.confirmPassword && (
                                    <p className="error-text">
                                        {errors.confirmPassword}
                                    </p>
                                )}                   

                                <button
                                    type="submit"
                                    className="signup-btn"
                                >
                                    Register Startup
                                </button>

                                </>
                            )}

                            {role === "company" && (
                                <>

                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Company Name"
                                />
                                {touched.companyName && errors.companyName && (
                                    <p className="error-text">
                                        {errors.companyName}
                                    </p>
                                )}
                                
                                <input
                                    type="email"
                                    name="companyEmail"
                                    value={formData.companyEmail}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Company Email"
                                />
                                {touched.companyEmail && errors.companyEmail && (
                                    <p className="error-text">
                                        {errors.companyEmail}
                                    </p>
                                )}

                                <div className="password-field">

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Password"
                                    />

                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>

                                </div>

                                {touched.password && errors.password && (
                                    <p className="error-text">
                                        {errors.password}
                                    </p>
                                )}

                                <div className="password-field">

                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Confirm Password"
                                    />

                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                    >
                                        {showConfirmPassword ? "Hide" : "Show"}
                                    </button>

                                </div>

                                {touched.confirmPassword && errors.confirmPassword && (
                                    <p className="error-text">
                                        {errors.confirmPassword}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className="signup-btn"
                                >
                                    Register Company
                                </button>

                                </>
                            )}

                            </form>

                            <p className="login-link">
                                Already have an account?
                                <Link to="/login" className="login-route">
                                    Log In
                                </Link>
                            </p>

                    </div>

                </div>

            </section>

        </>
    );
}

export default Signup;