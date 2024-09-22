import React, { useState } from 'react';
import PaymentPage from './PaymentPage';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import '../component-css/HashGenerator.css'; 

const HashGenerator: React.FC = () => {
  const [key, setKey] = useState<string>('gtKFFx');
  const [txnid, setTxnid] = useState<string>('');
  const [amount, setAmount] = useState<string>('10');
  const [productinfo, setProductinfo] = useState<string>('yourProductInfo');
  const [firstname, setFirstname] = useState<string>('yourFirstName');
  const [email, setEmail] = useState<string>('abc@gmail.com');
  const [salt, setSalt] = useState<string>('4R38IvwiV57FwVpsgOvTXBdLE4tHUXFW');
  const [hash, setHash] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const generateHash = async (
    key: string,
    txnid: string,
    amount: string,
    productinfo: string,
    firstname: string,
    email: string,
    salt: string,
    udf1: string = 'd1',
    udf2: string = 'd2',
    udf3: string = 'd3',
    udf4: string = 'd4',
    udf5: string = 'd5'
  ): Promise<string> => {
    const input = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${salt}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const generateTransitionId = (): string => {
    let uuidStr = uuidv4().replaceAll("-", "");
    const timestamp = moment().format('YYYYMMDDHHmmssSSS');
    return `${uuidStr}${timestamp}`.slice(0, 20);
  };

  const handleGenerateHash = async () => {
    const transitionId = generateTransitionId();
    setTxnid(transitionId);
    setLoading(true);
    try {
      const newHash = await generateHash(key, transitionId, amount, productinfo, firstname, email, salt);
      setHash(newHash);
    } catch (error) {
      console.error('Error generating hash:', error);
    } finally {
      setLoading(false);
    }
  };

  const paymentDetails = {
    key,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    salt
  };

  return (
    <div className="hash-generator">
      <h1 className="title">Hash Generator and API Call</h1>
      <div className="input-group">
        <input className="input" type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
        <input className="input" type="text" value={productinfo} onChange={(e) => setProductinfo(e.target.value)} placeholder="Product Info" />
        <input className="input" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="First Name" />
        <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      </div>
      <button className="generate-btn" onClick={handleGenerateHash} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Hash and Call API'}
      </button>
      {loading && <p className="loading-text">Loading...</p>}
      {hash && (
        <div className="result">
          <strong>Transition Id:</strong>
          <pre>
            <p>transitionId :{txnid}</p>
            <PaymentPage paymentDetails={paymentDetails} hash={hash} />
          </pre>
        </div>
      )}
    </div>
  );
};

export default HashGenerator;
