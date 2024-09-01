import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../assets/images/fitbuddy.png';
import mealImage from '../assets/images/meal.png';

function DietPlan() {
  const authToken = localStorage.getItem('authToken');

  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [hip, setHip] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [goal, setGoal] = useState('');

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, title: '', message: '', type: '' });
  const [dietPlan, setDietPlan] = useState(null); // State to store diet plan response

  // If there any exixsting dietPlan, it will load here
  useEffect(() => {
    const fetchDietPlan = async () => {
      try {
        const getResponse = await axios.get('http://localhost:8080/api/user/user-existing-plans', {
          headers: {
              Authorization: `Bearer ${authToken}`
          }
        });

        setDietPlan(getResponse.data.dietPlan);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDietPlan();
  }, [authToken]);

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleToast = (title, message, type) => {
    setToast({ show: true, title, message, type });
    setTimeout(() => {
      setToast({ show: false, title:'', message: '', type: '' });
    }, 4000); // Hide toast after 4 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(age, gender, height, weight, waist, neck, hip, activityLevel, goal);

    if (!age || !gender || !height || !weight || !waist || !neck || (gender === 'female' && !hip) || !activityLevel || !goal) {
      handleToast('Error', 'Please fill in all required fields', 'danger');
      return;
    }

    // Start loading spinner
    setLoading(true);

    // Simulate a delay to see the spinner
    setTimeout(async () => {
      try {
        const postResponse = await axios.post(
          'http://localhost:8080/api/user/diet-plan',
          {
            gender,
            age: parseInt(age),
            height: parseFloat(height),
            weight: parseFloat(weight),
            waist: parseFloat(waist),
            neck: parseFloat(neck),
            hip: gender === 'female' ? parseFloat(hip) : null,
            activityLevel,
            goal
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        );

        // Stop loading spinner
        setLoading(false);

        // console.log(response.data);
        // Set diet plan data
        setDietPlan(postResponse.data);
        handleToast('Succuss', 'Diet Plan generated succussfully', 'success');
        
        clearFields();

      } catch (error) {
        setLoading(false);
        handleToast('Error', 'There was an error generating the diet plan', 'error');
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
    setActivityLevel('');
    setGoal('');
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Components/</span> Diet Plan</h4>
  <div className="row">
        <div className="col-xxl">
          <div className="diet-plan-container">
          {dietPlan ? (
  <>
    <div className="row justify-content-end">
      <div className="col-sm-1.5">
        <button type="button" className="btn btn-primary" style={{float: 'right'}}
        onClick={() => setDietPlan(null)}>
          New Diet Plan
        </button>
      </div>
    </div>

    <h5 className="diet-plan-title">Metrics</h5>
    <div className="card metrics-card">
    <div className="row">   
      <div className="col-md-6">   
      <div className="diet-plan-metric">
      <strong>BMR:</strong> {dietPlan.bmr.toFixed(2)} kcal/day
    </div>
    <div className="diet-plan-metric">
      <strong>Body Fat Percentage:</strong> {dietPlan.bodyFatPercentage.toFixed(2)}%
    </div>
    <div className="diet-plan-metric">
      <strong>Total Energy Expenditure (TEE):</strong> {dietPlan.tee.toFixed(2)} kcal/day
    </div>
    <br/><hr /><br />
    <div className="diet-plan-metric">
      <strong>Recommended Calories:</strong> {dietPlan.recommendedCalories.toFixed(2)} kcal/day
    </div>
    <div className="diet-plan-metric">
      <strong>Recommended Protein:</strong> {dietPlan.recommendedProtein.toFixed(2)} g/day
    </div>
    <br/>
      </div>
      <div className="col-md-6">  
      <div className="diet-plan-metric">
      <strong>Recommended Nutritional Details:</strong>
      <br/>
      <ul>
      {dietPlan.recommendedDietNutritionalDetails.split('~').map((detail, index) => (
        <li key={index}>{detail}</li>
      ))}
      </ul>
    </div>
    <hr />
    <div className="diet-plan-metric">
      <strong>Generated Nutritional Details:</strong> 
      <br/>
      <ul>
      {dietPlan.generatedDietNutritionalDetails.split('~').map((detail, index) => (
        <li key={index}>{detail}</li>
      ))}
      </ul>
    </div>
      </div>
    </div>

</div>



<div className="meals-section">
  {["Breakfast", "Lunch", "Snack", "Dinner"].map((category) => (
    <div key={category} className="meal-category">
      <h5 className="diet-plan-title">{category}</h5>
      <div className="row">
        {dietPlan.meals
          .filter((meal) => meal.mealCategory === category.toLowerCase())
          .map((meal, index) => (
            <div key={index} className="col-md-2" style={{ marginBottom: '20px' }}>
              <div className="card meal-card">
                <img
                  className="card-img-top meal-image"
                  src={mealImage}
                  alt={meal.mealName}
                />
                <div className="card-body">
                  <h5 className="card-title">{meal.mealName}</h5>
                  <p className="card-text">{meal.description}</p>
                </div>
                <ul className="list-group">
                  <li className="list-group-item">
                    Calories per 100g: <br/>{meal.caloriesPer100g} kcal
                  </li>
                  <li className="list-group-item">
                    Protein per 100g: <br/>{meal.proteinPer100g} g
                  </li>
                </ul>
              </div>
            </div>
          ))}
      </div>
    </div>
  ))}
</div>

  </>
) : (

              <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Diet Plan</h5>
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

                <div className="row mb-3">
                {gender === 'female' && (
                  <>
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
                  </>
                )}
                
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

                  <label class="col-sm-1 col-form-label" for="basic-icon-default-fullname">Goal</label>
                  <div class="col-sm-3">
                    <select class="form-select" value={goal} onChange={(e) => setGoal(e.target.value)} disabled={loading}>
                          <option selected disabled value="">Goal</option>
                          <option value="lose fat">Lose Fat</option>
                          <option value="gain muscle">Gain Muscle</option>
                          <option value="maintain weight">Maintain Weight</option>
                    </select>
                  </div>
      
                </div>

                <div className="row justify-content-end">
                  <div className="col-sm-1.5">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      Generate Diet Plan
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
            )}
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
      <div 
        className={`bs-toast toast fade show bg-${toast.type}`}
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
  </>
)}

    </div>
  );
}

export default DietPlan;

