import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { app } from "../firebase/config";
import { Link } from "react-router-dom";

const ViewTeam = () => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    // Set up Firestore listener and store unsubscribe function
    const db = getFirestore(app);
    const prodtCol = collection(db, "team");
    const unsubscribe = onSnapshot(prodtCol, (snapshot) => {
      const prodtList = snapshot.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      console.log(prodtList);
      // Update the state with the retrieved data
      setTeams(prodtList);
    });

    // Return the unsubscribe function to clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="pl-20 pr-20">
      <div className="relative mt-16 overflow-x-auto shadow-md sm:rounded-lg ">
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
            {teams.map((doc) => {
              return (
                <tr className="odd:bg-white  even:bg-gray-50  border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    hi
                  </th>
                  <td className="px-6 py-4">hi</td>
                  <td className="px-6 py-4">hi</td>
                  <td className="px-6 py-4">hi</td>
                  <td className="px-6 py-4">
                    <Link to={`/editemp/`} style={{ textDecoration: "none" }}>
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
  );
};

export default ViewTeam;
