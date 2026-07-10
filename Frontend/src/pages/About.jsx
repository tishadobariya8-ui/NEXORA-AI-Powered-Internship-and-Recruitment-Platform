import "../About.css";
import Navbar from "../components/Navbar";

function About() {

  const values = [
    {
      icon: "🌍",
      title: "Accessibility",
      description:
        "Every student deserves great opportunities, regardless of college tier or city.",
    },
    {
      icon: "🤝",
      title: "Trust",
      description:
        "Every listing and certificate is verified to ensure quality and authenticity.",
    },
    {
      icon: "📊",
      title: "Transparency",
      description:
        "Clear progress tracking and honest feedback so everyone grows together.",
    },
    {
      icon: "⚡",
      title: "Speed",
      description:
        "Application to placement in days, not months. Your career can't wait.",
    },
    {
      icon: "🏅",
      title: "Excellence",
      description:
        "High standards for interns and employers — a self-reinforcing cycle of quality.",
    },
    {
      icon: "🔬",
      title: "Innovation",
      description:
        "Smart technology connects the right people to the right opportunities every time.",
    },
  ];

  return (
    <>
      <Navbar />

      {/*  HERO  */}

      <section className="about-hero">
        <div className="about-container page-container">
          <span className="about-tag">
            OUR STORY
          </span>
          <h1>
            Bridging the gap <br />
            between <span>education</span> and <br />
            real experience
          </h1>
          <p>
            NEXORA was born in a college classroom by two students who kept
            hearing the same frustration — great skills, no opportunities.
            So they built the platform they wished existed.
          </p>
        </div>
      </section>

    {/* MISSION */}

      <section className="mission-section">
        <div className="about-container page-container">
          <div className="mission-card">
            <div className="mission-icon">
              💡
            </div>
            <h2>Our Mission</h2>
            <p>
              To democratize access to real-world internship experiences
              for every student in India — regardless of their college,
              city, or background — while helping startups and companies
              build world-class teams.
            </p>
          </div>
        </div>
      </section>

      {/*  VALUES  */}

      <section className="values-section">
        <div className="about-container page-container">
          <span className="about-tag">
            VALUES
          </span>
          <h2 className="section-title">
            What we stand for
          </h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div className="value-card" key={index}>
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div> 
        </div>
      </section>
      
    </>
  );
}

export default About;