import React, { useState, useEffect } from 'react';
import './component-css/DrReportsList.css';
import DrReport from './DrReport';

const DrReportsList: React.FC = () => {
  const [visibleReports, setVisibleReports] = useState(2);

  const reportsData = [
    {
      doctorName: "Smith",
      patientName: "John",
      disease: "Flu",
      address: "sunsaan gali purani haweli ke piche deshi sarab ki dunkan ke uper faltu colony fokat nagar indore",
      treatment: {
        type: "Medication",
        medicines: [
          {
            medicineName: "Oseltamivir",
            timeToUse: "Twice a day",
            dose: "75mg",
          },
          {
            medicineName: "Amantadine",
            timeToUse: "Once a day",
            dose: "100mg",
          },
        ],
      },
      pathologyReport: {
        tests: [
          {
            testName: "Blood Test",
            testResult: "Normal",
            testUnit: "mg/dL",
          },
          {
            testName: "Urine Test",
            testResult: "Abnormal",
            testUnit: "mg/dL",
          },
        ],
        report: "The patient is suffering from flu.",
      },
      duration: "1 week",
      appointmentDate: "2024-09-01",
    },
    {
      doctorName: "Doe",
      patientName: "Jane",
      disease: "Cold",
      address: "sunsaan gali purani haweli ke piche deshi sarab ki dunkan ke uper faltu colony fokat nagar indore",
      treatment: {
        type: "Rest",
        medicines: [],
      },
      pathologyReport: {
        tests: [],
        report: "The patient is suffering from cold.",
      },
      duration: "3 days",
      appointmentDate: "2024-09-02",
    },
    {
      doctorName: "Adams",
      patientName: "Mike",
      disease: "Fever",
      address: "sunsaan gali purani haweli ke piche deshi sarab ki dunkan ke uper faltu colony fokat nagar indore",
      treatment: {
        type: "Medication",
        medicines: [
          {
            medicineName: "Acetaminophen",
            timeToUse: "Three times a day",
            dose: "500mg",
          },
          {
            medicineName: "Ibuprofen",
            timeToUse: "Every 4 hours",
            dose: "200mg",
          },
        ],
      },
      pathologyReport: {
        tests: [
          {
            testName: "Blood Test",
            testResult: "High",
            testUnit: "mg/dL",
          },
        ],
        report: "The patient is suffering from fever.",
      },
      duration: "5 days",
      appointmentDate: "2024-09-03",
    },
    {
      doctorName: "Brown",
      patientName: "Sara",
      disease: "Asthma",
      address: "sunsaan gali purani haweli ke piche deshi sarab ki dunkan ke uper faltu colony fokat nagar indore",
      treatment: {
        type: "Inhaler",
        medicines: [
          {
            medicineName: "Albuterol",
            timeToUse: "As needed",
            dose: "2 puffs",
          },
        ],
      },
      pathologyReport: {
        tests: [
          {
            testName: "Lung Function Test",
            testResult: "Abnormal",
            testUnit: "L/min",
          },
        ],
        report: "The patient is suffering from asthma.",
      },
      duration: "1 month",
      appointmentDate: "2024-09-04",
    },
    {
      doctorName: "Lee",
      patientName: "Chris",
      disease: "Allergy",
      address: "sunsaan gali purani haweli ke piche deshi sarab ki dunkan ke uper faltu colony fokat nagar indore",
      treatment: {
        type: "Antihistamines",
        medicines: [
          {
            medicineName: "Diphenhydramine",
            timeToUse: "Once a day",
            dose: "25mg",
          },
          {
            medicineName: "Loratadine",
            timeToUse: "Once a day",
            dose: "10mg",
          },
        ],
      },
      pathologyReport: {
        tests: [],
        report: "The patient is suffering from allergy.",
      },
      duration: "2 weeks",
      appointmentDate: "2024-09-05",
    },
  ]; 

  const showMoreReports = () => {
    setVisibleReports((prev) => prev + 3);
  };

  useEffect(() => {
    const reportElements = document.querySelectorAll('.dr-report');
    reportElements.forEach((element, index) => {
      if (index < visibleReports) {
        setTimeout(() => {
          element.classList.add('visible');
        }, index * 200); // Stagger animation
      }
    });
  }, [visibleReports]);

  return (
    <div className="dr-reports-list">
      {reportsData.slice(0, visibleReports).map((report, index) => (
       <DrReport
       key={index}
       doctorName={report.doctorName}
       patientName={report.patientName}
       disease={report.disease}
       treatment={report.treatment}
       duration={report.duration}
       appointmentDate={report.appointmentDate}
       address={report.address}
       pathologyReport={report.pathologyReport} // Add this line
     />
      ))}
      {visibleReports < reportsData.length && (
        <button className="see-more-btn" onClick={showMoreReports}>
          See More
        </button>
      )}
    </div>
  );
};

export default DrReportsList;
