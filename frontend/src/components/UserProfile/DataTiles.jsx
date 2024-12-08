import React from "react";
import { ReactTinyLink } from "react-tiny-link";
import "./UserProfile.css";

const DataTiles = ({ data }) => {
  const calculateSummary = (vote, info) => {
    const { positivecnts, negativecnts, threshold } = info;
    const { userVote, stakeamt } = vote;
    let summary = 0;
    let status = "In Progress";

    // Base case
    if (positivecnts + negativecnts < threshold) {
      status = "In Progress";
      summary = 0;
    } else {
      status = "Completed";
      // Case when vote is 1 (Yes)
      if (userVote === 1) {
        if (positivecnts > negativecnts) {
          summary = stakeamt * 1.3; // User gains
        } else {
          summary = -stakeamt; // User loses
        }
      }
      // Case when vote is 0 (No)
      else if (userVote === 0) {
        if (negativecnts > positivecnts) {
          summary = stakeamt * 1.3; // User gains
        } else {
          summary = -stakeamt; // User loses
        }
      }
    }

    return { summary, status };
  };

  return (
    <div>
      {data?.map((item, index) => {
        const { vote, info } = item;
        const { summary, status } = calculateSummary(vote, info);
        const summaryStyle =
          summary >= 0 ? { color: "green" } : { color: "red" };

        return (
          <div key={index} className="data_tile">
            <ReactTinyLink
              cardSize="small"
              showGraphic={true}
              maxLine={1}
              url={info.url}
              className="data_link"
            //   width={1000}
            />
            <div className="user_data_stake">
              <p>Stake amount:</p>
              <p>{vote.stakeamt.toString()}</p>
            </div>
            <div className="data_info">
              <p>Status: {status}</p>
              {status == "Completed" && (
                <p>
                  <span className="user_data_summary" style={summaryStyle}>
                    {summary}
                  </span>
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DataTiles;
