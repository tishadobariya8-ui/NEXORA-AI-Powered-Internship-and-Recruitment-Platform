import "../About.css";
import Navbar from "../components/Navbar";

function About() {
  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}

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

      {/* ================= MISSION ================= */}

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

      {/* ================= VALUES ================= */}

      <section className="values-section">
        <div className="about-container page-container">
          <span className="about-tag">
            VALUES
          </span>
          <h2 className="section-title">
            What we stand for
          </h2>
          <div className="values-grid">

            {/* Card 1 */}

            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Accessibility</h3>
              <p>
                Every student deserves great opportunities,
                regardless of college tier or city.
              </p>
            </div>

            {/* Card 2 */}

            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Trust</h3>
              <p>
                Every listing and certificate is verified to ensure
                quality and authenticity.
              </p>
            </div>

            {/* Card 3 */}

            <div className="value-card">
              <div className="value-icon">📊</div>
              <h3>Transparency</h3>
              <p>
                Clear progress tracking and honest feedback
                so everyone grows together.
              </p>
            </div>

            {/* Card 4 */}

            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Speed</h3>
              <p>
                Application to placement in days,
                not months. Your career can't wait.
              </p>
            </div>

            {/* Card 5 */}

            <div className="value-card">
              <div className="value-icon">🏅</div>
              <h3>Excellence</h3>
              <p>
                High standards for interns and employers —
                a self-reinforcing cycle of quality.
              </p>
            </div>

            {/* Card 6 */}

            <div className="value-card">
              <div className="value-icon">🔬</div>
              <h3>Innovation</h3>
              <p>
                Smart technology connects the right people
                to the right opportunities every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
}

export default About;