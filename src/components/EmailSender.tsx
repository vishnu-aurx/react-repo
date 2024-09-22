import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { FaEnvelope, FaTrash, FaPlus, FaPaperPlane, FaEdit } from 'react-icons/fa';

interface EmailData {
  to_email: string;
  subject: string;
  templateData: {
    to_name: string;
    from_name: string;
    message: string;
  };
}

const EmailSender: React.FC = () => {
  const [emailList, setEmailList] = useState<EmailData[]>([]);
  const [newEmail, setNewEmail] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [commonMessage, setCommonMessage] = useState<string>('');
  const [commonSubject, setCommonSubject] = useState<string>('');
  const [fromName, setFromName] = useState<string>('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isEditingCommonFields, setIsEditingCommonFields] = useState<boolean>(false);
  const [showCommonFields, setShowCommonFields] = useState<boolean>(true);

  const serviceID = ''; // Ensure you add your EmailJS service ID
  const templateID = ''; // Ensure you add your EmailJS template ID
  const userID = '';

  const handleAddRecipient = () => {
    if (newEmail && newName) {
      const newRecipient = {
        to_email: newEmail,
        subject: commonSubject || 'New message for you!',
        templateData: {
          to_name: newName,
          from_name: fromName || 'Your Name',
          message: commonMessage,
        },
      };
      setEmailList([...emailList, newRecipient]);
      setNewEmail('');
      setNewName('');
    } else {
      setError('Please enter both an email and a name.');
    }
  };

  const handleRemoveRecipient = (index: number) => {
    const updatedList = emailList.filter((_, i) => i !== index);
    setEmailList(updatedList);
  };

  const sendEmails = async () => {
    setIsSending(true);
    setError(null);
    setSuccessMessage(null);

    try {
      for (const email of emailList) {
        const templateParams = {
          to_email: email.to_email,
          subject: email.subject,
          to_name: email.templateData.to_name,
          from_name: email.templateData.from_name,
          message: email.templateData.message,
        };

        await emailjs.send(serviceID, templateID, templateParams, userID);
      }

      setSuccessMessage('Emails sent successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to send emails. Please check the configuration and try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleSaveCommonFields = () => {
    if (commonSubject || commonMessage) {
      const updatedList = emailList.map((email) => ({
        ...email,
        subject: commonSubject || email.subject,
        templateData: {
          ...email.templateData,
          message: commonMessage || email.templateData.message,
        },
      }));
      setEmailList(updatedList);
      setSuccessMessage('Common subject and message set for all recipients!');
      setShowCommonFields(false); // Hide fields after saving
      setIsEditingCommonFields(true); // Hide edit state after saving
    } else {
      setError('Please enter at least a subject or message to set.');
    }
  };

  const handleEditCommonFields = () => {
    setIsEditingCommonFields(false);
    setShowCommonFields(true);
  };

  const handleEditRecipient = (index: number) => {
    const emailToEdit = emailList[index];
    setNewEmail(emailToEdit.to_email);
    setNewName(emailToEdit.templateData.to_name);
    handleRemoveRecipient(index); // Temporarily remove to allow re-adding after edit
  };

  return (
    <div className="grid-container">
      <h2>
        <FaEnvelope /> Send Dynamic Emails
      </h2>

      {error && <p className="callout alert">{error}</p>}
      {successMessage && <p className="callout success">{successMessage}</p>}

      <div className="grid-x grid-padding-x">
        <div className="medium-6 cell">
          <label>
            Email:
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter recipient email"
              required
            />
          </label>
        </div>
        <div className="medium-6 cell">
          <label>
            Name:
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter recipient name"
              required
            />
          </label>
        </div>
      </div>

      <button className="button" onClick={handleAddRecipient} disabled={isSending}>
        <FaPlus /> Add Recipient
      </button>

      {showCommonFields && (
        <div className="grid-x grid-padding-x" style={{ marginTop: '20px' }}>
          <div className="medium-12 cell">
            <label>
              From Name:
              <input
                type="text"
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                placeholder="Enter sender's name"
              />
            </label>
          </div>
          <div className="medium-12 cell">
            <label>
              Common Subject:
              <input
                type="text"
                value={commonSubject}
                onChange={(e) => setCommonSubject(e.target.value)}
                placeholder="Enter your common subject for all recipients"
              />
            </label>
          </div>
          <div className="medium-12 cell">
            <label>
              Common Message:
              <textarea
                value={commonMessage}
                onChange={(e) => setCommonMessage(e.target.value)}
                placeholder="Enter your common message for all recipients"
                rows={3}
              />
            </label>
          </div>
          <button className="button" onClick={handleSaveCommonFields}>
            Save Common Fields
          </button>
        </div>
      )}

      {isEditingCommonFields  && (
        <div className="grid-x grid-padding-x" style={{ marginTop: '20px' }}>
          <div className="medium-12 cell">
            <button className="button" onClick={handleEditCommonFields}>
              <FaEdit /> Edit Common Fields
            </button>
          </div>
        </div>
      )}

      <div>
        <h3>Preview Emails:</h3>
        <ul className="callout">
          {emailList.map((email, index) => (
            <li key={index} className="grid-x grid-padding-x">
              <div className="medium-8 cell">
                <strong>To:</strong> {email.to_email}, <strong>Subject:</strong> {email.subject}, <strong>From:</strong> {email.templateData.from_name}, <strong>Message:</strong> {email.templateData.message}
              </div>
              <div className="medium-4 cell text-right">
                <button className="button alert" onClick={() => handleRemoveRecipient(index)}>
                  <FaTrash /> Remove
                </button>
                <button className="button" onClick={() => handleEditRecipient(index)}>
                  <FaEdit /> Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="button success"
        onClick={sendEmails}
        disabled={isSending || emailList.length === 0}
        style={{ marginTop: '20px' }}
      >
        <FaPaperPlane /> {isSending ? 'Sending...' : 'Send Emails'}
      </button>
    </div>
  );
};

export default EmailSender;
