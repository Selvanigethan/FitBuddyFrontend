import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/images/fitbuddy.png';

function Suggestions() {
  const authToken = localStorage.getItem('authToken');

  const [cravings, setCravings] = useState('');
  const [lackOfDiscipline, setLackOfDiscipline] = useState('');
  const [partying, setPartying] = useState('');
  const [favoriteFood, setFavoriteFood] = useState('');
  const [suggestData, setSuggestData] = useState(null); 

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, title: '', message: '', type: '' });

  const handleToast = (title, message, type) => {
    setToast({ show: true, title, message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(cravings, lackOfDiscipline, partying, favoriteFood);
    console.log(authToken);

    // Validation
    if (!cravings || !lackOfDiscipline || !partying || !favoriteFood) {
      handleToast('Error', 'Please fill in all required fields', 'danger');
      // handleToast('BMR value~TEEE value', '1400.0~2170.0', 'success'); // testing purpose
      return;
    }

    // Start loading spinner
    setLoading(true);

    // Simulate a delay to see the spinner
    setTimeout(async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/user/diet-cheat-suggestions',
          {
            "cheatReasonsAndCount": {
              "cravings": 10,
              "lackOfDiscipline": 0,
              "partying": 0,
              "favoriteFood": 0
            }
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            }
          }
        );

        // Stop loading spinner
        setLoading(false);
        console.log(response.data);
        setSuggestData(response.data);
        clearFields();

      } catch (error) {
        setLoading(false);
        handleToast('Error', 'There was an error generating suggestions', 'error');
      }
    }, 500); // Simulating a delay for loading spinner
  };

  const clearFields = () => {
    setCravings('');
    setLackOfDiscipline('');
    setFavoriteFood('');
    setPartying('');
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Suggestions & Insights/</span> Suggestions</h4>
      <div className="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
                  <div class="card mb-4">
                    <div class="card-body">
                    <form onSubmit={handleSubmit}>

                      <h5 class="fw-semibold d-block">Select the reasons for your last 10 cheat meal days.</h5>
                      {/* <span>(The total count of days should equal to 10)</span> */}
                      {/* <br/><br/><br/> */}

                      <div class="input-group">
                        <span class="input-group-text" style={{ width: '30%', color:'white', backgroundColor: '#167db3'}}>Cravings</span>
                        <input type="number" class="form-control"                       
                        value={cravings}
                        onChange={(e) => setCravings(e.target.value)}/>
                      </div>
                      <br/>
                      <div class="input-group">
                        <span class="input-group-text" style={{ width: '30%', color:'white', backgroundColor: '#167db3'}}>Lack Of Discipline</span>
                        <input type="number" class="form-control"
                        value={lackOfDiscipline}
                        onChange={(e) => setLackOfDiscipline(e.target.value)}/>
                      </div>
                      <br/>
                      <div class="input-group">
                        <span class="input-group-text" style={{ width: '30%', color:'white', backgroundColor: '#167db3'}}>Partying</span>
                        <input type="number" class="form-control"
                        value={partying}
                        onChange={(e) => setPartying(e.target.value)}/>
                      </div>
                      <br/>
                      <div class="input-group">
                        <span class="input-group-text" style={{ width: '30%', color:'white', backgroundColor: '#167db3'}}>Favorite Food</span>
                        <input type="number" class="form-control"
                         value={favoriteFood}
                         onChange={(e) => setFavoriteFood(e.target.value)}/>
                      </div>

                      <div className="row justify-content-end">
                    
                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '50px' }}>
                      Generate Suggestions
                    </button>
                    </div>
                    </form>
                    
                    </div>
                  </div>
        </div>
        <div class="col-md-3"></div>
      </div>

      <div className="row">
        <div class="col-md-12">
                  <div class="card mb-4">
                    <div class="card-body">
                    {suggestData ? (
                        suggestData.suggested_actions.map((action, index) => (
                          <li key={index}>{action}</li>
                        ))
                        ) : (
                            <></>
                        )}
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

export default Suggestions;
