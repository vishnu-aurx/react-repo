import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CreateDrReport from "./CreateDrReport"; 
import "./component-css/Carousel3D.css"
interface PathologyTest {
  testName: string;
  testResult: string;
  testUnit: string;
}

interface PathologyReport {
  tests: PathologyTest[];
  report: string;
  attachment: Record<string, any>;
}

interface Appointment {
  patientName: string;
  disease: string;
  address: string;
  pathologyReport: PathologyReport;
  appointmentDate: string;
}

interface Carousel3DProps {
  appointments: Appointment[];
}

const Carousel3D: React.FC<Carousel3DProps> = ({ appointments }) => {
  const [showCreateDrReport, setShowCreateDrReport] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<Appointment>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = React.useRef<Slider>(null); // To reference the slider component
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    autoplay: true,
    beforeChange: (current: number, next: number) => {
      setActiveSlide(next);
      setCurrentSlide(next);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handlePrevious = () => {
    sliderRef.current?.slickPrev();
    setShowCreateDrReport(false);
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
    setShowCreateDrReport(false);
  };

  const handleShowMoreDetails = (appointment: Appointment, index: number) => {
    setShowCreateDrReport(true);
    setCurrentAppointment(appointment);
    setCurrentSlide(index);
  };

  const handleCloseDrReport = async () => {
    setShowCreateDrReport(false);
    await new Promise((resolve) => setTimeout(resolve, 100)); 
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentSlide);
    }
  };

  return (
    <div className="carousel-3d-wrapper grid-x align-middle" style={{ minHeight: '500px' }}>
      {!showCreateDrReport ? (
        <div className="cell auto text-center">
          <button className="prev-button" onClick={handlePrevious}>
            &lt;
          </button>
          <Slider ref={sliderRef} {...settings}>
            {appointments.map((appointment, index) => (
              <div
                key={index}
                className={`carousel-slide ${index === activeSlide ? "active" : "blurred"}`}
              >
                <div className="appointment-card">
                  <h3>{appointment.patientName}</h3>
                  <p>
                    <strong>Disease:</strong> {appointment.disease}
                  </p>
                  <p>
                    <strong>Appointment Date:</strong> {appointment.appointmentDate}
                  </p>
                  <p>
                    <strong>Patient's Address:</strong> {appointment.address}
                  </p>
                  <button
                    onClick={() => handleShowMoreDetails(appointment, index)}
                    className="show-more-button"
                  >
                    Show More Details
                  </button>
                </div>
              </div>
            ))}
          </Slider>
          <button className="next-button" onClick={handleNext}>
            &gt;
          </button>
        </div>
      ) : (
        <div className="carousel-container grid-x align-middle align-center">
          <div className="cell auto text-center p-3">
            <div className="callout">
              <CreateDrReport
                patientName={currentAppointment?.patientName}
                disease={currentAppointment?.disease}
                appointmentDate={currentAppointment?.appointmentDate}
                drAddress={currentAppointment?.address}
                pathologyTest={currentAppointment?.pathologyReport.tests[0]?.testName}
                testResult={currentAppointment?.pathologyReport.tests[0]?.testResult}
                onClose={handleCloseDrReport}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel3D;
