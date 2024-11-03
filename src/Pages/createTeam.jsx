import React, { useState } from "react";
import { useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { app } from "../firebase/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateTeam() {
  const navigate = useNavigate();

  const [isCustom, setIsCustom] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [employees, setEmployees] = useState([]);
  const [currTeam, setCurrTeam] = useState([]);
  const [showCurrTeam, setShowCurrTeam] = useState([]);
  const [priority, setPriority] = useState("low");
  const [responseData, setResponseData] = useState("");
  const [error, setError] = useState(null);
  const [skills, setSkills] = useState([]);
  const [pname, setPName] = useState("");

  useEffect(() => {
    // Set up Firestore listener and store unsubscribe function
    const db = getFirestore(app);
    const prodtCol = collection(db, "emplo");
    const skillCol = collection(db,"skills");
    const unsubscribe = onSnapshot(prodtCol, (snapshot) => {
      const prodtList = snapshot.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      console.log(prodtList);
      // Update the state with the retrieved data
      setEmployees(prodtList);
    });
    const skillunsubscribe = onSnapshot(skillCol, (snapshot) => {
      const skillList = snapshot.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      console.log(skillList);
      // Update the state with the retrieved data
      setSkills(skillList);
    });

    // Return the unsubscribe function to clean up the listener when the component unmounts
    return () => {unsubscribe();skillunsubscribe();}
  }, []);

  useEffect(() => {
    // Log the updated currTeam whenever it changes
    console.log("Current Team:", currTeam);
  }, [currTeam]);
  const generatePrompt = async () => {
    const jsonData = {
      query: prompt,
    };
    try {
      const response = await axios.post("http://localhost:8000/", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const promptresponse = (response.data.toLowerCase().split(','));
      setResponseData(promptresponse);
      //const names = promptresponse.split(""); // Handle successful response

      // const filteredObjects = skills.filter(obj =>
      //   obj.selectedSkills.some(value => responseData.includes(value.toLowerCase()))
      // );


      // Normalize input skills to lowercase and trim whitespace
      const normalizedInputSkills = promptresponse.map(skill => skill.toLowerCase().trim());
      console.log(normalizedInputSkills)

      // Filter candidates based on the normalized skills
      const suitableCandidates = skills.filter(candidate =>
        candidate.selectedSkills.some(skill =>
          normalizedInputSkills.includes(skill.toLowerCase().trim())
        )
      );

      // Extract the empid of the suitable candidates
      const empIds = suitableCandidates.map(candidate => candidate.empid);
      const finalTeam = employees.filter( emp => ( empIds.includes(emp.empid))).filter(emp =>emp.available==true)
      console.log(finalTeam);
      setCurrTeam(finalTeam)

      const finalTeamEmpIds = employees
    .filter(emp => empIds.includes(emp.empid))
    .filter(emp => emp.available === true)
    .map(emp => emp.id);
  console.log(finalTeamEmpIds)
  setShowCurrTeam(finalTeamEmpIds)

      // finalTeam.forEach(d => {
      //   setShowCurrTeam((prev)=>[...prev,d.empid,d.fname])
      // });

      //alert(promptresponse + " => \n" + JSON.stringify(skills) + " => \n" +(empIds));
      // const JData = {
      //   employee: skills,
      //   skills : promptresponse
      // };
      // const getEmployeeIDresponse = await axios.post("http://localhost:8000/getEmpID", JData, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // const employeeID = (getEmployeeIDresponse.data.toLowerCase().split(','));
      // //alert(promptresponse + " => " + JSON.stringify(skills) + " => " + JSON.stringify(filteredObjects) + "=> "+employeeID);

    } catch (err) {
      setError(err.response ? err.response.data : "An error occurred");
      alert(err); // Handle error
    }
  };

  const buttonStyles =
    "bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50";

  const handleSubmitTeam = (e) => {
    e.preventDefault();
    
    const db = getFirestore(app);
    addDoc(collection(db, "team"), {
      pname,
      priority,
      currTeam,
    }).then(() => {
      navigate("/viewteams");
    });
  };

  const handleSubmitAiTeam = (e) => {
    e.preventDefault();
    
    const db = getFirestore(app);
    addDoc(collection(db, "team"), {
      pname,
      priority,
      currTeam:showCurrTeam,
    }).then(() => {
      navigate("/viewteams");
    });
  };

  return (
    <div className="ml-5 pt-28">
      <div className="flex flex-cols gap-4 my-2 items-center justify-start">
        <h3 className="font-semibold">Enter Project Name : </h3>
        <input
          type="text"
          value={pname}
          onChange={(e) => setPName(e.target.value)}
          className="border rounded-lg border-gray-400 p-1"
          placeholder="Project..."
        ></input>
      </div>
      <div className="flex flex-cols gap-2 my-2 items-center justify-start">
        <h3 className="font-semibold">Project Priority : </h3>
        <button
          className="px-5 font-semibold text-white rounded-lg bg-red-500"
          onClick={() => {
            setPriority("high");
          }}
        >
          High
        </button>
        <button
          className="px-5 font-semibold text-white rounded-lg bg-blue-500"
          onClick={() => {
            setPriority("medium");
          }}
        >
          Medium
        </button>
        <button
          className="px-5 font-semibold text-white rounded-lg bg-green-500"
          onClick={() => {
            setPriority("low");
          }}
        >
          Low
        </button>
      </div>
      Priority set to {priority}
      <div className="flex flex-cols gap-4 my-2 items-center justify-center">
        <button className={buttonStyles} onClick={() => setIsCustom(false)}>
          Ai assisted team creation
        </button>
        <button className={buttonStyles} onClick={() => setIsCustom(true)}>
          Customised Team creation
        </button>
      </div>
      <div>
        {isCustom ? (
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
                          <button
                            className="font-medium text-{blue}-600  hover:underline"
                            onClick={() => {
                              setCurrTeam((prev) => [...prev, doc.id]);
                            }}
                          >
                            Add
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
              <h2 className="p-7">New Team</h2>
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
                    if (currTeam.includes(doc.id)) {
                      // Check if the doc.id is in currTeam
                      return (
                        <tr
                          key={doc.id}
                          className="odd:bg-white even:bg-gray-50 border-b"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                          >
                            {doc.fname}
                          </th>
                          <td className="px-6 py-4">{doc.empid}</td>
                          <td className="px-6 py-4">{doc.dept}</td>
                          <td className="px-6 py-4">{doc.exp}</td>
                          <td className="px-6 py-4">
                               <button
                              className="font-medium text-blue-600 hover:underline"
                              onClick={() =>
                                setCurrTeam((prev) =>
                                  prev.filter((id) => id !== doc.id)
                                )
                              }
                            >
                              remove
                            </button>
                          </td>
                        </tr>
                      );
                    } else {
                      return null; // Return null if doc.id is not in currTeam
                    }
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex flex-cols gap-4 my-2 items-center justify-center">
              <button className={buttonStyles} onClick={handleSubmitTeam}>
                Create Team
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            {/* /<input type='text' size={100} maxLength={100} className='m-3 border-2 rounded-lg text-start bg-gray-50 h-40 ' placeholder="Enter your prompt..." onChange={(e)=>{setPrompt(e.target.value)}}></input> */}

            <textarea
              maxLength={1000}
              rows={4}
              cols={50}
              className="m-3 border-2 rounded-lg text-start bg-gray-50 "
              placeholder="Enter your prompt..."
              onChange={(e) => {
                setPrompt(e.target.value);
                console.log(prompt);
              }}
              name="promptSpace"
            />
            <button
              className={buttonStyles}
              onClick={() => {
                generatePrompt();
              }}
            >
              Generate Team
            </button>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
              <h2 className="p-7">New Team</h2>
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
                  {currTeam.map((doc) => {
       
                      // Check if the doc.id is in currTeam
                      return (
                        <tr
                          key={doc.id}
                          className="odd:bg-white even:bg-gray-50 border-b"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                          >
                            {doc.fname}
                          </th>
                          <td className="px-6 py-4">{doc.empid}</td>
                          <td className="px-6 py-4">{doc.dept}</td>
                          <td className="px-6 py-4">{doc.exp}</td>
                          <td className="px-6 py-4">
                               <button
                              className="font-medium text-blue-600 hover:underline"
                              onClick={() =>
                                setCurrTeam((prev) =>
                                  prev.filter((id) => id !== doc.id)
                                )
                              }
                            >
                              remove
                            </button>
                          </td>
                        </tr>
                      );
          
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex flex-cols gap-4 my-2 items-center justify-center">
              <button className={buttonStyles} onClick={handleSubmitAiTeam}>
                Create Team
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-cols gap-4 my-2 items-center justify-center">
              <button className={buttonStyles} onClick={handleSubmitTeam}>
                Create Team
              </button>
            </div>
      </div>
    </div>
  );
}
