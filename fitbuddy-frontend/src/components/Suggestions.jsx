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

    const total = parseInt(cravings) + parseInt(lackOfDiscipline) + parseInt(partying) + parseInt(favoriteFood);

    // Validate the sum of all inputs
    if (total !== 10) {
      handleToast('Error', 'The days count should equal to 10.', 'danger');
      return;
    }

    console.log(cravings, lackOfDiscipline, partying, favoriteFood);
    console.log(authToken);

    // Start loading spinner
    setLoading(true);

    // Simulate a delay to see the spinner
    setTimeout(async () => {
      try {
        const response = await axios.post(
          'http://localhost:8080/api/user/diet-cheat-suggestions',
          {
            "cheatReasonsAndCount": {
              "cravings": parseInt(cravings),
              "lackOfDiscipline": parseInt(lackOfDiscipline),
              "partying": parseInt(partying),
              "favoriteFood": parseInt(favoriteFood)
            }
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`
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
        handleToast('Error', 'There was an error generating suggestions', 'danger');
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
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <h4 className=" d-block">Select the reasons for your last <strong>10</strong> Cheat Meal Days.</h4>
                <div class="form-text"> (You can add the number of days in below reasons.)</div>
                <div className="input-group mb-3" style={{ maxWidth: '500px' }}>
                  <span className="input-group-text" style={{ width: '420px', color: 'white', backgroundColor: '#5c94b1' }}>
                    Cravings &nbsp;&nbsp;&nbsp; <i className="bx bx-cookie"></i>
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    value={cravings}
                    onChange={(e) => setCravings(e.target.value)}
                    style={{ maxWidth: '80px' }} 
                    min="0"
                    max="10"
                  />
                </div>

                <div className="input-group mb-3" style={{ maxWidth: '500px' }}>
                  <span className="input-group-text" style={{ width: '420px', color: 'white', backgroundColor: '#8b8e8f' }}>
                    Lack Of Discipline &nbsp;&nbsp;&nbsp; <i className="bx bx-brain"></i>
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    value={lackOfDiscipline}
                    onChange={(e) => setLackOfDiscipline(e.target.value)}
                    style={{ maxWidth: '80px' }} 
                    min="0"
                    max="10"
                  />
                </div>

                <div className="input-group mb-3" style={{ maxWidth: '500px' }}>
                  <span className="input-group-text" style={{ width: '420px', color: 'white', backgroundColor: '#5c94b1' }}>
                    Partying &nbsp;&nbsp;&nbsp; <i className="bx bx-drink"></i>
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    value={partying}
                    onChange={(e) => setPartying(e.target.value)}
                    style={{ maxWidth: '80px' }} 
                    min="0"
                    max="10"
                  />
                </div>

                <div className="input-group mb-3" style={{ maxWidth: '500px' }}>
                  <span className="input-group-text" style={{ width: '420px', color: 'white', backgroundColor: '#8b8e8f' }}>
                    Favorite Food &nbsp;&nbsp;&nbsp; <i className="bx bx-restaurant"></i>
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    value={favoriteFood}
                    onChange={(e) => setFavoriteFood(e.target.value)}
                    style={{ maxWidth: '80px' }} 
                    min="0"
                    max="10"
                  />
                </div>

                <div className="row justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ marginTop: '50px', maxWidth: '200px' }}
                    >
                    Generate Suggestions
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {suggestData && (
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-body"><hr/>
                <ul style={{ listStyleType: 'disc', marginLeft: '20px', fontSize: '18px', color: '#797181;' }}>
                  {suggestData.suggested_actions.map((action, index) => (
                    <li key={index}>{action}.</li>
                  ))}
                </ul><hr/>
              </div>
            </div>
          </div>
        </div>
      )}

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
        <div className={`bs-toast toast fade show bg-${toast.type}`} style={{ position: 'fixed', top: '20px', right: '20px', zIndex: '1050' }} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <i className="bx bx-bell me-2"></i>
            <div className="me-auto fw-semibold">{toast.title}</div>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setToast({ show: false, message: '', type: '' })}></button>
          </div>
          <div className="toast-body">
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}

export default Suggestions;
