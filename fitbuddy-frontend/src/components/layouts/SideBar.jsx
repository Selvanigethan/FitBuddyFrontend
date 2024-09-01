import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/fitbuddy.png';
import '../../assets/styles/Home.css';

function SideBar() {

  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleTabClick = (path) => {
    setActiveTab(path);
  };

    return(
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
          <div className="app-brand demo">
            <img src={logo} alt="FitBuddy Logo" className="header_logo"/>
          </div>
          <div className="menu-inner-shadow"></div>
          <ul className="menu-inner py-1">

            <li className={`menu-item ${activeTab === '/home' ? 'active' : ''}`}>
            <Link to="/home" className="menu-link" onClick={() => handleTabClick('/home')}>
            <i className="menu-icon tf-icons bx bx-home-circle"></i>
            <div data-i18n="Analytics">Dashboard</div>
            </Link>
            </li>

            <li className="menu-header small text-uppercase"><span className="menu-header-text">Metrics</span></li>
            <li className={`menu-item ${activeTab === '/home/body-fat-calculator' ? 'active' : ''}`}>
            <Link to="/home/body-fat-calculator" className="menu-link" onClick={() => handleTabClick('/home/body-fat-calculator')}>
            <i className="menu-icon tf-icons bx bx-body"></i>
            <div data-i18n="Basic">Body Fat Calculator</div>
            </Link>
            </li>
            <li className={`menu-item ${activeTab === '/home/calories-calculator' ? 'active' : ''}`}>
            <Link to="/home/calories-calculator" className="menu-link" onClick={() => handleTabClick('/home/calories-calculator')}>
            <i className="menu-icon tf-icons bx bx-calculator"></i>
            <div data-i18n="Basic">Calories Calculator</div>
            </Link>
            </li>

            <li className="menu-header small text-uppercase"><span className="menu-header-text">Components</span></li>
            <li className={`menu-item ${activeTab === '/home/diet-plan' ? 'active' : ''}`}>
            <Link to="/home/diet-plan" className="menu-link" onClick={() => handleTabClick('/home/diet-plan')}>
                <i className="menu-icon tf-icons bx bx-food-menu"></i>
                <div data-i18n="Basic">Get Diet Plan</div>
            </Link>
            </li>
            <li className={`menu-item ${activeTab === '/home/workout-plan' ? 'active' : ''}`}>
            <Link to="/home/workout-plan" className="menu-link" onClick={() => handleTabClick('/home/workout-plan')}>
                <i className="menu-icon tf-icons bx bx-dumbbell"></i>
                <div data-i18n="Basic">Get Workout Plan</div>
            </Link>
            </li>

            <li className="menu-header small text-uppercase"><span className="menu-header-text">Tracking</span></li>
            <li className={`menu-item ${activeTab === '/home/my-progress' ? 'active' : ''}`}>
              <Link to="/home/my-progress" className="menu-link" onClick={() => handleTabClick('/home/my-progress')}>
                <i className="menu-icon tf-icons bx bx-file"></i>
                <div data-i18n="Documentation">Progress Data</div>
              </Link>
            </li>
            <li className={`menu-item ${activeTab === '/home/progress-track' ? 'active' : ''}`}>
              <Link to="/home/progress-track" className="menu-link" onClick={() => handleTabClick('/home/progress-track')}>
                <i className="menu-icon tf-icons bx bx-line-chart"></i>
                <div data-i18n="Support">Progress Tracking</div>
              </Link>
            </li>

            <li className="menu-header small text-uppercase"><span className="menu-header-text">Suggestions & Insights</span></li>
            <li className={`menu-item ${activeTab === '/home/suggestions' ? 'active' : ''}`}>
              <Link to="/home/suggestions" className="menu-link" onClick={() => handleTabClick('/home/suggestions')}>
                <i className="menu-icon tf-icons bx bx-brain"></i>
                <div data-i18n="Support">Suggestions</div>
              </Link>
            </li>
            <li className={`menu-item ${activeTab === '/home/health-guides' ? 'active' : ''}`}>
              <Link to="/home/health-guides" className="menu-link" onClick={() => handleTabClick('/home/health-guides')}>
                <i className="menu-icon tf-icons bx-book-content"></i>
                <div data-i18n="Documentation">Health Guides</div>
              </Link>
            </li>

          </ul>
        </aside>
    );
    
    
}

export default SideBar;