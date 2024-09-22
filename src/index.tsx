import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import axios from 'axios';
import $ from 'jquery';
import 'foundation-sites';
import 'foundation-sites/dist/css/foundation.min.css'; // Import Foundation CSS
import 'foundation-sites/dist/css/foundation.min.css'; // Import Foundation CSS
import 'foundation-sites'; // Import Foundation JavaScript


axios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
useEffect(() => {
    $(document).foundation();
  }, []);
  

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
