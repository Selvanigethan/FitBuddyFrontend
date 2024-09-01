import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../assets/images/fitbuddy.png';
import ReactApexChart from 'react-apexcharts';

function Progress() {
  const authToken = localStorage.getItem('authToken');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, title: '', message: '', type: '' });
  const [progressData, setProgressData] = useState(null);

  const [seriesData, setSeriesData] = useState({
    fatPercentage: [],
    weight: [],
    fatWeight: [],
    muscleBoneWeight: [],
    bmr: [],
    tee: []
  });

  // Fetch all progress data
  const fetchProgressData = async () => {
    try {
      const getResponse = await axios.get('http://localhost:8080/api/user/all-progress-data', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      console.log(getResponse.data)

      if(getResponse.data.warningMessage == null){
        setProgressData(getResponse.data);
        updateSeriesData(getResponse.data);
      }else{
        handleToast('Warning', getResponse.data.warningMessage, 'warning');
        clearFields();
      }

    } catch (error) {
      console.error(error);
      handleToast('Error', 'Failed to fetch data', 'danger');
    }
  };

  const updateSeriesData = (data) => {
    const fatPercentage = [];
    const weight = [];
    const fatWeight = [];
    const muscleBoneWeight = [];
    const bmr = [];
    const tee = [];
    const dates = [];

    data.data.forEach((item) => {
      dates.push(item.date);
      fatPercentage.push(item.fatPercentage.toFixed(2));
      weight.push(item.weight.toFixed(2));
      fatWeight.push(item.fatWeight.toFixed(2));
      muscleBoneWeight.push(item.muscleBoneWeight.toFixed(2));
      bmr.push(item.bmr.toFixed(0));
      tee.push(item.tee.toFixed(0));
    });

    setSeriesData({
      fatPercentage: [{ name: 'Fat Percentage', data: fatPercentage }],
      weight: [{ name: 'Weight', data: weight }],
      fatWeight: [{ name: 'Fat Weight', data: fatWeight }],
      muscleBoneWeight: [{ name: 'Muscle Bone Weight', data: muscleBoneWeight }],
      bmr: [{ name: 'BMR', data: bmr }],
      tee: [{ name: 'TEE', data: tee }]
    });

    // Update the x-axis categories for the charts
    setXAxisCategories(dates);
  };

  const [xAxisCategories, setXAxisCategories] = useState([]);

  useEffect(() => {
    fetchProgressData(); // Fetch all data on component mount
  }, [authToken]);

  const handleToast = (title, message, type) => {
    setToast({ show: true, title, message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      handleToast('Error', 'Please fill in all required fields', 'danger');
      return;
    }

    setLoading(true);

 // Simulate a delay to see the spinner
 setTimeout(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/progress-between-dates?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      setLoading(false);
      console.log(response.data)

      if(response.data.warningMessage == null){
        updateSeriesData(response.data);
        handleToast('Success', 'Data filtered successfully', 'success');
        clearFields();
      }else{
        handleToast('Warning', response.data.warningMessage, 'warning');
        clearFields();
      }

    } catch (error) {
      setLoading(false);
      handleToast('Error', 'There was an error filtering progress data', 'danger');
    }
  }, 500); // Simulating a delay for loading spinner
  };

  const clearFields = () => {
    setStartDate('');
    setEndDate('');
  };

  const chartOptions = (title) => ({
    chart: {
      height: 350,
      type: 'line',
    },
    stroke: {
      width: 5,
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: xAxisCategories, // Use the updated x-axis categories
      tickAmount: 10,
      labels: {
        formatter: (value, timestamp, opts) => opts.dateFormatter(new Date(timestamp), 'dd MMM')
      }
    },
    title: {
      text: title,
      align: 'left',
      style: {
        fontSize: "17px",
        fontWeight: '500',
        lineHeight: '1.1',
        color: '#566a7f',
        fontFamily: 'Rubik'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#FDD835'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      },
    }
  });

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Tracking/</span> Progress Tracking</h4>
      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <label className="col-sm-1 col-form-label">Start Date</label>
                  <div className="col-sm-3">
                    <input
                      className="form-control"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <label className="col-sm-1 col-form-label">End Date</label>
                  <div className="col-sm-3">
                    <div className="input-group input-group-merge">
                      <span className="input-group-text"><i className="bx bx-user"></i></span>
                      <input
                        type="date"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                <div className="row justify-content-end">
                  <div className="col-sm-1.5">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      Generate Graphs
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Graph Data */}
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <ReactApexChart
                options={chartOptions('Fat Percentage')}
                series={seriesData.fatPercentage}
                type="line"
                height={350}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <ReactApexChart
                options={chartOptions('Weight')}
                series={seriesData.weight}
                type="line"
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <ReactApexChart
                options={chartOptions('Fat Weight')}
                series={seriesData.fatWeight}
                type="line"
                height={350}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <ReactApexChart
                options={chartOptions('Muscle Bone Weight')}
                series={seriesData.muscleBoneWeight}
                type="line"
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <ReactApexChart
                options={chartOptions('BMR')}
                series={seriesData.bmr}
                type="line"
                height={350}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <ReactApexChart
                options={chartOptions('TEE')}
                series={seriesData.tee}
                type="line"
                height={350}
              />
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

export default Progress;