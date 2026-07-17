import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../CompleteProfile.css";
import API from "../api";

function CompleteProfile() {
    const navigate = useNavigate();
    const storedUser = JSON.parse(
        localStorage.getItem("user")) || {};

    // STATES

    const [activeSection, setActiveSection] = useState("basic");
    const [profileImage, setProfileImage] = useState(null);

    // Basic Information
    const [basicInfo, setBasicInfo] = useState({
        profilePhoto: null,
        fullName: storedUser?.fullName || "",
        email: storedUser?.email || "",
        mobile: storedUser?.mobile || ""
    });

    const [basicErrors, setBasicErrors] = useState({});
    const [basicCompleted, setBasicCompleted] = useState(false);

    // Education
    const [education, setEducation] = useState({
        college: "",
        degree: "",
        branch: "",
        currentYear: "",
        graduationYear: "",
        cgpa: ""
    });

    const [educationErrors, setEducationErrors] = useState({});
    const [educationCompleted, setEducationCompleted] = useState(false);

    // Career
    const [career, setCareer] = useState({
        preferredRole: "",
        preferredLocation: "",
        workMode: "",
        expectedStipend: "",
        availableFrom: ""
    });

    const [careerErrors, setCareerErrors] = useState({});
    const [careerCompleted, setCareerCompleted] = useState(false);
    const [resume, setResume] = useState(null);
    const [uploadedResume, setUploadedResume] = useState("");
    const [resumeError, setResumeError] = useState("");
    const [resumeCompleted, setResumeCompleted] = useState(false);
    // Skills
    const [skillInput, setSkillInput] = useState("");
    const [skillError,setSkillError]=useState("");
    const [skills, setSkills] = useState([]);
    const [skillsCompleted, setSkillsCompleted] = useState(false);
    
    // SOCIAL LINKS

    const [socialLinks, setSocialLinks] = useState({
        linkedin: "",
        github: "",
        portfolio: "",
        leetcode: "",
        hackerrank: ""
    });
    const [socialErrors, setSocialErrors] = useState({});
    const [socialCompleted, setSocialCompleted] = useState(false);

    // About Yourself
    const [about, setAbout] = useState("");
    const [aboutError, setAboutError] = useState("");
    const [aboutCompleted, setAboutCompleted] = useState(false);

    const loadProfile = useCallback(async () => {
        if (!storedUser?.email) {
            navigate("/login");
            return;
        }

        try{

            const response = await API.get(
                "/api/profile/me",
                {
                    params:{
                        email: storedUser.email
                    }
                }
            );

            const data = response.data;

            // Basic

            setBasicInfo({
                profilePhoto:null,
                fullName:data.fullName || "",
                email:data.email || "",
                mobile:data.mobile || ""
            });

            // Education

            setEducation({
                college:data.college || "",
                degree:data.degree || "",
                branch:data.branch || "",
                currentYear:data.currentYear || "",
                graduationYear:data.graduationYear || "",
                cgpa:data.cgpa || ""
            });

            // Career

            setCareer({
                preferredRole:data.preferredRole || "",
                preferredLocation:data.preferredLocation || "",
                workMode:data.workMode || "",
                expectedStipend:data.expectedStipend || "",
                availableFrom:data.availableFrom || ""
            });

            // Skills

            setSkills(data.skills || []);

            // About

            setAbout(data.about || "");

            // Social

            setSocialLinks({
                linkedin:data.linkedin || "",
                github:data.github || "",
                portfolio:data.portfolio || "",
                leetcode:data.leetcode || "",
                hackerrank:data.hackerrank || ""
            });

            setUploadedResume(data.resume || "");

            setBasicCompleted(!!(
                data.fullName &&
                data.email &&
                data.mobile
            ));

            setEducationCompleted(!!(
                data.college &&
                data.degree &&
                data.branch &&
                data.currentYear &&
                data.graduationYear &&
                data.cgpa
            ));

            setCareerCompleted(!!(
                data.preferredRole &&
                data.preferredLocation &&
                data.workMode &&
                data.expectedStipend &&
                data.availableFrom
            ));

            setResumeCompleted(!!data.resume);

            setSkillsCompleted(
                (data.skills || []).length > 0
            );

            setSocialCompleted(!!(
                data.linkedin &&
                data.github
            ));

            setAboutCompleted(
                !!(data.about && data.about.trim())
            );

            // Decide which section should open first

            if (!(data.fullName && data.email && data.mobile)) {

                setActiveSection("basic");

            }

            else if (!(

                data.college &&
                data.degree &&
                data.branch &&
                data.currentYear &&
                data.graduationYear &&
                data.cgpa

            )) {

                setActiveSection("education");

            }

            else if (!(

                data.preferredRole &&
                data.preferredLocation &&
                data.workMode &&
                data.expectedStipend &&
                data.availableFrom

            )) {

                setActiveSection("career");

            }

            else if (!data.resume) {

                setActiveSection("resume");

            }

            else if (!(data.skills && data.skills.length > 0)) {

                setActiveSection("skills");

            }

            else if (!(data.linkedin && data.github)) {

                setActiveSection("social");

            }

            else if (!(data.about && data.about.trim())) {

                setActiveSection("about");

            }

            else {

                setActiveSection("/student-dashboard");

            }

        }

        catch(error){

            console.log(error);

        }

    }, [storedUser?.email, navigate]);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    const profileProgress = Math.round(
        (
            [
                basicCompleted,
                educationCompleted,
                careerCompleted,
                resumeCompleted,
                skillsCompleted,
                socialCompleted,
                aboutCompleted
            ].filter(Boolean).length / 7
        ) * 100
    );
 
    // INPUT HANDLERS
    const handleBasicChange = ({ target: { name, value } }) => {
        setBasicInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEducationChange = ({ target: { name, value } }) => {
        setEducation(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCareerChange = ({ target: { name, value } }) => {
        setCareer(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // SOCIAL LINKS
    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setSocialLinks(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAboutChange = (e) => {
        const value = e.target.value;
        if (value.length <= 500) {
            setAbout(value);
        }

    };

    // PROFILE IMAGE
    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setProfileImage(URL.createObjectURL(file));
    };

    // SAVE BASIC INFORMATION

    const saveBasicInformation = async () => {

        let errors = {};

        if (!basicInfo.fullName.trim()) {
            errors.fullName = "Full Name is required";
        }

        if (!basicInfo.email.trim()) {
            errors.email = "Email is required";
        }
        else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(basicInfo.email)
        ) {
            errors.email = "Enter a valid email";
        }

        if (!/^[0-9]{10}$/.test(basicInfo.mobile)) {
            errors.mobile = "Mobile number must contain exactly 10 digits";
        }

        setBasicErrors(errors);

        if (Object.keys(errors).length === 0) {

            try {

                await API.put(
                    "/api/profile/basic",
                    {
                        fullName: basicInfo.fullName,
                        email: basicInfo.email,
                        mobile: basicInfo.mobile
                    }
                );

                const user = JSON.parse(localStorage.getItem("user"));

                user.fullName = basicInfo.fullName;
                user.mobile = basicInfo.mobile;
                user.profileCompleted = true;

                localStorage.setItem(
                    "user",
                    JSON.stringify(user)
                );

                setBasicCompleted(true);
                setActiveSection("education");

            }
            catch (error) {
                console.error("API Error:", error);
                console.error(error.response?.data);
            }
        }
    };

    // SAVE EDUCATION

    const saveEducation = async () => {

        let errors = {};

        if (!education.college.trim()) {
            errors.college = "College Name is required";
        }

        if (!education.degree) {
            errors.degree = "Please select your degree";
        }

        if (!education.branch.trim()) {
            errors.branch = "Branch is required";
        }

        if (!education.currentYear) {
            errors.currentYear = "Please select your current year";
        }

        if (!education.graduationYear) {
            errors.graduationYear = "Graduation year is required";
        }

        if (!education.cgpa) {
            errors.cgpa = "CGPA is required";
        }
        else if (
            Number(education.cgpa) < 0 ||
            Number(education.cgpa) > 10
        ) {
            errors.cgpa = "CGPA must be between 0 and 10";
        }

        setEducationErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                await API.put(
                    "/api/profile/education",
                    {
                        email: basicInfo.email,
                        college: education.college,
                        degree: education.degree,
                        branch: education.branch,
                        currentYear: education.currentYear,
                        graduationYear: education.graduationYear,
                        cgpa: education.cgpa
                    }
                );
                setEducationCompleted(true);
                setActiveSection("career");
            }

            catch(error){
            console.error("API Error:", error);
            console.error(error.response?.data);    
            }
        }

    };

    // SAVE CAREER

    const saveCareer = async () => {

        let errors = {};

        if (!career.preferredRole) {
            errors.preferredRole = "Please select your preferred role";
        }

        if (!career.preferredLocation.trim()) {
            errors.preferredLocation = "Preferred location is required";
        }

        if (!career.workMode) {
            errors.workMode = "Please choose work mode";
        }

        if (!career.expectedStipend) {
            errors.expectedStipend = "Expected stipend is required";
        }

        if (!career.availableFrom) {
            errors.availableFrom = "Please select availability";
        }

        setCareerErrors(errors);

        if (Object.keys(errors).length === 0) {

            try {

                await API.put(
                    "/api/profile/career",
                    {
                        email: basicInfo.email,

                        preferredRole: career.preferredRole,
                        preferredLocation: career.preferredLocation,
                        workMode: career.workMode,
                        expectedStipend: career.expectedStipend,
                        availableFrom: career.availableFrom
                    }
                );
                setCareerCompleted(true);
                setActiveSection("resume");
            }
            catch (error) {
                console.error("API Error:", error);
                console.error(error.response?.data);
                }
            
        } 
    };

    // SAVE RESUME

    const handleResumeUpload = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        if (file.type !== "application/pdf") {
            setResumeError("Only PDF files are allowed.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setResumeError("Maximum file size is 5 MB.");
            return;
        }

        setResume(file);
        setResumeError("");

    };

    const saveResume = async () => {

        if (!resume) {
            setResumeError("Please select a PDF.");
            return;
        }

        const formData = new FormData();

        formData.append("email", basicInfo.email);
        formData.append("file", resume);

        try {

            await API.post(
                "/api/profile/resume",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setUploadedResume(resume.name);
            setResumeCompleted(true);
            setResume(null);
            setResumeError("");
            setActiveSection("skills");

        }

        catch(error){
            console.error("API Error:", error);
            console.error(error.response?.data);
        }
    };

    const addSkill = () => {
        const skill = skillInput.trim();
        if (!skill) {
            setSkillError("Please enter a skill.")
            return;
        }
        if (
            skills.some(
                item => item.toLowerCase() === skill.toLowerCase() 
            ) 
        ) {
            setSkillError("Skill already added.");
            return;
        }
        setSkills([...skills, skill]);
        setSkillInput("");
        setSkillError("");
    };
    const removeSkill = (skill) => {

        setSkills(
            skills.filter(item => item !== skill)
        );
    };
    
    const saveSkills = async () => {

        if (skills.length === 0) {
            setSkillError(
                "Please add at least one skill."
            )
            return;
        }
        setSkillError("");

        try {

            await API.put(
                "/api/profile/skills",
                {
                    email: basicInfo.email,
                    skills: skills
                }
            );
            setSkillsCompleted(true);
            setActiveSection("social");

        }
        catch (error) {

            if (error.response) {
                console.error("API Error:", error);
                console.error(error.response?.data);
            }

        }
    };

    const saveSocialLinks = async () => {
        let errors = {};
            const urlPattern =
                /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;
            Object.entries(socialLinks).forEach(([key, value]) => {
                if (value.trim() && !urlPattern.test(value.trim())) {
                    errors[key] = "Please enter a valid URL.";
                }
            });
            setSocialErrors(errors);
            if (Object.keys(errors).length !== 0) return;
            try{
                await API.put(
                    "/api/profile/social",
                    {
                        email: basicInfo.email,

                        linkedin: socialLinks.linkedin,
                        github: socialLinks.github,
                        portfolio: socialLinks.portfolio,

                        leetcode: socialLinks.leetcode,
                        hackerrank: socialLinks.hackerrank
                    }
                );
                setSocialCompleted(true);
                setActiveSection("about");

            }

            catch(error){
                console.error("API Error:", error);
                console.error(error.response?.data);
            }

        };

        const saveAbout = async () => {

        const text = about.trim();

        if (text.length < 50) {
            setAboutError(
                "Please tell recruiters more about yourself (minimum 50 characters)."
            );
            return;
        }

        setAboutError("");

        try {

            await API.put(
                "/api/profile/about",
                {
                    email: basicInfo.email,
                    about: text
                }
            );

            setAboutCompleted(true);
            const user = JSON.parse(localStorage.getItem("user"));
            user.profileCompleted = true;
            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );
            navigate("/student-dashboard");
        }
        catch(error){
            console.error("API Error:", error);
            console.error(error.response?.data);
        }
    };

    // SIDEBAR SECTIONS

    const sections = [

        {
            id: "basic",
            icon: "👤",
            title: "Basic Information",
            status: basicInfo.fullName &&
                    basicInfo.email &&
                    basicInfo.mobile
                ? "Completed"
                : (
                    basicInfo.fullName ||
                    basicInfo.email ||
                    basicInfo.mobile
                )
                ? "In Progress"
                : "Not Started"
        },

        {
            id: "education",
            icon: "🎓",
            title: "Education",
            status: education.college &&
                    education.degree &&
                    education.branch &&
                    education.currentYear &&
                    education.graduationYear &&
                    education.cgpa
                ? "Completed"
                : (
                    education.college ||
                    education.degree ||
                    education.branch ||
                    education.currentYear ||
                    education.graduationYear ||
                    education.cgpa
                )
                ? "In Progress"
                : "Not Started"
        },

        {
            id: "career",
            icon: "💼",
            title: "Career Preferences",
            status: career.preferredRole &&
                    career.preferredLocation &&
                    career.workMode &&
                    career.expectedStipend &&
                    career.availableFrom
                ? "Completed"
                : (
                    career.preferredRole ||
                    career.preferredLocation ||
                    career.workMode ||
                    career.expectedStipend ||
                    career.availableFrom
                )
                ? "In Progress"
                : "Not Started"
        },
        {
            id: "resume",
            icon: "📄",
            title: "Resume",
            status: uploadedResume
                ? "Completed"
                : resume
                ? "In Process"
                : "Not Started"
        },
        {
            id: "skills",
            icon: "🛠",
            title: "Skills",
            status: skills.length > 0
                ? "Completed"
                : "Not Started"
        },
        {
            id: "social",
            icon: "🔗",
            title: "Social Links",
            status: socialLinks.linkedin &&
                    socialLinks.github
                ? "Completed"
                : (
                    socialLinks.linkedin ||
                    socialLinks.github ||
                    socialLinks.portfolio ||
                    socialLinks.leetcode ||
                    socialLinks.hackerrank
                )
                ? "In Process"
                : "Not Started"
        },
        {
            id: "about",
            icon: "📝",
            title: "About Yourself",
            status: about.trim()
                ? "Completed"
                : "Not Started"
        }
    ];
    
    return (
    <>
    
            <div className="profile-top">
                <button
                    className="back-btn"
                    onClick={() => navigate("/")}
                >
                    ← Back
                </button>
            </div>

            <section className="profile-page">

                {/* LEFT SIDEBAR */}

                <div className="profile-sidebar">

                    <h2>Welcome</h2>

                    <p>
                        Complete your profile to unlock personalized internships.
                    </p>

                    <div className="progress-box">

                        <div className="progress-top">

                            <span>Profile Completion</span>

                            <span>{profileProgress}%</span>

                        </div>

                        <div className="progress-bar">

                            <div
                                className="progress-fill"
                                style={{
                                    width: `${profileProgress}%`
                                }}
                            ></div>

                        </div>

                    </div>

                    <div className="section-list">

                        {sections.map((section) => (

                            <div
                                key={section.id}
                                className={
                                    activeSection === section.id
                                        ? "section-card active"
                                        : "section-card"
                                }
                                onClick={() => setActiveSection(section.id)}
                            >

                                <div>

                                    <span className="section-icon">
                                        {section.icon}
                                    </span>

                                </div>

                                <div className="section-text">

                                    <h4>{section.title}</h4>

                                    <span
                                        className={`status ${
                                            section.status === "Completed"
                                                ? "complete"
                                                : section.status === "In Progress"
                                                ? "progress"
                                                : "not-started"
                                        }`}
                                    >
                                        {section.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT CONTENT */}

                <div className="profile-content">
                    <h1>
                        {
                            sections.find(
                                item => item.id === activeSection
                            )?.title
                        }
                    </h1>

                    {activeSection === "basic" && (

                        <div className="basic-form">

                            <div className="photo-upload">

                                <label htmlFor="profile-photo">

                                    <div className="photo-circle">

                                        {
                                            profileImage ?

                                                <img
                                                    src={profileImage}
                                                    alt="Profile"
                                                    className="profile-preview"
                                                />
                                                :
                                                "👤"
                                        }
                                    </div>
                                </label>

                                <input
                                    type="file"
                                    id="profile-photo"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    hidden
                                />

                                <p className="upload-text">
                                    Click photo to upload
                                </p>

                            </div>

                            <div className="input-group">

                                <label>Full Name</label>

                                <input
                                    type="text"
                                    name="fullName"
                                    value={basicInfo.fullName}
                                    onChange={handleBasicChange}
                                    placeholder="Enter youe name"
                                />

                                {basicErrors.fullName && (
                                    <p className="error-text">
                                        {basicErrors.fullName}
                                    </p>
                                )}

                            </div>

                            <div className="input-group">

                                <label>Email</label>

                                <input
                                    type="email"
                                    name="email"
                                    value={basicInfo.email}
                                    onChange={handleBasicChange}
                                    placeholder="Enter your email"
                                />

                                {basicErrors.email && (
                                    <p className="error-text">
                                        {basicErrors.email}
                                    </p>
                                )}

                            </div>

                            <div className="input-group">

                                <label>Mobile Number</label>

                                <input
                                    type="tel"
                                    name="mobile"
                                    value={basicInfo.mobile}
                                    onChange={handleBasicChange}
                                    placeholder="Enter mobile number"
                                />

                                {basicErrors.mobile && (
                                    <p className="error-text">
                                        {basicErrors.mobile}
                                    </p>
                                )}

                            </div>

                            <button
                                type="button"
                                className="save-btn"
                                onClick={saveBasicInformation}
                            >
                                Save Basic Information
                            </button>

                        </div>

                    )}

                    {/* EDUCATION */}

                    {activeSection === "education" && (

                    <div className="education-form">

                        <div className="input-group">

                            <label>College Name</label>

                            <input
                                type="text"
                                name="college"
                                value={education.college}
                                onChange={handleEducationChange}
                                placeholder="Enter your college name"
                            />

                            {educationErrors.college && (
                                <p className="error-text">
                                    {educationErrors.college}
                                </p>
                            )}

                        </div>

                        <div className="input-group">

                            <label>Degree</label>

                            <select
                                name="degree"
                                value={education.degree}
                                onChange={handleEducationChange}
                            >

                                <option value="">Select Degree</option>
                                <option>B.Tech</option>
                                <option>B.E.</option>
                                <option>BCA</option>
                                <option>B.Sc</option>
                                <option>MCA</option>
                                <option>M.Tech</option>

                            </select>

                            {educationErrors.degree && (
                                <p className="error-text">
                                    {educationErrors.degree}
                                </p>
                            )}

                        </div>

                        <div className="input-group">

                            <label>Branch</label>

                            <input
                                type="text"
                                name="branch"
                                value={education.branch}
                                onChange={handleEducationChange}
                                placeholder="Information Technology"
                            />

                            {educationErrors.branch && (
                                <p className="error-text">
                                    {educationErrors.branch}
                                </p>
                            )}

                        </div>

                        <div className="two-column">

                            <div className="input-group">

                                <label>Current Year</label>

                                <select
                                    name="currentYear"
                                    value={education.currentYear}
                                    onChange={handleEducationChange}
                                >

                                    <option value="">Select</option>
                                    <option>1st Year</option>
                                    <option>2nd Year</option>
                                    <option>3rd Year</option>
                                    <option>Final Year</option>

                                </select>

                                {educationErrors.currentYear && (
                                    <p className="error-text">
                                        {educationErrors.currentYear}
                                    </p>
                                )}

                            </div>

                            <div className="input-group">

                                <label>Graduation Year</label>

                                <input
                                    type="number"
                                    name="graduationYear"
                                    value={education.graduationYear}
                                    onChange={handleEducationChange}
                                    placeholder="2027"
                                />

                                {educationErrors.graduationYear && (
                                    <p className="error-text">
                                        {educationErrors.graduationYear}
                                    </p>
                                )}

                            </div>

                        </div>

                        <div className="input-group">

                            <label>Current CGPA</label>

                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                max="10"
                                name="cgpa"
                                value={education.cgpa}
                                onChange={handleEducationChange}
                                placeholder="8.50"
                            />

                            {educationErrors.cgpa && (
                                <p className="error-text">
                                    {educationErrors.cgpa}
                                </p>
                            )}

                        </div>

                        <button
                            className="save-btn"
                            onClick={saveEducation}
                        >
                            Save Education
                        </button>

                    </div>

                    )}

                    {/* CAREER PREFERENCES */}

                    {activeSection === "career" && (

                    <div className="career-form">

                        <div className="input-group">

                            <label>Preferred Role</label>

                            <select
                                name="preferredRole"
                                value={career.preferredRole}
                                onChange={handleCareerChange}
                            >
                                <option value="">Select Role</option>
                                <option>AI / ML Engineer</option>
                                <option>Data Scientist</option>
                                <option>Data Analyst</option>
                                <option>Frontend Developer</option>
                                <option>Backend Developer</option>
                                <option>Full Stack Developer</option>
                                <option>Software Developer</option>
                            </select>

                            {careerErrors.preferredRole && (
                                <p className="error-text">
                                    {careerErrors.preferredRole}
                                </p>
                            )}

                        </div>

                        <div className="input-group">

                            <label>Preferred Location</label>

                            <input
                                type="text"
                                name="preferredLocation"
                                value={career.preferredLocation}
                                onChange={handleCareerChange}
                                placeholder="Ahmedabad, Surat, Remote..."
                            />

                            {careerErrors.preferredLocation && (
                                <p className="error-text">
                                    {careerErrors.preferredLocation}
                                </p>
                            )}

                        </div>

                        <div className="input-group">

                            <label>Work Mode</label>

                            <select
                                name="workMode"
                                value={career.workMode}
                                onChange={handleCareerChange}
                            >
                                <option value="">Select Work Mode</option>                                
                                <option>Remote</option>
                                <option>Hybrid</option>
                                <option>On-site</option>
                            </select>

                            {careerErrors.workMode && (
                                <p className="error-text">
                                    {careerErrors.workMode}
                                </p>
                            )}

                        </div>

                        <div className="input-group">

                            <label>Expected Monthly Stipend (₹)</label>

                            <input
                                type="number"
                                name="expectedStipend"
                                value={career.expectedStipend}
                                onChange={handleCareerChange}
                                placeholder="15000"
                            />

                            {careerErrors.expectedStipend && (
                                <p className="error-text">
                                    {careerErrors.expectedStipend}
                                </p>
                            )}

                        </div>

                        <div className="input-group">

                            <label>Available From</label>

                            <select
                                name="availableFrom"
                                value={career.availableFrom}
                                onChange={handleCareerChange}
                            >
                                <option value="">Select</option>
                                <option>Immediately</option>
                                <option>Next Month</option>
                                <option>After Semester</option>
                            </select>

                            {careerErrors.availableFrom && (
                                <p className="error-text">
                                    {careerErrors.availableFrom}
                                </p>
                            )}

                        </div>

                        <button
                            className="save-btn"
                            onClick={saveCareer}
                        >
                            Save Career Preferences
                        </button>

                    </div>
                    )}

                    {/* RESUME */}

                    {activeSection === "resume" && (

                    <div className="resume-form">

                        <p className="resume-subtitle">
                            Upload your latest resume in PDF format.
                        </p>

                        <label htmlFor="resume-upload" className="resume-upload-box">

                            <div className="resume-icon">
                                📄
                            </div>

                            {
                                resume ? (

                                <>
                                    <h3>{resume.name}</h3>

                                    <p>New Resume Selected</p>

                                    <span className="replace-text">
                                        Click to Replace Resume
                                    </span>
                                </>

                            ) : uploadedResume ? (

                                <>
                                    <h3>
                                        {uploadedResume.split("/").pop()}
                                    </h3>

                                    <p>
                                        Current Resume Uploaded.
                                    </p>

                                    <span className="replace-text">
                                        Click to Replace Resume
                                    </span>

                                </>

                            ) : (

                                <>
                                    <h3>Drag & Drop Resume</h3>

                                    <p>or click here to browse</p>

                                    <small>
                                        PDF only • Max 5 MB
                                    </small>
                                </>
                                )
                            }

                        </label>

                        <input
                            id="resume-upload"
                            type="file"
                            accept=".pdf"
                            hidden
                            onChange={handleResumeUpload}
                        />

                        {resumeError && (
                            <p className="error-text">
                                {resumeError}
                            </p>
                        )} 

                        <button
                            className="save-btn"
                            type="button"
                            onClick={saveResume}
                        >
                            Save Resume
                        </button> 

                    </div>

                    )}

                    {/* SKILLS */}

                    {activeSection === "skills" && (

                    <div className="skills-form">

                        <p className="resume-subtitle">
                            Add your technical skills.
                        </p>

                        <div className="skill-input-box">

                            <input
                                type="text"
                                placeholder="Python"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        addSkill();
                                    }
                                }}
                            />

                            <button
                                type="button"
                                onClick={addSkill}
                            >
                                Add
                            </button>

                        </div>

                        <div className="skill-list">

                            {
                                skills.map(skill=>(

                                    <div
                                        key={skill}
                                        className="skill-chip"
                                    >

                                        {skill}

                                        <span
                                            onClick={()=>removeSkill(skill)}
                                        >
                                            ✕
                                        </span>

                                    </div>

                                ))
                            }

                        </div>

                        {skillError &&
                            <p className="error-text">
                                {skillError}
                            </p>
                        }

                        <button
                            className="save-btn"
                            onClick={saveSkills}
                        >
                            Save Skills
                        </button>

                    </div>

                    )}

                    {/* Social */}

                    {activeSection === "social" && (
                        <div className="basic-form">

                            <div className="input-group">
                                <label>LinkedIn</label>
                                <input
                                    type="text"
                                    name="linkedin"
                                    value={socialLinks.linkedin}
                                    onChange={handleSocialChange}
                                    placeholder="https://linkedin.com/in/yourprofile"
                                />
                                {socialErrors.linkedin && (
                                    <p className="error-text">{socialErrors.linkedin}</p>
                                )}
                            </div>

                            <div className="input-group">
                                <label>GitHub</label>
                                <input
                                    type="text"
                                    name="github"
                                    value={socialLinks.github}
                                    onChange={handleSocialChange}
                                    placeholder="https://github.com/username"
                                />
                                {socialErrors.github && (
                                    <p className="error-text">{socialErrors.github}</p>
                                )}
                            </div>

                            <div className="input-group">
                                <label>Portfolio</label>
                                <input
                                    type="text"
                                    name="portfolio"
                                    value={socialLinks.portfolio}
                                    onChange={handleSocialChange}
                                    placeholder="https://yourportfolio.com"
                                />
                                {socialErrors.portfolio && (
                                    <p className="error-text">{socialErrors.portfolio}</p>
                                )}
                            </div>

                            <div className="input-group">
                                <label>LeetCode</label>
                                <input
                                    type="text"
                                    name="leetcode"
                                    value={socialLinks.leetcode}
                                    onChange={handleSocialChange}
                                    placeholder="https://leetcode.com/u/username"
                                />
                                {socialErrors.leetcode && (
                                    <p className="error-text">{socialErrors.leetcode}</p>
                                )}
                            </div>

                            <div className="input-group">
                                <label>HackerRank</label>
                                <input
                                    type="text"
                                    name="hackerrank"
                                    value={socialLinks.hackerrank}
                                    onChange={handleSocialChange}
                                    placeholder="https://hackerrank.com/profile"
                                />
                                {socialErrors.hackerrank && (
                                    <p className="error-text">{socialErrors.hackerrank}</p>
                                )}
                            </div>

                            <button
                                type="button"
                                className="save-btn"
                                onClick={saveSocialLinks}
                            >
                                Save Social Links
                            </button>

                        </div>
                    )}

                    {/* ABOUT YOURSELF */}

                    {activeSection === "about" && (

                    <div className="about-form">

                        <p className="resume-subtitle">
                            Tell recruiters something about yourself.
                        </p>

                        <div className="input-group">
                            <label>About Yourself</label>

                            <textarea
                                className="about-textarea"
                                placeholder="Example: I am a 3rd-year Information Technology student passionate about AI, Machine Learning and Backend Development. I enjoy solving real-world problems and continuously improving my technical skills."
                                value={about}
                                onChange={handleAboutChange}
                                rows={8}
                            />

                            <div className="character-count"
                                style={{
                                    color:
                                        about.length < 50
                                            ? "#E53935"
                                            : "#4F8A63"
                                        }}
                                >
                                {about.length} / 500 Characters

                            </div>

                            {aboutError &&

                                <p className="error-text">{aboutError}</p>
                            }

                        </div>

                        <button
                            type="button"
                            className="save-btn"
                            onClick={saveAbout}
                        >
                            Complete Profile
                        </button>

                    </div>

                    )}

                    </div>
                </section>
        
        </>
    );
}
export default CompleteProfile;