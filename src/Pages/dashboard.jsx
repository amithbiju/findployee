import React from 'react'

export default function Dashboard() {
    // styling
    
    const buttonStyles = 'bg-black px-5 py-2 text-white rounded-lg'
    
    
    const username = "Dev"

    const addEmployeeOnClick = () =>{
        alert("Clicked add employee");
    }
    const createTeamOnClick = () =>{
        alert("Clicked Create Team");
    }
    const viewTeamsOnClick = () =>{
        alert("Clicked View Teams");   
    }



    return (
    <div >
      <span className='flex justify-start mx-4 my-4 text-3xl'>Welcome, {username}</span>
      <div className='flex flex-row items-center gap-4 justify-center'>
        <button className={buttonStyles} onClick={addEmployeeOnClick}>Add Employee</button>
        <button className={buttonStyles} onClick={createTeamOnClick}>Create Team</button>
        <button className={buttonStyles} onClick={viewTeamsOnClick}>View Teams</button>
      </div>

    </div>
  )
}
