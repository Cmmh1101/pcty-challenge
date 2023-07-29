import React from "react";
import EmployeeTableBody from "./EmployeeTableBody";
import { useEmployeeContext } from "../context/EmployeeContext";
import AddEmployee from "./AddEmployee";

const EmployeeTable: React.FC = () => {
  const { employees, creatingEmployee, setCreatingEmployee } =
    useEmployeeContext();

  return (
    <>
      <button
        onClick={() => setCreatingEmployee(true)}
        className="mb-8 ml-0 text-blue-700 hover:text-blue-900"
      >
        Add new Employee
      </button>

      {creatingEmployee ? (
        <AddEmployee />
      ) : (
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
                  {employees.map((employee) => {
                    return (
                      <EmployeeTableBody
                        key={employee.id}
                        employee={employee}
                      />
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeTable;
