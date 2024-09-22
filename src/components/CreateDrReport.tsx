import React, { useState, useEffect } from 'react';
import './component-css/CreateDrReport.css';
import axios from 'axios';
import MedicineInput from './MedicineInput';

interface CreateDrReportProps {
  doctorName?: string;
  patientName?: string;
  disease?: string;
  appointmentDate?: string;
  drAddress?:string;
  pathologyTest?:string;
  testResult?:string;
  onClose?: () => void;
}

const CreateDrReport: React.FC<CreateDrReportProps> = ({
  doctorName: doctorNameProp,
  patientName: patientNameProp,
  disease: diseaseProp,
  appointmentDate: appointmentDateProp,
  drAddress,
  pathologyTest,
  testResult:testResult,
  onClose,
}) => {
  // Initialize state with props if provided, otherwise fallback to empty strings 
  const [doctorName, setDoctorName] = useState(doctorNameProp || '');
  const [patientName, setPatientName] = useState(patientNameProp || '');
  const [disease, setDisease] = useState(diseaseProp || '');
  const [address, setAddress] = useState(drAddress || '');
  const [pathologyTestName, setPathologyTestName] = useState(pathologyTest||'');
  const [pathologyTestResult, setPathologyTestResult] = useState(testResult||'');
  const [pathologyTestUnit, setPathologyTestUnit] = useState('');
  const [pathologyReport, setPathologyReport] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [appointmentDate, setAppointmentDate] = useState(appointmentDateProp || '');

  // Update state when props change
  useEffect(() => {
    if (doctorNameProp) setDoctorName(doctorNameProp);
    if (patientNameProp) setPatientName(patientNameProp);
    if (diseaseProp) setDisease(diseaseProp);
    if (appointmentDateProp) setAppointmentDate(appointmentDateProp);
  }, [doctorNameProp, patientNameProp, diseaseProp, appointmentDateProp]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const reportData = {
      doctorName,
      patientName,
      disease,
      address,
      pathologyReport: {
        tests: [
          {
            testName: pathologyTestName,
            testResult: pathologyTestResult,
            testUnit: pathologyTestUnit,
          },
        ],
        report: pathologyReport,
        attachment: attachment,
      },
      appointmentDate,
    };

    const formData = new FormData();
    formData.append('report', JSON.stringify(pathologyReport));
    if (attachment) {
      formData.append('attachment', attachment);
    }

    try {
      const response = await axios.post('/api/reports', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Report submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  return (
    <div className="global-container create-dr-report">
  <button className="button alert float-right" onClick={onClose}>
    &times;
  </button>
  <h2 className="text-center">Create Doctor Report</h2>
  <div className="grid-x grid-margin-x">
    {/* Section 1: Doctor, Patient Info, and Pathology */}
    <div className="cell">
      <form
        className="callout"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Doctor and Patient Info */}
        <div className="grid-x grid-margin-x">
          <div className="cell large-6">
            <label htmlFor="doctorName">Doctor's Name:</label>
            <input
              type="text"
              id="doctorName"
              className="input-group-field"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              required
            />
          </div>

          <div className="cell large-6">
            <label htmlFor="patientName">Patient's Name:</label>
            <input
              type="text"
              id="patientName"
              className="input-group-field"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid-x grid-margin-x">
          <div className="cell large-6">
            <label htmlFor="disease">Disease:</label>
            <input
              type="text"
              id="disease"
              className="input-group-field"
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              required
            />
          </div>

          <div className="cell large-6">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              className="input-group-field"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Pathology Report Section */}
        <div className="grid-x grid-margin-x">
          <div className="cell large-6">
            <label htmlFor="pathologyTestName">Pathology Test Name:</label>
            <input
              type="text"
              id="pathologyTestName"
              className="input-group-field"
              value={pathologyTestName}
              onChange={(e) => setPathologyTestName(e.target.value)}
            />
          </div>

          <div className="cell large-6">
            <label htmlFor="pathologyTestResult">Pathology Test Result:</label>
            <input
              type="text"
              id="pathologyTestResult"
              className="input-group-field"
              value={pathologyTestResult}
              onChange={(e) => setPathologyTestResult(e.target.value)}
            />
          </div>
        </div>

        <div className="grid-x grid-margin-x">
          <div className="cell large-6">
            <label htmlFor="attachment">Attach File:</label>
            <input
              type="file"
              id="attachment"
              className="input-group-field"
              onChange={handleFileChange}
            />
          </div>

          <div className="cell large-6">
            <label htmlFor="appointmentDate">Appointment Date:</label>
            <input
              type="date"
              id="appointmentDate"
              className="input-group-field"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="button primary">
          Submit Report
        </button>
      </form>
    </div>

    {/* Section 2: Medicine and Treatment */}
    <div className="cell">
      <form>
        <MedicineInput />
      </form>
    </div>
  </div>
</div>

  );
};

export default CreateDrReport;
