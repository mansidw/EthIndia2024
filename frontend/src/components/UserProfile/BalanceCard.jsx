import React from "react";
import "./UserProfile";

const BalanceCard = ({ userName, balance }) => {
  return (
    <div className="credit-card">
      <div className="card-header">
        <div className="card-chip"></div>
        <span className="card-bank">Praman Setu</span>
      </div>
      <div className="card-body">
        <div className="card-balance">
          <p>Balance</p>
          <h2 className="total_balance">${balance.toLocaleString()}</h2>
        </div>
        <div className="card-user">
          <span>WalletID: {userName}</span>
        </div>
      </div>
      {/* <div className="card-footer">
            <span className="card-number">•••• •••• •••• 1234</span>
            <span className="card-expiry">Valid Thru: 12/27</span>
        </div> */}
    </div>
  );
};

export default BalanceCard;
