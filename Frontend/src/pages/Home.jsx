import "../Home.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}

      <main id="page-home">
        <section className="hero">
          <div className="hero-grid">

            {/* LEFT */}

            <div>
              <div className="hero-eyebrow">
                INDIA'S INTERNSHIP PLATFORM
              </div>
              <h1>
                Where <em>Talent</em><br />
                Meets Real<br />
                Opportunity
              </h1>
              <p>
                NEXORA connects students with startups and companies —
                verified internships, live progress tracking,
                and certified achievements.
              </p>
              <div className="hero-btns">
                <button 
                    className="btn-dark"
                    onClick={() => navigate("/internships")}
                  >
                    Explore Internships →
                </button>
                <button className="btn-light">
                  Browse Internships
                 </button>
              </div>
              <div className="hero-stats">
                <div className="hstat">
                  <div className="hstat-n">12K+</div>
                  <div className="hstat-l">
                    STUDENTS PLACED
                  </div>
                </div>
                <div className="hdiv"></div>
                <div className="hstat">
                  <div className="hstat-n">850+</div>
                  <div className="hstat-l">
                    COMPANIES
                  </div>
                </div>
                <div className="hdiv"></div>
                <div className="hstat">
                  <div className="hstat-n">96%</div>
                  <div className="hstat-l">
                    COMPLETION RATE
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="hero-visual">
              <div className="hcard-main">
                <div className="hcm-logo">
                  FP
                </div>
                <div className="hcm-title">
                  Frontend Engineering Intern
                </div>
                <div className="hcm-sub">
                  FinPulse • Bangalore • Remote • ₹15,000/mo
                </div>
                <div className="hcm-pl">
                  <span>Internship Progress</span>
                  <span>72%</span>
                </div>
                <div className="hcm-pb">
                  <div className="hcm-pf"></div>
                </div>
                <div className="hcm-miles">
                  <span className="hcm-mile done">
                    ✓ Onboarding
                  </span>
                  <span className="hcm-mile done">
                    ✓ Week 1-2
                  </span>
                  <span className="hcm-mile done">
                    ✓ Mid Review
                  </span>
                  <span className="hcm-mile">
                    Building
                  </span>
                  <span className="hcm-mile">
                    Final Project
                  </span>
                </div>
              </div>
              <div className="hcard-f1">
                🎉 Certificate Earned!
              </div>
              <div className="hcard-f2">
                <span className="dotg"></span>
                248 live internships
              </div>
            </div>
          </div>
        </section>

        {/*  Trust section */}

        <section className="trust">
        <div className="trust-in">
        <div className="trust-lbl">
        TRUSTED BY
        </div>
        <div className="tdiv"></div>
        <div className="tlogos">
        <div className="tlogo">Razorpay</div>
        <div className="tlogo">Groww</div>
        <div className="tlogo">Zepto</div>
        <div className="tlogo">CRED</div>
        <div className="tlogo">Meesho</div>
        <div className="tlogo">Slice</div>
        </div>
        </div>
        </section>

        {/* Process Section */}

        <section className="sw">
        <div className="sec">
        <div className="sec-label">
        PROCESS
        </div>
        <h2 className="sec-title">
        From signup to certificate
        <br />
        in 4 simple steps
        </h2>
        <div className="steps-grid">
        <div className="step-c">
        <div className="step-n">
        01
        </div>
        <div className="step-i">
        🎯
        </div>
        <h3>Create Profile</h3>
        <p>
        Students showcase skills.
        Companies list requirements and
        culture in minutes.
        </p>
        </div>
        <div className="step-c">
        <div className="step-n">
        02
        </div>
        <div className="step-i">
        🔎
        </div>
        <h3>Match & Apply</h3>
        <p>
        Smart matching finds the best internships
        for students and the best candidates.
        </p>
        </div>
        <div className="step-c">
        <div className="step-n">
        03
        </div>
        <div className="step-i">
        📈
        </div>
        <h3>Track Progress</h3>
        <p>
        Live dashboards show milestones,
        mentor feedback and hours logged.
        </p>
        </div>
        <div className="step-c">
        <div className="step-n">
        04
        </div>
        <div className="step-i">
        🏅
        </div>
        <h3>Earn Certificate</h3>
        <p>
        Verified digital certificates issued on
        completion and shareable to LinkedIn.
        </p>
        </div>
        </div>
        </div>
        </section>

        {/* Audience Section */}

        <section className="sw">
        <div className="sec">
          <div className="sec-label">
            WHO IT'S FOR
          </div>
          <h2 className="sec-title">
            Built for every role
          </h2>
          <div className="aud-grid">
            <div className="aud-c st">
              <div className="aud-ico">
              🎓
              </div>
              <h3>Students</h3>
              <p>
                Discover internships matching your skills,
                track progress live and earn certificates.
              </p>
              <ul className="flist">
                <li>Smart internship matching</li>
                <li>Real-time progress dashboard</li>
                <li>Verified certificates</li>
                <li>Mentor feedback</li>
                <li>Portfolio showcase</li>
              </ul>
            </div>
            <div className="aud-c sp">
              <div className="aud-ico">
                🚀
              </div>
              <h3>Startups</h3>
              <p>
                Hire motivated interns, manage milestones
                and issue certificates automatically.
              </p>
              <ul className="flist">
                <li>12,000+ students</li>
                <li>Unlimited roles</li>
                <li>Milestone tracking</li>
                <li>Auto certificates</li>
                <li>Employer branding</li>
              </ul>
            </div>
            <div className="aud-c co">
              <div className="aud-ico">
                🏢
              </div>
              <h3>Companies</h3>
              <p>
                Source pre-screened candidates with
                internship experience.
              </p>
              <ul className="flist">
                <li>Talent pipeline</li>
                <li>Skill filters</li>
                <li>Campus hiring</li>
                <li>Performance reports</li>
                <li>ATS Integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}

      <section className="sw tstrip">
      <div className="sec">
        <div className="sec-label">
          STORIES
        </div>
        <h2 className="sec-title">
          What our community says
        </h2>
        <div className="tgrid">
          <div className="tc">
            <div className="stars">
              ★★★★★
            </div>
            <p className="tc-txt">
              "NEXORA helped me land a UI/UX internship at a funded startup
              within two weeks. The progress tracker kept me accountable!"
            </p>
            <div className="tc-auth">
              <div
                className="tc-av"
                style={{ background: "#4A7C59" }}
              >
                AK
              </div>
              <div>
                <div className="tc-name">
                  Aarav Kumar
                </div>
                <div className="tc-role">
                  Student · BITS Pilani
                </div>
              </div>
            </div>
          </div>
          <div className="tc">
            <div className="stars">
              ★★★★★
            </div>
            <p className="tc-txt">
              "We've hired 14 interns through NEXORA in 6 months.
              They're motivated and skilled before they even join."
            </p>
            <div className="tc-auth">
              <div
                className="tc-av"
                style={{ background: "#C4622D" }}
              >
                PR
              </div>
              <div>
                <div className="tc-name">
                  Priya Rathi
                </div>
                <div className="tc-role">
                  CTO · Fintech Startup, Bangalore
                </div>
              </div>
            </div>
          </div>
          <div className="tc">
            <div className="stars">
              ★★★★☆
            </div>
            <p className="tc-txt">
              "We hired 3 full-time engineers who originally interned
              on the platform. NEXORA is our #1 sourcing channel."
            </p>
            <div className="tc-auth">
              <div
                className="tc-av"
                style={{ background: "#3A6EA5" }}
              >
                SM
              </div>
              <div>
                <div className="tc-name">
                  Sneha Mehta
                </div>
                <div className="tc-role">
                  HR Lead · Enterprise SaaS, Mumbai
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* Call to Action Section */}

      <section className="cta-band">
      <h2>
        Ready to <em>Launch</em>
        <br />
        Your Journey?
      </h2>
      <p>
        Join thousands already building futures on NEXORA.
        Free forever to get started.
      </p>
      <div className="cta-btns">
        <button 
          className="btn btn-primary"
          onClick={() => navigate("/signup")}
          >
          Create Free Account →
        </button>
      </div>
      </section>

      {/* Footer */}

      <footer>
      <div className="foot-in">
        <div className="foot-top">
          <div className="foot-brand">
            <div className="foot-logo">
              NEX<span>ORA</span>
            </div>
            <p>
              Connecting talent with opportunity —
              one verified internship at a time.
            </p>
          </div>
          <div className="foot-col">
            <h4>PLATFORM</h4>
            <a href="#">Browse Internships</a>
            <a href="#">For Students</a>
            <a href="#">For Startups</a>
            <a href="#">For Companies</a>
          </div>
          <div className="foot-col">
            <h4>COMPANY</h4>
            <a href="#">About Us</a>
            <a href="#">Blog</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>
          <div className="foot-col">
            <h4>SUPPORT</h4>
            <a href="#">Help Center</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="foot-bot">
          <p>
            © 2025 NEXORA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

      </main>
    </>
  );
}

export default Home;
