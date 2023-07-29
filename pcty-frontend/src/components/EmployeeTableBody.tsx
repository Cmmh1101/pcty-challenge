import React, { useEffect, useState } from "react";
import EditEmployeeForm from "./EditEmployeeForm";
import { useEmployeeContext } from "../context/EmployeeContext";

interface IEmployee {
  id: number;
  first_name: string;
  last_name: string;
  dependents: { id: number; full_name: string }[];
}
interface IEmployeeProps {
  employee: IEmployee;
}
const EmployeeTableBody: React.FC<IEmployeeProps> = ({ employee }) => {
  const [totalCost, setTotalCost] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [deductionPerPayCheck, setDeductionPerPayCheck] = useState<number>(0);
  const [editing, setEditing] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<
    IEmployee | undefined
  >(undefined);
  const { deleteEmployee } = useEmployeeContext();

  useEffect(() => {
    // Calculate the benefits cost preview
    const calculateCosts = () => {
      let total = 0;
      total += 1000;

      employee.dependents.forEach((dependent) => {
        total += 500;
      });

      if (
        employee.first_name.toLowerCase().startsWith("a") ||
        employee.dependents.some((dependent) =>
          dependent.full_name.toLowerCase().startsWith("a")
        )
      ) {
        setDiscount(total * 0.1);
      } else {
        setDiscount(0);
      }

      setTotalCost(total - discount);
      const costPerPayCheck = parseFloat((totalCost / 26).toFixed(2));
      setDeductionPerPayCheck(costPerPayCheck);
    };

    calculateCosts();
  }, [employee]);

  const handleEdit = (employee: IEmployee) => {
    setEditing(true);
    setSelectedEmployee(employee);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setSelectedEmployee(undefined);
  };

  return (
    <tbody key={employee.id} className="bg-white divide-y divide-gray-200">
      <tr key={employee.first_name}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <p className="text-sm text-center font-medium text-gray-900">
              {employee.first_name} {employee.last_name}
            </p>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm text-gray-900">
            <div>
              {employee.dependents.length > 0
                ? employee.dependents.map((dep, i) => {
                    return <p key={i}>{dep.full_name}</p>;
                  })
                : "N/A"}
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-green-100 text-green-800"
          >
            {discount ? "Discount Applied" : ""}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {totalCost}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {deductionPerPayCheck}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="">
            {selectedEmployee === undefined ? (
              <button
                onClick={() => handleEdit(employee)}
                className="text-indigo-600 hover:text-indigo-900"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={() => setSelectedEmployee(undefined)}
                className="text-red-700 hover:text-red-900"
              >
                X
              </button>
            )}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="">
            <button
              onClick={() => deleteEmployee(employee.id)}
              className="text-red-700 hover:text-red-900"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
      {editing && selectedEmployee !== undefined && (
        <>
          <EditEmployeeForm
            employee={selectedEmployee}
            onCancel={handleCancelEdit}
          />
        </>
      )}
    </tbody>
  );
};

export default EmployeeTableBody;
