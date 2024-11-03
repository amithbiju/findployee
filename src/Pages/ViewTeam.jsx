import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { app } from "../firebase/config";
import { Link } from "react-router-dom";

const ViewTeam = () => {
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const db = getFirestore(app);

    // Fetch teams data
    const teamCol = collection(db, "team");
    const unsubscribeTeam = onSnapshot(teamCol, (snapshot) => {
      const teamList = snapshot.docs.map((team) => ({
        ...team.data(),
        id: team.id,
      }));
      setTeams(teamList);
    });

    // Fetch employees data
    const empCol = collection(db, "emplo");
    const unsubscribeEmp = onSnapshot(empCol, (snapshot) => {
      const empList = snapshot.docs.map((employee) => ({
        ...employee.data(),
        id: employee.id,
      }));
      setEmployees(empList);
    });

    // Clean up listeners on unmount
    return () => {
      unsubscribeTeam();
      unsubscribeEmp();
    };
  }, []);

  return (
    <div className="pl-20 pr-20">
      <div className="relative mt-16 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Team Name
              </th>
              <th scope="col" className="px-6 py-3">
                Employee Name
              </th>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Experience
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) =>
              team.currTeam.map((empId) => {
                const employee = employees.find((emp) => emp.id === empId);
                return (
                  employee && (
                    <tr
                      key={`${team.id}-${employee.id}`}
                      className="odd:bg-white even:bg-gray-50 border-b"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {team.pname}
                      </th>
                      <td className="px-6 py-4">{employee.fname}</td>
                      <td className="px-6 py-4">{employee.empid}</td>
                      <td className="px-6 py-4">{employee.dept}</td>
                      <td className="px-6 py-4">{employee.exp}</td>
                      <td className="px-6 py-4">{team.priority}</td>
                    </tr>
                  )
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTeam;
