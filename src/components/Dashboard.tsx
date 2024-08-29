
import React from 'react';
import './component-css/Dashboard.css'; 
import NavBar from './NavBar';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Welcome to the Dashboard</h1>
            </header>
            <NavBar/>
            <section className="dashboard-content">
                <div className="dashboard-stats">
                    <div className="stat-card">
                        <h2>Statistics 1</h2>
                        <p>Details about Statistic 1.</p>
                    </div>
                    <div className="stat-card">
                        <h2>Statistics 2</h2>
                        <p>Details about Statistic 2.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;
