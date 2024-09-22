import React, { useState } from 'react';
import './component-css/Dashboard.css';
import InputField from './InputField';
import appointments from '../assets/patients.json';
import TodoList from './TodoList';
import DrReportsList from './DrReportsList';
import ManageAppointments from './ManageAppointments';
import HashGenerator from './payment-model/HashGenerator';
import Carousel3D from './Carousel3D';
// import Carousel3D from './Carousel3D';

interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

const Dashboard: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statCard1Open, setStatCard1Open] = useState(false);
  const [statCard2Open, setStatCard2Open] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const toggleStatCard = (id: number) => {
    if (id === 1) {
      setStatCard1Open(!statCard1Open);
    } else if (id === 2) {
      setStatCard2Open(!statCard2Open);
    }
  };

 

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome to the Dashboard</h1>
        <div className="input-container">
          <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
          <TodoList todos={todos} setTodos={setTodos} />
        </div>
      </header>
      <Carousel3D appointments={appointments}  />

      <section className="dashboard-content">
        <div className="dashboard-stats">
          <div className="stat-card">
            <div
              className="stat-card-header"
              onClick={() => toggleStatCard(1)}
            >
              <h2>Statistics 1</h2>
              <i
                className={`fas fa-angle-${statCard1Open ? 'up' : 'down'}`}
                
              ></i>

            </div>
            <div
              className={`stat-card-content dr-report  ${statCard1Open ? 'show' : 'hide'}`}
            >
              

            </div>
          </div>
          <div className="stat-card">
            <div
              className="stat-card-header"
              onClick={() => toggleStatCard(2)}
            >
              <h2>Statistics 2</h2>
              <i
                className={`fas fa-angle-${statCard2Open ? 'up' : 'down'}`}
              ></i>
            </div>
            <div
              className={`stat-card-content ${statCard2Open ? 'show' : 'hide'}`}
            >
              <p>Details about Statistic 2.</p>
              <div className="dr-report-container">
                <DrReportsList />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ManageAppointments doctorName="Dr. Emily Brown" appointments={appointments} />
<HashGenerator/>
{/* <Carousel3D images={images} /> */}
    </div>
  );
};

export default Dashboard;