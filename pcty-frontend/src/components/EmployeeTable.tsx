import React, { useEffect, useState } from "react";
import api from "../api/EmployeesApi";
import EmployeeTableBody from "./EmployeeTableBody";

interface IEmployee {
  id: number;
  first_name: string;
  last_name: string;
  dependents: { full_name: string }[];
}

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);

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
  }, []);

  return (
      <div className="flex flex-col shadow-md">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Dependents
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Discount applied
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total benefits cost
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Deduction per Paycheck
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                          {employees.map(employee => {
                              return (
                                <EmployeeTableBody key={employee.id} employee={employee} />
                              )
                          })}
                </table>
              
            </div>
          </div>
        </div>
      </div>
  );
};

export default EmployeeTable;
