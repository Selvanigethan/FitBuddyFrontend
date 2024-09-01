import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Register from './components/Register';
import Login from './components/Login';
import DietPlan from './components/DietPlan';
import WorkoutPlan from './components/WorkoutPlan';
import Home from './components/Home';
import VerificationPending from './components/VerificationPending';
import BodyFatCalculator from './components/BodyFatCalculator';
import CaloriesCalculator from './components/CaloriesCalculator';
import Progress from './components/Progress';
import SaveProgress from './components/SaveProgress';
import Suggestions from './components/Suggestions';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verification-pending" element={<VerificationPending />} />

      {/* All routes that should be handled within Home component */}
      <Route path="/home/*" element={<Home />} />

      {/* These routes are moved inside Home.jsx */}
      <Route path="/body-fat-calculator" element={<BodyFatCalculator />} />
      <Route path="/calories-calculator" element={<CaloriesCalculator />} />
      <Route path="/diet-plan" element={<DietPlan />} />
      <Route path="/workout-plan" element={<WorkoutPlan />} />
      <Route path="/my-progress" element={<SaveProgress />} />
      <Route path="/progress-track" element={<Progress />} />
      <Route path="/suggestions" element={<Suggestions />} />

    </Routes>
  </Router>
);

reportWebVitals();
