import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/images/fitbuddy.png';

function BodyFatCalculator() {
  const authToken = localStorage.getItem('authToken');

  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [hip, setHip] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, title:'', message: '', type: '' });

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleToast = (title, message, type) => {
    setToast({ show: true, title, message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(age, gender, height, weight, waist, neck, hip);

    if (!age || !gender || !height || !weight || !waist || !neck || (gender === 'female' && !hip)) {
      handleToast('Error', 'Please fill in all required fields', 'danger');
      // handleToast('Your Fat Percentage', '25.45', 'success'); // testing purpose
      return;
    }

    // Start loading spinner
    setLoading(true);

    // Simulate a delay to see the spinner
    setTimeout(async () => {
      try {
        const response = await axios.post(
          'http://localhost:8080/api/user/fat-percentage',
          {
            gender,
            age: parseInt(age),
            height: parseFloat(height),
            weight: parseFloat(weight),
            waist: parseFloat(waist),
            neck: parseFloat(neck),
            hip: gender === 'female' ? parseFloat(hip) : null,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        );

        // Stop loading spinner
        setLoading(false);

        // Show the result in a toast
        const bodyFatPercentage = parseFloat(response.data).toFixed(2);
        console.log(response.data);
        console.log(bodyFatPercentage);
        handleToast('Your Fat Percentage', bodyFatPercentage, 'success');

        // Store the result in localStorage
        localStorage.setItem('bodyFat', bodyFatPercentage);
        clearFields();

      } catch (error) {
        setLoading(false);
        handleToast('Error', 'There was an error calculating the body fat percentage', 'error');
      }
    }, 500); // Simulating a delay for loading spinner
  };

  const clearFields = () => {
    setGender('');
    setAge('');
    setHeight('');
    setWeight('');
    setWaist('');
    setNeck('');
    setHip('');
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Metrics/</span> Body Fat Calculator</h4>
      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Body Fat Calculator</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <label className="col-sm-1 col-form-label">Gender</label>
                  <div className="col-sm-3">
                    <select className="form-select" value={gender} onChange={handleGenderChange} disabled={loading}>
                      <option selected disabled value="">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <label className="col-sm-1 col-form-label">Age</label>
                  <div className="col-sm-3">
                    <div className="input-group input-group-merge">
                      <span className="input-group-text"><i className="bx bx-user"></i></span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <label className="col-sm-1 col-form-label">Height</label>
                  <div className="col-sm-3">
                    <div className="input-group input-group-merge">
                      <span className="input-group-text"><i className="bx bx-ruler"></i></span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        disabled={loading}
                      />
                      <span className="input-group-text">cm</span>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-sm-1 col-form-label">Weight</label>
                  <div className="col-sm-3">
                    <div className="input-group input-group-merge">
                      <span className="input-group-text"><i className="bx bx-dumbbell"></i></span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        disabled={loading}
                      />
                      <span className="input-group-text">kg</span>
                    </div>
                  </div>

                  <label className="col-sm-1 col-form-label">Waist</label>
                  <div className="col-sm-3">
                    <div className="input-group input-group-merge">
                      <span className="input-group-text"><i className="bx bx-body"></i></span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Waist"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        disabled={loading}
                      />
                      <span className="input-group-text">cm</span>
                    </div>
                  </div>

                  <label className="col-sm-1 col-form-label">Neck</label>
                  <div className="col-sm-3">
                    <div className="input-group input-group-merge">
                      <span className="input-group-text"><i className="bx bx-male"></i></span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Neck"
                        value={neck}
                        onChange={(e) => setNeck(e.target.value)}
                        disabled={loading}
                      />
                      <span className="input-group-text">cm</span>
                    </div>
                  </div>
                </div>

                {gender === 'female' && (
                  <div className="row mb-3">
                    <label className="col-sm-1 col-form-label">Hip</label>
                    <div className="col-sm-3">
                      <div className="input-group input-group-merge">
                        <span className="input-group-text"><i className="bx bx-female"></i></span>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Hip"
                          value={hip}
                          onChange={(e) => setHip(e.target.value)}
                          disabled={loading}
                        />
                        <span className="input-group-text">cm</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="row justify-content-end">
                  <div className="col-sm-1.5">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      Calculate
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

{/* Full-page spinner */}
{loading && (
  <div className="spinner-overlay">
    <div className="spinner-container">
      <img src={logo} alt="App Logo" className="app-logo" />
      <div className="spinner-border spinner-border-lg text-primary" role="status"></div>
    </div>
  </div>
)}

      
{/* Toast Notifications */}
{toast.show && (
  <>
    {/* Error Toast (Top Right) */}
    {toast.type === 'danger' && (
      <div 
        className="bs-toast toast fade show bg-danger" 
        style={{ 
          position: 'fixed', 
          top: '20px', 
          right: '20px', 
          zIndex: '1050' 
        }} 
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
      >
        <div className="toast-header">
          <i className="bx bx-bell me-2"></i>
          <div className="me-auto fw-semibold">Error</div>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setToast({ show: false, message: '', type: '' })}></button>
        </div>
        <div className="toast-body">
          {toast.message}
        </div>
      </div>
    )}
    
    {/* Success Toast (Center Middle) */}
    {toast.type === 'success' && (

<div className="row">
        <div className="row mb-3">
        <div 
        className="bs-toast toast fade show" 
        style={{ 
          height: '200px',
          width: '60%',
          paddingTop: '5px',
          marginLeft:'230px',
          backgroundColor: '#167db3',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1);'
        }} 
      >
        <div className="toast-header" style={{textAlign: 'center', display: 'block' }}>
          <div className="me-auto " style={{fontSize: '30px', color: 'rgb(232 243 251)'}}><hr/>
            {toast.title} <br/>
            <span style={{ fontSize: '25px'}}>{toast.message}%</span>
          </div><hr/>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setToast({ show: false, message: '', type: '' })}></button>
          
         </div>
      </div>
        </div>
    </div>  


    )}
  </>
)}




    </div>
  );
}

export default BodyFatCalculator;
