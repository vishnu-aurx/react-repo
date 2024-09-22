import React from 'react';
import './component-css/DrReport.css';

interface Medicine {
  medicineName: string;
  timeToUse: string;
  dose: string;
}

interface Test {
  testName: string;
  testResult: string;
  testUnit: string;
}

interface Treatment {
  type: string;
  medicines: Medicine[];
}

interface PathologyReport {
  tests: Test[];
  report: string;
}

interface DrReportProps {
  doctorName: string;
  patientName: string;
  disease: string;
  treatment: Treatment;
  pathologyReport: PathologyReport;
  duration: string;
  appointmentDate: string;
  address: string;
}

const DrReport: React.FC<DrReportProps> = ({
  doctorName,
  patientName,
  disease,
  treatment,
  pathologyReport,
  duration,
  appointmentDate,
  address,
}) => {
  return (
    <div className='report'><div className="dr-report">
      <div className="report-info">
        <h2 className="section-title">Doctor Report</h2>
        <div className="report-item">
          <strong>Doctor's Name:</strong> <span>{doctorName}</span>
        </div>
        <div className="report-item">
          <strong>Patient's Name:</strong> <span>{patientName}</span>
        </div>
        <div className="report-item">
          <strong>Disease:</strong> <span>{disease}</span>
        </div>
        <div className="report-item">
          <strong>Duration of Treatment:</strong> <span>{duration}</span>
        </div>
        <div className="report-item">
          <strong>Appointment Date:</strong> <span>{appointmentDate}</span>
        </div>
        <div className="report-item">
          <strong>Address:</strong> <span>{address}</span>
        </div>
      </div>
      <div className="treatment-info">
        <h3 className="section-title">Treatment Details</h3>
        <div className="report-item">
          <strong>Type:</strong> <span>{treatment.type}</span>
        </div>
        {treatment.medicines.map((medicine, index) => (
          <div key={index} className="medicine-item">
            <div className="report-item">
              <strong>Medicine Name:</strong> <span>{medicine.medicineName}</span>
            </div>
            <div className="report-item">
              <strong>Time to Use:</strong> <span>{medicine.timeToUse}</span>
            </div>
            <div className="report-item">
              <strong>Dose:</strong> <span>{medicine.dose}</span>
            </div>
          </div>
        ))}
      </div>
    </div><div className="pathology-report">
        <h3 className="section-title">Pathology Report</h3>
        {pathologyReport.tests.map((test, index) => (
          <div key={index} className="test-item">
            <div className="report-item">
              <strong>Test Name:</strong> <span>{test.testName}</span>
            </div>
            <div className="report-item">
              <strong>Test Result:</strong> <span>{test.testResult}</span>
            </div>
            <div className="report-item">
              <strong>Test Unit:</strong> <span>{test.testUnit}</span>
            </div>
          </div>
        ))}
        <div className="report-item">
          <strong>Report:</strong> <span>{pathologyReport.report}</span>
        </div>
        <div className="pdf-attachment">
    <strong>Attached Report:</strong>
 
      <a href="src\assets\pathology-report.pdf" target="_blank" rel="noopener noreferrer">
        <i className="fas fa-file-pdf" /> View PDF
      </a>
 
  </div>
      </div></div>
  );
};

export default DrReport;