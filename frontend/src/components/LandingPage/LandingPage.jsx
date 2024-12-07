import React, { useEffect, useRef } from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const sectionRef = useRef(null);
  let navigate = useNavigate();

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      const elements = section.querySelectorAll(".fade-in");
      elements.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add("visible");
        }, i * 150); // Staggered delay
      });
    }
  }, []);

  const totalArticles = 3240;
  const verifiedArticles = 1210;

  const handleAadhaarLogin = () => {
    console.log("Logging in with Aadhaar...");
  };

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
        background: "linear-gradient(to bottom, #fafafa 0%, #ffffff 100%)",
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
        padding: "60px 20px",
        color: "#333",
        position: "relative",
        overflow: "hidden",
        width: "100vw",
      }}
    >
      {/* Background Graphic (optional decorative element) */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "300px",
          height: "300px",
          background: "rgba(254,199,1,0.1)",
          borderRadius: "50%",
          zIndex: 0,
          filter: "blur(80px)",
        }}
      ></div>

      <style>
        {`
          .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }
          .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
          }

          .slide-up {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }
          .slide-up.visible {
            opacity: 1;
            transform: translateY(0);
          }

          .feature-card:hover, .stats-card:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 8px 30px rgba(0,0,0,0.15);
          }

          .animated-button:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          }

          .animated-graphic {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 1s ease, transform 1s ease;
          }
          .animated-graphic.visible {
            opacity: 1;
            transform: translateY(0);
          }
        `}
      </style>

      {/* Tagline */}
      <h1
        className="fade-in"
        style={{
          fontSize: "4rem",
          fontWeight: 700,
          marginBottom: "40px",
          letterSpacing: "1px",
          textTransform: "capitalize",
          zIndex: 1,
        }}
      >
        प्रमाणसेतु
      </h1>
      <p>Bridging The Gap Between AI And Trust</p>

      {/* Statistics Section */}
      <div
        className="fade-in"
        style={{
          display: "flex",
          gap: "30px",
          marginBottom: "60px",
          flexWrap: "wrap",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <div
          className="stats-card"
          style={{
            background: "#fff",
            borderRadius: "10px",
            padding: "20px 40px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            minWidth: "200px",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
        >
          <p
            style={{
              fontSize: "1.2rem",
              margin: "0 0 10px 0",
              fontWeight: 500,
              color: "#666",
            }}
          >
            Total Articles
          </p>
          <p
            style={{
              fontSize: "2rem",
              margin: 0,
              fontWeight: 700,
              color: "#fec701",
            }}
          >
            {totalArticles}
          </p>
        </div>

        <div
          className="stats-card"
          style={{
            background: "#fff",
            borderRadius: "10px",
            padding: "20px 40px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            minWidth: "200px",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
        >
          <p
            style={{
              fontSize: "1.2rem",
              margin: "0 0 10px 0",
              fontWeight: 500,
              color: "#666",
            }}
          >
            Verified Articles
          </p>
          <p
            style={{
              fontSize: "2rem",
              margin: 0,
              fontWeight: 700,
              color: "#fec701",
            }}
          >
            {verifiedArticles}
          </p>
        </div>
      </div>

      {/* Login with Aadhaar Button */}
      <div className="fade-in" style={{ marginBottom: "80px", zIndex: 1 }}>
        <button
          onClick={() => navigate("/add")}
          className="animated-button"
          style={{
            fontSize: "1rem",
            padding: "15px 30px",
            background: "#fec701",
            color: "#333",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: 600,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
        >
          Go to the dashboard
        </button>
        <p style={{ marginTop: "10px", fontSize: "0.9rem", color: "#888" }}>
          Secure login provided by Anon Aadhaar
        </p>
      </div>

      {/* How We Verify Section */}
      <div
        className="fade-in"
        style={{ maxWidth: "800px", margin: "0 auto 80px auto", zIndex: 1 }}
      >
        <h2
          style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "40px" }}
        >
          How We Verify Information
        </h2>
        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.6",
            color: "#555",
            marginBottom: "40px",
          }}
        >
          Once articles are posted, our community of manual reviewers votes on
          whether each article is correct or incorrect. After reaching a certain
          threshold of votes, we declare the article’s accuracy based on the
          consensus. This ensures a transparent, democratic process where
          community members collectively determine the validity of the content.
        </p>
        {/* <img
          src="https://via.placeholder.com/600x300/fec701/000?text=Verification+Process+Graphic"
          alt="Verification Process"
          className="animated-graphic"
          style={{
            maxWidth: "100%",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
          onLoad={(e) => e.currentTarget.classList.add("visible")}
        /> */}
      </div>

      {/* Features Section */}
      <div
        className="fade-in"
        style={{
          maxWidth: "1200px",
          margin: "0 auto 80px auto",
          padding: "0 20px",
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            marginBottom: "40px",
            color: "#333",
          }}
        >
          Features
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            justifyContent: "center",
          }}
        >
          {/* Feature: Universal Compatibility */}
          <div
            className="feature-card"
            style={{
              flex: "1 1 250px",
              maxWidth: "300px",
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              padding: "30px 20px",
              textAlign: "center",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            <img
              src="https://via.placeholder.com/80/fec701/000?text=UC"
              alt="Universal Compatibility"
              style={{ marginBottom: "20px" }}
            />
            <h3
              style={{
                fontSize: "1.5rem",
                marginBottom: "10px",
                color: "#333",
              }}
            >
              Universal Compatibility
            </h3>
            <p style={{ fontSize: "1rem", color: "#555" }}>
              Our solution is built as a modular extension that can seamlessly
              integrate into any chatbot platform. Just plug and play.
            </p>
          </div>

          {/* Feature: Consensus Based Verification */}
          <div
            className="feature-card"
            style={{
              flex: "1 1 250px",
              maxWidth: "300px",
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              padding: "30px 20px",
              textAlign: "center",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            <img
              src="https://via.placeholder.com/80/fec701/000?text=CV"
              alt="Consensus Based Verification"
              style={{ marginBottom: "20px" }}
            />
            <h3
              style={{
                fontSize: "1.5rem",
                marginBottom: "10px",
                color: "#333",
              }}
            >
              Consensus Based Verification
            </h3>
            <p style={{ fontSize: "1rem", color: "#555" }}>
              Articles or datasets are validated by community reviewers who
              assess and mark them as correct or incorrect. Reviewers receive
              rewards or penalties based on their votes.
            </p>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div
        className="fade-in"
        style={{ maxWidth: "800px", margin: "0 auto", zIndex: 1 }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            marginBottom: "40px",
            color: "#333",
          }}
        >
          Use Cases
        </h2>
        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.6",
            color: "#555",
            marginBottom: "40px",
          }}
        >
          Our platform fuels a marketplace for verified data, ensuring
          trustworthy and accurate content. Additionally, it plays a critical
          role in misinformation detection, enabling a trust layer powered by
          blockchain that helps identify and eliminate false information.
        </p>
        {/* <img
          src="https://via.placeholder.com/600x300/fec701/000?text=Use+Cases+Graphic"
          alt="Use Cases Graphic"
          className="animated-graphic"
          style={{
            maxWidth: "100%",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
          onLoad={(e) => e.currentTarget.classList.add("visible")}
        /> */}
      </div>
    </section>
  );
};

export default LandingPage;
