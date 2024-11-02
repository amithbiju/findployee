import React, { useState } from 'react'
import { useEffect } from 'react';
import { collection,getDocs, getFirestore, onSnapshot } from "firebase/firestore";
import { app } from "../firebase/config";

export default function CreateTeam() {
  const [isCustom,setIsCustom] = useState(true);
  const [prompt,setPrompt] = useState('');
  const [employees, setEmployees] = useState([]);
  const [currTeam,setCurrTeam] = useState([])
  const [showCurrTeam,setShowCurrTeam] = useState(false)
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

  useEffect(()=>{

  },[currTeam])

  const buttonStyles =
  "bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50";

  return (
    <div className='ml-5'>
      <div className='flex flex-cols gap-4 my-2 items-center justify-start'>
      <h3 className='font-semibold'>Enter Project Name : </h3>
      <input type="text" className="border rounded-lg border-gray-400 p-1" placeholder='Project...'></input>
      </div>
      <div className='flex flex-cols gap-4 my-2 items-center justify-start'>
      <h3 className='font-semibold'>Project Priority : </h3>
      High,Medium,Low
      </div>
      <div className='flex flex-cols gap-4 my-2 items-center justify-center'>
        <button className={buttonStyles} onClick={()=>setIsCustom(false)}>Ai assisted team creation</button>
        <button className={buttonStyles} onClick={()=>setIsCustom(true)}>Customised Team creation</button>
      </div>
      <div>
      {isCustom?
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
                          onClick={()=>{setCurrTeam((prev)=>([...prev,doc.id]));console.log(currTeam)}}
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
      </div>
        :
        <div className='flex flex-col items-center justify-center'>
          {/* /<input type='text' size={100} maxLength={100} className='m-3 border-2 rounded-lg text-start bg-gray-50 h-40 ' placeholder="Enter your prompt..." onChange={(e)=>{setPrompt(e.target.value)}}></input> */}

          <textarea maxLength={100} rows={4} cols={50} className='m-3 border-2 rounded-lg text-start bg-gray-50 ' placeholder="Enter your prompt..." onChange={(e)=>{setPrompt(e.target.value);console.log(prompt)}} name="promptSpace" />
            <button className={buttonStyles}>Generate Team</button>
        </div>
        
      }
      </div>
    </div>
  )
}
