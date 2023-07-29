import React, { useState, useEffect } from "react";
import { useEmployeeContext } from "../context/EmployeeContext";

interface IEmployee {
  id: number;
  first_name: string;
  last_name: string;
  dependents: { id: number; full_name: string }[];
}

interface EditEmployeeFormProps {
  employee: IEmployee;
  onCancel: () => void;
}

const EditEmployeeForm: React.FC<EditEmployeeFormProps> = ({
  employee,
  onCancel,
}) => {
  const [editedEmployee, setEditedEmployee] = useState<IEmployee>(employee);
  const { updateEmployee } = useEmployeeContext();
  const [benefitsCostPreview, setBenefitsCostPreview] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleDependentChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setEditedEmployee((prevEmployee) => {
      const updatedDependents = [...prevEmployee.dependents];
      updatedDependents[index].full_name = value;
      return {
        ...prevEmployee,
        dependents: updatedDependents,
      };
    });
  };

  const handleAddDependent = () => {
    setEditedEmployee((prevEmployee) => ({
      ...prevEmployee,
      dependents: [
        ...prevEmployee.dependents,
        { id: Date.now(), full_name: "" },
      ],
    }));
  };

  const handleRemoveDependent = (index: number) => {
    setEditedEmployee((prevEmployee) => {
      const updatedDependents = [...prevEmployee.dependents];
      updatedDependents.splice(index, 1);
      return {
        ...prevEmployee,
        dependents: updatedDependents,
      };
    });
  };

  // Calculate the benefits cost preview 
  useEffect(() => {
    let totalCost = 1000; 
    let discount = 0;

    editedEmployee.dependents.forEach((dependent) => {
      totalCost += 500;
    });

    if (
      editedEmployee.first_name.toLowerCase().startsWith("a") ||
      editedEmployee.dependents.some((dependent) =>
        dependent.full_name.toLowerCase().startsWith("a")
      )
    ) {
      discount = totalCost * 0.1;
    }

    const benefitsCost = totalCost - discount;
    setBenefitsCostPreview(benefitsCost);
  }, [editedEmployee]);

  return (
    <div className="h-auto w-72 flex flex-col justify-center items-center py-3">
      <form>
        <h3>Edit Employee:</h3>
        <label className="mr-3">
          {" "}
          First Name:
          <input
            type="text"
            name="first_name"
            className="border ml-3"
            value={editedEmployee.first_name}
            onChange={handleInputChange}
          />
        </label>
        <label className="mr-3">
          Last Name:
          <input
            type="text"
            name="last_name"
            className="border ml-3"
            value={editedEmployee.last_name}
            onChange={handleInputChange}
          />
        </label>
        <div>
          <h4>Dependents:</h4>
          {editedEmployee.dependents.map((dependent, index) => (
            <div key={dependent.id} className="mb-3">
              <input
                type="text"
                name={`dependent_${index}`}
                className="border mr-2"
                value={dependent.full_name}
                onChange={(event) => handleDependentChange(index, event)}
              />
              <button
                      type="button"
                      className="text-red-600"
                onClick={() => handleRemoveDependent(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-blue-600 mb-3"
            onClick={handleAddDependent}
          >
            + Add Dependent
          </button>
        </div>
        <hr />
        <div className="mt-3 p-3 bg-slate-300">
          <h4>Benefits Cost Preview:</h4>
          <p>${benefitsCostPreview}</p>
        </div>

        <div className="mt-3">
          <button
            className="mx-3 bg-blue-200 p-1"
            onClick={() => updateEmployee(editedEmployee)}
          >
            Save
          </button>
          <button className="mx-3 bg-red-300 p-1" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeForm;
