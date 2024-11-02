import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


export default function CreateTeam() {
  const [isCustom,setIsCustom] = useState(true);
  const [prompt,setPrompt] = useState('');


  const buttonStyles =
  "bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50";

  return (
    <div className='ml-5'>
      <div className='flex flex-cols gap-4 my-2 items-center justify-start'>
      <h3 className='font-semibold'>Enter Project Name : </h3>
      <input type="text" className="border rounded-lg border-gray-400 p-2" placeholder='Project...'></input>
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
        <div>

        </div>
        :
        <div className=''>
          <input type='text' className='max-w-screen m-3 border-2 w-[75%] rounded-lg h-80 bg-gray-50' onChange={(e)=>{setPrompt(e.target.value)}}></input>
        </div>
      }
      </div>
    </div>
  )
}
