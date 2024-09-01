import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../assets/images/fitbuddy.png';
import woktImage from '../assets/images/myworkout.gif';

function WorkoutPlan() {
  const authToken = localStorage.getItem('authToken');

  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('');
  const [workoutSplit, setWorkoutSplit] = useState('');

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, title: '', message: '', type: '' });
  const [workoutPlan, setWorkoutPlan] = useState(null); // State to store workout plan response

  // If there any exixsting workout plan, it will load here
  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        const getResponse = await axios.get('http://localhost:8080/api/user/user-existing-plans', {
          headers: {
              Authorization: `Bearer ${authToken}`
          }
        });

        setWorkoutPlan(getResponse.data.workoutPlan);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWorkoutPlan();
  }, [authToken]);

  const handleToast = (title, message, type) => {
    setToast({ show: true, title, message, type });
    setTimeout(() => {
      setToast({ show: false, title:'', message: '', type: '' });
    }, 4000); // Hide toast after 4 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(age, gender, activityLevel, goal, level, workoutSplit);

    if (!age || !gender || !level || !workoutSplit || !activityLevel || !goal) {
      handleToast('Error', 'Please fill in all required fields', 'danger');
      return;
    }

    // Start loading spinner
    setLoading(true);

    // Simulate a delay to see the spinner
    setTimeout(async () => {
      try {
        const postResponse = await axios.post(
          'http://localhost:8080/api/user/workout-plan',
          {
            level,
            workoutSplit
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        );

        // Stop loading spinner
        setLoading(false);

        console.log(postResponse.data);
        // Set workout plan data
        setWorkoutPlan(postResponse.data);
        handleToast('Succuss', 'Workout Plan generated succussfully', 'success');
        
        clearFields();

      } catch (error) {
        setLoading(false);
        handleToast('Error', 'There was an error generating the workout plan', 'error');
      }
    }, 500); // Simulating a delay for loading spinner
  };

  const clearFields = () => {
    setGender('');
    setAge('');
    setActivityLevel('');
    setGoal('');
    setLevel('');
    setGoal('');
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Components/</span> Workout Plan</h4>
  <div className="row">
        <div className="col-xxl">
          <div className="diet-plan-container">
          {workoutPlan ? (
  <>
    <div className="row justify-content-end">
      <div className="col-sm-1.5">
        <button type="button" className="btn btn-primary" style={{float: 'right'}}
        onClick={() => setWorkoutPlan(null)}>
          New Workout Plan
        </button>
      </div>
    </div>

    {/* <h5 className="diet-plan-title">Metrics</h5>
    <div className="card metrics-card">
    <div className="diet-plan-metric">
      <strong>BMR:</strong> {workoutPlan.bmr} kcal/day
    </div>
    <div className="diet-plan-metric">
      <strong>Body Fat Percentage:</strong> {workoutPlan.bodyFatPercentage.toFixed(2)}%
    </div>
    <div className="diet-plan-metric">
      <strong>Total Energy Expenditure (TEE):</strong> {workoutPlan.tee} kcal/day
    </div>
    <div className="diet-plan-metric">
      <strong>Recommended Calories:</strong> {workoutPlan.recommendedCalories} kcal/day
    </div>
    <div className="diet-plan-metric">
      <strong>Recommended Protein:</strong> {workoutPlan.recommendedProtein} g/day
    </div>
    <div className="diet-plan-metric">
      <strong>Recommended Nutritional Details:</strong> {workoutPlan.recommendedDietNutritionalDetails}
    </div>
    <div className="diet-plan-metric">
      <strong>Generated Nutritional Details:</strong> {dieworkoutPlantPlan.generatedDietNutritionalDetails}
    </div>
</div> */}



<div className="meals-section">
  {workoutPlan.map((object) => (
    <div key={object.day} className="meal-category">
      <h5 className="diet-plan-title">{object.day}</h5>
      <div className="row">
        {workoutPlan
          .map((object, index) => (
            <div key={index} className="col-md-2" style={{ marginBottom: '20px' }}>
              <div className="card meal-card">
                <img
                  className="card-img-top meal-image"
                  src={woktImage}
                  alt=''
                />
                <div className="card-body">
                  <h5 className="card-title">Name</h5>
                  <p className="card-text">Description</p>
                </div>
                {/* <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    Calories per 100g: {meal.caloriesPer100g} kcal
                  </li>
                  <li className="list-group-item">
                    Protein per 100g: {meal.proteinPer100g} g
                  </li>
                </ul> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  ))}
</div>

  </>
) : (

              // <div>No diet plan generated yet.</div>
              <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Workout Plan</h5>
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

                <div className="row mb-3">
                
                  <label class="col-sm-1 col-form-label" for="basic-icon-default-fullname">Level</label>
                  <div class="col-sm-3">
                    <select class="form-select" value={level} onChange={(e) => setLevel(e.target.value)} disabled={loading}>
                          <option selected disabled value="">Level</option>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
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

                  <label class="col-sm-1 col-form-label" for="basic-icon-default-fullname">Workout Split</label>
                  <div class="col-sm-3">
                    <select class="form-select" value={workoutSplit} onChange={(e) => setWorkoutSplit(e.target.value)} disabled={loading}>
                          <option selected disabled value="">Workout Split</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                    </select>
                  </div>
      
                </div>

                <div className="row justify-content-end">
                  <div className="col-sm-1.5">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      Generate Workout Plan
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

export default WorkoutPlan;

