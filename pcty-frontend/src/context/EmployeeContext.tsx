import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";
import api from "../api/EmployeesApi";

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  dependents: { id: number; full_name: string }[];
}

interface EmployeeContextValue {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (employeeId: number) => void;
  creatingEmployee: boolean;
  setCreatingEmployee: (value: boolean) => void;
  updateDependents: (
    employeeId: number,
    dependents: { id: number; full_name: string }[]
  ) => void;
}

const EmployeeContext = createContext<EmployeeContextValue>(
  {} as EmployeeContextValue
);

export const useEmployeeContext = () => useContext(EmployeeContext);

interface EmployeeProviderProps {
  children: ReactNode;
}

const EmployeeProvider: React.FC<EmployeeProviderProps> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [creatingEmployee, setCreatingEmployee] = useState<boolean>(false);

  const fetchEmployees = async () => {
    const response = await api.get("/employees");
    return response.data;
  };

  useEffect(() => {
    const getEmployees = async () => {
      const allEmployees = await fetchEmployees();
      if (allEmployees) {
        setEmployees(allEmployees);
      }
    };
    getEmployees();
  }, [employees]);

  const addEmployee = async (employee: Employee) => {
    try {
      const response = await api.post("/employees",
        employee
      );
      setEmployees((prevEmployees) => [...prevEmployees, response.data]);
      setCreatingEmployee(!creatingEmployee);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const updateEmployee = async (employee: Employee) => {
    try {
      await api.put(`/employees/${employee.id}`,
        employee
      );
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) => (emp.id === employee.id ? employee : emp))
      );
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const deleteEmployee = async (employeeId: number) => {
    try {
      await api.delete(`/employees/${employeeId}`);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp.id !== employeeId)
      );
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };
    

  const updateDependents = async (
    employeeId: number,
    dependents: { id: number; full_name: string }[]
  ) => {
    try {
      await api.put(
        `/employees/${employeeId}/dependents`,
        {
          dependents,
        }
      );
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === employeeId ? { ...emp, dependents } : emp
        )
      );
    } catch (error) {
      console.error("Error updating dependents:", error);
    }
  };

  const contextValue: EmployeeContextValue = {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    creatingEmployee,
    setCreatingEmployee,
    updateDependents,
  };

  return (
    <EmployeeContext.Provider value={contextValue}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
