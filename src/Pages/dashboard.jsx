import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { app } from "../firebase/config";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // styling
  //const buttonStyles = 'bg-black px-5 py-2 my-3 text-white rounded-lg'
  const buttonStyles =
    "bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50";
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    // Set up Firestore listener and store unsubscribe function
    const db = getFirestore(app);
    const prodtCol = collection(db, "emplo");
    const unsubscribe = onSnapshot(prodtCol, (snapshot) => {
      const prodtList = snapshot.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      console.log(prodtList);
      // Update the state with the retrieved data
      setEmployees(prodtList);
    });

    // Return the unsubscribe function to clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const username = "Dev";

  const addEmployeeOnClick = () => {
    navigate("/addemp");
  };
  const createTeamOnClick = () => {
    navigate("/createteam");
  };
  const viewTeamsOnClick = () => {
    navigate("/viewteams");
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row ">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-8 md:w-1/2 flex flex-col justify-center ">
          <span className="text-3xl md:text-4xl font-bold mb-4">
            Welcome, {username}
          </span>
          <p class="text-lg mb-6">Manage your teams here.</p>
        </div>
        <div class="bg-gray-800 text-white p-8 md:w-1/2 grid grid-cols-1 gap-1 md:gap-8 text-center">
          <div>
            <p class="text-3xl font-bold">Add</p>
            <p class="text-sm">Employees</p>
          </div>
          <div>
            <p class="text-3xl font-bold">Create</p>
            <p class="text-sm">Teams</p>
          </div>
          <div>
            <p class="text-3xl font-bold">Manage</p>
            <p class="text-sm">Resources</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center py-4 gap-4 justify-center">
        <button className={buttonStyles} onClick={addEmployeeOnClick}>
          Add Employee
        </button>
        <button className={buttonStyles} onClick={createTeamOnClick}>
          Create Team
        </button>
        <button className={buttonStyles} onClick={viewTeamsOnClick}>
          View Teams
        </button>
        <input
          className="p-4 border-2 h-10 items-center justify-center"
          placeholder="Enter employee name"
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
        <MagnifyingGlassIcon
          onClick={() => {
            alert(search);
          }}
          className="max-w-5 "
        />
      </div>
      <div className="pl-20 pr-20">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
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
              {employees.map((doc) => {
                return (
                  <tr className="odd:bg-white  even:bg-gray-50  border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {doc.fname}
                    </th>
                    <td className="px-6 py-4">{doc.empid}</td>
                    <td className="px-6 py-4">{doc.dept}</td>
                    <td className="px-6 py-4">{doc.exp}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/editemp/${doc.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <a
                          href="#"
                          className="font-medium text-blue-600  hover:underline"
                        >
                          Edit
                        </a>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
