import React from 'react';
import '../component-css/TransactionFailed.css'; // Import your CSS file for styling

const TransactionFailed: React.FC = () => {
  return (
    <div className="transaction-failed-container">
      <div className="emoji">😔</div>
      <h1 className="message">Transaction Failed</h1>
      <p className="sub-message">We are sorry, something went wrong. Please try again later.</p>
    </div>
  );
};

export default TransactionFailed;
