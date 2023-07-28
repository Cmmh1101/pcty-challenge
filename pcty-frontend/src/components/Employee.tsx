import React from 'react'

interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    dependents: { full_name: string }[];
  }
  
  interface EmployeeProps {
    employee: Employee;
  }

const Employee: React.FC<EmployeeProps> = ({ employee }) => {
    return (
        <div>
          <h2 className='text-blue-700'>{`${employee.first_name} ${employee.last_name}`}</h2>
          <ul>
            {employee.dependents.map((dependent, index) => (
              <li key={index}>{dependent.full_name}</li>
            ))}
          </ul>
        </div>
      );
}

export default Employee