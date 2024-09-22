import React, { useState } from 'react';
import axios from 'axios';
// import './component-css/MedicineInput.css';
import { PiFirstAidFill } from 'react-icons/pi';
import { TiMinus } from 'react-icons/ti';

interface MedicineTreatment {
  medicineName: string;
  timeToUse: string;
  dose: string;
}

const MedicineInput: React.FC = () => {
  const [medicines, setMedicines] = useState<MedicineTreatment[]>([
    { medicineName: '', timeToUse: '', dose: '' },
  ]);
  const [suggesionAndNotes, setSuggesionAndNotes] = useState('');
  const [duration, setDuration] = useState('');



  const handleMedicineChange = (
    index: number,
    field: keyof MedicineTreatment,
    value: string
  ) => {
    const updatedMedicines = medicines.map((medicine, i) =>
      i === index ? { ...medicine, [field]: value } : medicine
    );
    setMedicines(updatedMedicines);
  };

  const addMedicineField = () => {
    setMedicines([...medicines, { medicineName: '', timeToUse: '', dose: '' }]);
  };

  const removeMedicineField = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const medicineOptions = [
    'Paracetamol',
    'Ibuprofen',
    'Amoxicillin',
    'Metformin',
    'Aspirin',
  ];

  const handleSubmit = async () => {
    const treatmentData = {
      medicines,
      suggesionAndNotes: suggesionAndNotes,
      duration,
    };
console.log(treatmentData)
    try {
      const response = await axios.post('YOUR_API_ENDPOINT', treatmentData);
      console.log('Response:', response.data);
      // You can handle the success or response here
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle any errors here
    }
  };

  return (
    <div className="callout">
    {medicines.map((medicine, index) => (
      <div key={index} className="grid-x grid-margin-x">
        <div className="cell auto">
          <div className="grid-x grid-margin-x">
            <div className="cell large-4">
              <label htmlFor={`medicineName-${index}`}>Medicine Name:</label>
              <select
                id={`medicineName-${index}`}
                className="input-group-field"
                value={medicine.medicineName}
                onChange={(e) => handleMedicineChange(index, 'medicineName', e.target.value)}
              >
                <option value="">Select a medicine</option>
                {medicineOptions.map((medicineOption) => (
                  <option key={medicineOption} value={medicineOption}>
                    {medicineOption}
                  </option>
                ))}
              </select>
            </div>
            <div className="cell large-4">
              <label htmlFor={`timeToUse-${index}`}>Time to Use:</label>
              <input
                type="text"
                id={`timeToUse-${index}`}
                className="input-group-field"
                value={medicine.timeToUse}
                onChange={(e) => handleMedicineChange(index, 'timeToUse', e.target.value)}
              />
            </div>
            <div className="cell large-4">
              <label htmlFor={`dose-${index}`}>Dose:</label>
              <input
                type="text"
                id={`dose-${index}`}
                className="input-group-field"
                value={medicine.dose}
                onChange={(e) => handleMedicineChange(index, 'dose', e.target.value)}
              />
            </div>
          </div>
          <div className="text-right">
            <button
              className="button alert"
              type="button"
              onClick={() => removeMedicineField(index)}
            >
              <TiMinus />
            </button>
          </div>
        </div>
      </div>
    ))}
  
    <div className="text-center">
      <button
        type="button"
        className="button primary"
        onClick={addMedicineField}
      >
        <PiFirstAidFill />
      </button>
    </div>
  
    <div className="grid-x grid-margin-x">
      <div className="cell">
        <label htmlFor="suggesionAndNotes">Suggestion and Notes:</label>
        <textarea
          id="suggesionAndNotes"
          className="input-group-field"
          value={suggesionAndNotes}
          onChange={(e) => setSuggesionAndNotes(e.target.value)}
          required
        />
      </div>
    </div>
  
    <div className="grid-x grid-margin-x">
      <div className="cell">
        <label htmlFor="duration">Duration of Treatment:</label>
        <input
          type="text"
          id="duration"
          className="input-group-field"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>
    </div>
  
    <div className="text-center">
      <button type="button" className="button primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  </div>
  
  );
};

export default MedicineInput;
