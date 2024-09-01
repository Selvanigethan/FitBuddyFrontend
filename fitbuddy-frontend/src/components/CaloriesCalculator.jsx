import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/images/fitbuddy.png';

function CaloriesCalculator() {
  const authToken = localStorage.getItem('authToken');

  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, title: '', message: '', type: '' });

  const handleToast = (title, message, type) => {
    setToast({ show: true, title, message, type });
    // setTimeout(() => {
    //   setToast({ show: false, title:'', message: '', type: '' });
    // }, 6000); // Hide toast after 6 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(age, gender, height, weight, activityLevel);

    // Validation
    if (!age || !height || !weight || !activityLevel || !gender) {
      handleToast('Error', 'Please fill in all required fields', 'danger');
      // handleToast('BMR value~TEEE value', '1400.0~2170.0', 'success'); // testing purpose
      return;
    }

    // Start loading spinner
    setLoading(true);

    // Simulate a delay to see the spinner
    setTimeout(async () => {
      try {
        const response = await axios.post(
          'http://localhost:8080/api/user/calories',
          {
            gender,
            age: parseInt(age),
            height: parseFloat(height),
            weight: parseFloat(weight),
            activityLevel
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        );

        // Stop loading spinner
        setLoading(false);

        // Show the results in a toast
        const bmr = parseFloat(response.data.bmr).toFixed(2);
        const teee = parseFloat(response.data.teee).toFixed(2);
        console.log(response.data);
        console.log(bmr + '~' + teee);
        handleToast('Basal Metabolic Rate (BMR)~Total Energy Expenditure (TEE)', bmr + '~' + teee, 'success');

        // Store the result in localStorage
        localStorage.setItem('bmr', bmr);
        localStorage.setItem('teee', teee);
        clearFields();

      } catch (error) {
        setLoading(false);
        handleToast('Error', 'There was an error calculating the calories', 'error');
      }
    }, 500); // Simulating a delay for loading spinner
  };

  const clearFields = () => {
    setGender('');
    setAge('');
    setHeight('');
    setWeight('');
    setActivityLevel('');
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Metrics/</span> Calories Calculator</h4>
      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Calories Calculator</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <label className="col-sm-1 col-form-label">Gender</label>
                  <div className="col-sm-3">
                    <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)} disabled={loading}>
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

                   <label class="col-sm-1 col-form-label" for="basic-icon-default-fullname">Activity Level</label>
                  <div class="col-sm-3">
                    <select class="form-select" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} disabled={loading}>
                          <option selected disabled value="">Activity Level</option>
                          <option value="sedentary">Sedentary</option>
                          <option value="lightly active">Lightly Active</option>
                          <option value="moderately active">Moderately Active</option>
                          <option value="very active">Very Active</option>
                          <option value="super active">Super Active</option>
                    </select>
                  </div>
      
                </div>

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
          <div className="me-auto fw-semibold"> {toast.title}</div>
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
          height: '260px',
          width: '60%',
          paddingTop: '5px',
          marginLeft:'230px',
          backgroundColor: '#167db3',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1);'
        }} 
      >
        <div className="toast-header" style={{textAlign: 'center', display: 'block' }}>
          <div className="me-auto" style={{fontSize: '28px', color: 'rgb(232 243 251)'}}>
            {toast.title.split('~')[0]} <br/>
            <span style={{ fontSize: '24px'}}> {toast.message.split('~')[0]} kcal</span> <br/><hr/>

            {toast.title.split('~')[1]} <br/>
            <span style={{ fontSize: '24px'}}> {toast.message.split('~')[1]} kcal</span>
          </div>
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

export default CaloriesCalculator;
