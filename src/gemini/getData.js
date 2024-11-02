import React, { useEffect, useState } from 'react'
import { collection,getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'

export default function GetData() {
    useEffect(()=>{
        getSkills();
    },[])
    const [skills,setSkills] = useState([]);
    const getSkills = async () =>{
        const querySnapshot = await getDocs(collection(db, "skills"));
        querySnapshot.forEach((doc) => {
            setSkills((prevSkills) => [...prevSkills, doc.id]);
        }
    );
    const string = ""
    skills.map((d) =>{

    })
    }
    return <div>{skills.map((d)=>{
        return <div key={d}>{d}</div>
    })}</div>
}
