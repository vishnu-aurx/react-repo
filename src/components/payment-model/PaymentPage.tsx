import React from 'react';

interface PaymentPageProps {
    paymentDetails: {
      txnid: string;
      key: string;
      amount: string;
      productinfo: string;
      firstname: string;
      email: string;
      salt: string;
    };
    hash: string;
  }
  
  const PaymentPage: React.FC<PaymentPageProps> = ({ paymentDetails, hash }) => {
    if (!paymentDetails) {
      return <div>Loading...</div>;
    }
    debugger;
  return (
    <div>
      <form action='https://apitest.payu.in/_payment' method='post'>
        <input type="hidden" name="key" value={paymentDetails.key} />
        <input type="hidden" name="txnid" value={paymentDetails.txnid} />
        <input type="hidden" name="productinfo" value={paymentDetails.productinfo} />
        <input type="hidden" name="amount" value={paymentDetails.amount} />
        <input type="hidden" name="email" value={paymentDetails.email} />
        <input type="hidden" name="firstname" value={paymentDetails.firstname} />

        <input type="hidden" name="udf1" value="d1" />

        <input type="hidden" name="udf2" value="d2" />

        <input type="hidden" name="udf3" value="d3" />

        <input type="hidden" name="udf4" value="d4" />

        <input type="hidden" name="udf5" value="d5" />


        <input type="hidden" name="surl" value="https://apiplayground-response.herokuapp.com/" />
        <input type="hidden" name="furl" value="http://localhost:4173/transaction/error" />
        <input type="hidden" name="hash" value={hash} />
        <input className="generate-btn" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default PaymentPage;
