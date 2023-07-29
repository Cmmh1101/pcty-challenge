import React, { useState } from "react";
import { useEmployeeContext } from "../context/EmployeeContext";

interface Dependent {
    id: number;
    full_name: string;
  }
  
  interface NewEmployee {
    first_name: string;
    last_name: string;
    dependents: string[];
  }
  
  interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    dependents: Dependent[];
  }
  
  const convertToEmployee = (newEmployee: NewEmployee): Employee => {
    const { first_name, last_name, dependents } = newEmployee;
    const employee: Employee = {
      id: Date.now(),
      first_name,
      last_name,
      dependents: dependents.map((name, index) => ({
        id: index + 1, 
        full_name: name,
      })),
    };
    return employee;
  };
  
  const AddEmployee: React.FC = () => {
    const { addEmployee } = useEmployeeContext();
      const [newEmployee, setNewEmployee] = useState<NewEmployee>({
      first_name: "",
      last_name: "",
      dependents: [],
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewEmployee((prevEmployee) => ({
        ...prevEmployee,
        [name]: value,
      }));
    };
  
    const handleAddDependent = () => {
      if (newEmployee.dependents.includes("")) {
        return;
      }
      setNewEmployee((prevEmployee) => ({
        ...prevEmployee,
        dependents: [...prevEmployee.dependents, ""],
      }));
    };
  
    const handleDependentChange = (index: number, value: string) => {
      setNewEmployee((prevEmployee) => {
        const newDependents = [...prevEmployee.dependents];
        newDependents[index] = value;
        return {
          ...prevEmployee,
          dependents: newDependents,
        };
      });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (newEmployee.first_name.trim() === "" || newEmployee.last_name.trim() === "") {
        return;
      }
  
      const employeeToAdd = convertToEmployee(newEmployee);
      addEmployee(employeeToAdd);
      setNewEmployee({first_name: "", last_name: "", dependents: [] }); 
    };

  return (
    <div className="container mx-auto max-w-md mt-8">
      <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="first_name" className="block font-medium mb-1">
            First Name:
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={newEmployee.first_name}
            onChange={handleChange}
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block font-medium mb-1">
            Last Name:
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={newEmployee.last_name}
            onChange={handleChange}
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            placeholder="Enter last name"
          />
        </div>
        <div>
          <label htmlFor="dependents" className="block font-medium mb-1">
            Dependents:
          </label>
          {newEmployee.dependents.map((dependent, index) => (
            <div key={index}>
              <input
                type="text"
                name="dependents"
                value={dependent}
                onChange={(e) => handleDependentChange(index, e.target.value)}
                className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                placeholder="Enter dependent's name"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddDependent}
            className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600"
          >
            Add Dependent
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;