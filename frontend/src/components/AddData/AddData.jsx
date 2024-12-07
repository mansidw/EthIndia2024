import React, { useState, useEffect } from "react";
import "./AddData.css";
import { ReactTinyLink } from "react-tiny-link";

const Adddata = ({ web3, accounts, contract }) => {
  useEffect(() => {
    console.log("inside the add dtaa page - ", accounts);
  }, []);
  const [webLink, setWebLink] = useState("");

  const handleInputChange = (e) => {
    setWebLink(e.target.value);
  };

  const handleSubmit = () => {
    alert(`Submitted: ${webLink}`);
    // Additional logic for submitting the link can go here
  };

  return (
    <div className="web-preview-container">
      <div className="input-group">
        <label htmlFor="webLink" className="input-label">
          Enter Article Link:
        </label>
        <input
          type="text"
          id="webLink"
          value={webLink}
          onChange={handleInputChange}
          placeholder="Paste a valid URL (e.g., https://example.com)"
          className="web-input"
        />
      </div>

      {webLink && (
        <div className="preview-container">
          <ReactTinyLink
            cardSize="large"
            showGraphic={true}
            maxLine={2}
            minLine={1}
            url={webLink}
            defaultMedia="defaul_article.jpg"
          />
        </div>
      )}

      <div className="button-group">
        <button onClick={handleSubmit} className="button submit-button">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Adddata;
