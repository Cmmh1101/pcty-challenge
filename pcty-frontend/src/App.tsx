import React from 'react';
import './App.css';
import EmployeeTable from './components/EmployeeTable';


function App() {
  return (
    <div className="App container mx-auto">
      <a href='/'><img src={(require("./images/logo.jpeg"))} className='w-40 py-3' alt="logo" /></a>
      <h1 className="text-xl my-5 underline">Employees Healthcare Benefit Cost</h1>
      <EmployeeTable />
    </div>
    
  );
}

export default App;
