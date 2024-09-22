import React, { useState } from 'react';
import CreateDrReport from './CreateDrReport'; // Import the CreateDrReport component
import Carousel3D from './Carousel3D'; // Import the 3D Carousel component
import "./component-css/ManageAppointments.css";

interface PathologyTest {
  testName: string;
  testResult: string;
  testUnit: string;
}

interface PathologyReport {
  tests: PathologyTest[];
  report: string;
  attachment: Record<string, any>; // You can specify the type more precisely if needed
}

interface Appointment {
  patientName: string;
  disease: string;
  address: string;
  pathologyReport: PathologyReport;
  appointmentDate: string;
}

interface ManageAppointmentsProps {
  doctorName: string;
  appointments: Appointment[];
}

interface AppointmentDetailsProps {
  doctorName?: string;
  patientName?: string;
  disease?: string;
  appointmentDate?: string;
  drAddress?: string;
  pathologyTest?: string;
  testResult?: string;
}

const ManageAppointments: React.FC<ManageAppointmentsProps> = ({ doctorName, appointments }) => {
  const [currentAppointmentIndex, setCurrentAppointmentIndex] = useState(0);
  const [showCreateDrReport, setShowCreateDrReport] = useState(false); // State to toggle CreateDrReport component

  const currentAppointment = appointments[currentAppointmentIndex];
  
  const reportProps: AppointmentDetailsProps = {
    doctorName: doctorName,
    patientName: currentAppointment.patientName,
    disease: currentAppointment.disease,
    appointmentDate: currentAppointment.appointmentDate,
    drAddress: currentAppointment.address,
    pathologyTest: currentAppointment.pathologyReport.tests[0]?.testName,
    testResult: currentAppointment.pathologyReport.tests[0]?.testResult,
  };

  const handleSelectAppointment = (index: number) => {
    setCurrentAppointmentIndex(index);
    setShowCreateDrReport(false); // Reset when switching appointments
  };

  return (
    <div className="manage-appointments-container">
       {/* Carousel Component */}
      <div className="appointment-details-container">
        {!showCreateDrReport ? (
          <div className="appointment-section">
            <div className="patient-info">
              <h2>Patient: {currentAppointment.patientName}</h2>
              <div className="appointment-details">
                <p><strong>Disease:</strong> {currentAppointment.disease}</p>
                <p><strong>Appointment Date:</strong> {currentAppointment.appointmentDate}</p>
                <p><strong>Patient's Address:</strong> {currentAppointment.address}</p>
                <button onClick={() => setShowCreateDrReport(true)} className="show-more-button">
                  Show More Details
                </button>
              </div>
            </div>
            <div className="doctor-info">
              <h3>Doctor: {doctorName}</h3>
              <img src="/path/to/doctor-photo.jpg" alt="Doctor's Profile" className="doctor-profile-photo" />
            </div>
          </div>
        ) : (
          <CreateDrReport {...reportProps} />
        )}
        <div className="appointment-navigation">
          <button 
            onClick={() => handleSelectAppointment(currentAppointmentIndex - 1)} 
            disabled={currentAppointmentIndex === 0}
          >
            Previous
          </button>
          <button 
            onClick={() => handleSelectAppointment(currentAppointmentIndex + 1)} 
            disabled={currentAppointmentIndex === appointments.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageAppointments;
