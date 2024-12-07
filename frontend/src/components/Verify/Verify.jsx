import React, { useState, useEffect } from "react";
import { ReactTinyLink } from "react-tiny-link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, SkipForward } from "lucide-react";
import "./Verify.css";

// Simulated API data fetch (replace with actual API call)
const fetchArticles = () => {
  return new Promise((resolve) => {
    const dummyArticles = [
      {
        id: 1,
        url: "https://techcrunch.com/2024/01/15/ai-revolutionizes-tech-industry",
        hash: "tech_article_1",
      },
      {
        id: 2,
        url: "https://www.wired.com/story/future-of-machine-learning",
        hash: "tech_article_2",
      },
      {
        id: 3,
        url: "https://venturebeat.com/ai/breakthrough-in-neural-networks",
        hash: "tech_article_3",
      },
      {
        id: 4,
        url: "https://techradar.com/latest-innovation-trends",
        hash: "tech_article_4",
      },
    ];

    // Simulate network delay
    setTimeout(() => {
      resolve(dummyArticles);
    }, 1000);
  });
};

const Verify = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stake, setStake] = useState(""); // New state for stake

  // Fetch articles on component mount
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        const fetchedArticles = await fetchArticles();
        setArticles(fetchedArticles);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch articles:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  // Handle verification (accept or decline)
  const handleVerification = async (isAccepted) => {
    if (currentIndex < articles.length) {
      if (!stake || isNaN(stake) || stake <= 0) {
        alert("Please enter a valid stake greater than 0.");
        return;
      }

      try {
        // Simulated API call for verification
        console.log(`Verifying article ${articles[currentIndex].id}`, {
          accepted: isAccepted,
          stake: stake,
          url: articles[currentIndex].url,
        });

        // Move to next article
        setCurrentIndex((prev) => prev + 1);
        setStake(""); // Reset stake after verification
      } catch (error) {
        console.error("Verification failed:", error);
      }
    }
  };

  // Handle skip
  const handleSkip = () => {
    if (currentIndex < articles.length) {
      console.log(`Skipping article ${articles[currentIndex].id}`);

      // Move to next article
      setCurrentIndex((prev) => prev + 1);
      setStake(""); // Reset stake when skipping
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="verify-container">
        <div className="loading-spinner" />
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="verify-container">
        <p className="error-message">
          Failed to load articles. Please try again later.
        </p>
      </div>
    );
  }

  // Check if all articles have been processed
  if (currentIndex >= articles.length) {
    return (
      <div className="verify-container">
        <p className="completed-message">All articles have been processed</p>
      </div>
    );
  }

  const currentArticle = articles[currentIndex];

  return (
    <div className="verify-container">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="article-verification-wrapper"
        >
          {/* Decline Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleVerification(false)}
            className="decline-button"
          >
            <X size={24} />
          </motion.button>

          {/* Article Card */}
          <div className="article-card-container">
            <ReactTinyLink
              cardSize="large"
              showGraphic={true}
              maxLine={2}
              minLine={1}
              url={currentArticle.url}
              defaultMedia="default_article.jpg"
            />
          </div>

          {/* Accept Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleVerification(true)}
            className="accept-button"
          >
            <Check size={24} />
          </motion.button>
        </motion.div>
      </AnimatePresence>

      {/* Stake Input */}
      <div className="stake-input-container">
        <label htmlFor="stake">Enter your stake:</label>
        <input
          id="stake"
          type="number"
          value={stake}
          onChange={(e) => setStake(e.target.value)}
          placeholder="Enter stake"
        />
      </div>

      {/* Skip Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleSkip}
        className="skip-button"
      >
        <SkipForward size={20} className="mr-2" />
        Skip
      </motion.button>
    </div>
  );
};

export default Verify;
