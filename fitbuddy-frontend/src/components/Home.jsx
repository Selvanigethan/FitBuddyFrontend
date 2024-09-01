import React, { useEffect } from 'react';
import '../assets/styles/Home.css';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import SideBar from './layouts/SideBar';
import NavBar from './layouts/Header';
import Footer from './layouts/Footer';
import Dashboard from './Dashboard';
import BodyFatCalculator from './BodyFatCalculator';
import CaloriesCalculator from './CaloriesCalculator';
import WorkoutPlan from './WorkoutPlan';
import DietPlan from './DietPlan';
import Progress from './Progress';
import SaveProgress from './SaveProgress';
import Suggestions from './Suggestions';

function Layout() {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">

        {/* <!-- Menu --> */}
        <SideBar />
        {/* <!-- / Menu --> */}

        {/* <!-- Layout container --> */}
        <div className="layout-page">

          {/* <!-- Navbar --> */}
          <NavBar />
          {/* <!-- / Navbar --> */}

          {/* <!-- Content wrapper --> */}
          <div className="content-wrapper">
            {/* <!-- Content --> */}
            <Outlet />
            {/* <!-- / Content --> */}

            {/* <!-- Footer --> */}
            <Footer />
            {/* <!-- / Footer --> */}

            <div className="content-backdrop fade"></div>
          </div>
          {/* <!-- Content wrapper --> */}
        </div>
        {/* <!-- / Layout page --> */}
      </div>

      {/* <!-- Overlay --> */}
      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
  );
}


function Home() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {

    if (!username || !authToken) {
      navigate('/login');
    }
  }, [navigate]);

  return (

<Routes>
<Route path="/" element={<Layout />}>
  <Route index element={<Dashboard />} />
  <Route path="body-fat-calculator" element={<BodyFatCalculator />} />
  <Route path="calories-calculator" element={<CaloriesCalculator />} />
  <Route path="diet-plan" element={<DietPlan />} />
  <Route path="workout-plan" element={<WorkoutPlan />} />
  <Route path="my-progress" element={<SaveProgress />} />
  <Route path="progress-track" element={<Progress />} />
  <Route path="suggestions" element={<Suggestions />} />
</Route>
</Routes>

  );
}

export default Home;