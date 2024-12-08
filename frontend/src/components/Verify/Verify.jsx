import React, { useState, useEffect } from "react";
import { ReactTinyLink } from "react-tiny-link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, SkipForward } from "lucide-react";
import "./Verify.css";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";


const Verify = ({ web3, accounts, contract }) => {
  const { articles, getAllArticles, addUserVote } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stake, setStake] = useState(""); // New state for stake

  // Fetch articles on component mount
  useEffect(() => {
    try {

      getAllArticles()
    } finally {
      setIsLoading(false)
    }
  }, []);

  // Handle verification (accept or decline)
  const handleVerification = async (isAccepted, urlHash) => {
    console.log(urlHash)
    console.log("url hash")
    if (currentIndex < articles.length) {
      if (!stake || isNaN(stake) || stake <= 0) {
        alert("Please enter a valid stake greater than 0.");
        return;
      }

      try {

        await addUserVote(urlHash, isAccepted == true ? 1 : 0, stake);

        toast.success("Successfully added your vote!");

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
  console.log(currentArticle);
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
            onClick={() => handleVerification(false, currentArticle.urlhash)}
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
            onClick={() => handleVerification(true, currentArticle.urlhash)}
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
