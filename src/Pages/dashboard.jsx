import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Dashboard() {
    // styling
    
    //const buttonStyles = 'bg-black px-5 py-2 my-3 text-white rounded-lg'
    const buttonStyles = 'bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50'
    const navigate = useNavigate();

    
    const username = "Dev"

    const addEmployeeOnClick = () =>{
        navigate('/addemp');
    }
    const createTeamOnClick = () =>{
        navigate('/createteam');
    }
    const viewTeamsOnClick = () =>{
        navigate('/viewteams');
    }



    return (
        <div>
    <div className='flex flex-col md:flex-row'>
      <div className='bg-blue-600 text-white p-8 md:w-1/2 flex flex-col justify-center '>
        <span className='text-3xl md:text-4xl font-bold mb-4'>Welcome, {username}</span>
        <p class="text-lg mb-6">
            Manage your teams here.
        </p>
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
      <div className='flex flex-row items-center mt-4 gap-4 justify-center'>
        <button className={buttonStyles} onClick={addEmployeeOnClick}>Add Employee</button>
        <button className={buttonStyles} onClick={createTeamOnClick}>Create Team</button>
        <button className={buttonStyles} onClick={viewTeamsOnClick}>View Teams</button>
      </div>
      </div>
  )
}