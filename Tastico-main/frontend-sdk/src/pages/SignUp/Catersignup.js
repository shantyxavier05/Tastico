import React from 'react'
import { useState } from 'react';
import Inputfield from '../../components/TextInput';
import axios from 'axios';
export default function Catersignup() {
    const [companyAddress, setCompanyAddress] = useState("");
    const [companyFullName, setCompanyFullName] = useState("");
    const [dish, setDish] = useState("");
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [ph,setPh]=useState("")
    async function signup(){
        const res= axios.post("http://localhost:3001/auth/csignup2",{cname:companyFullName,caddress:companyAddress,password:password,dish:dish,email:email,ph:ph})
    }
  return (
    <>
     <div className="flex flex-col">
      <p className="mb-6">
        Create your account. It's a three step process and will only take a
        minute!
      </p>
      <div className="mt-5">
        <Inputfield
          type="text"
          placeholder="Company Name"
          valueState={[companyFullName, setCompanyFullName]}
          className="border-gray-300 py-1 px-2 rounded"
        />
        <Inputfield
          type="text"
          placeholder="Company Address"
          valueState={[companyAddress, setCompanyAddress]}
          className="border-gray-300 py-1 px-2 rounded"
        />
        <Inputfield
          type="text"
          placeholder="signature dish"
          valueState={[dish, setDish]}
          className="border-gray-300 py-1 px-2 rounded"
        />
        <Inputfield
          type="text"
          placeholder="email"
          valueState={[email, setEmail]}
          className="border-gray-300 py-1 px-2 rounded"
        />
         <Inputfield
          type="password"
          placeholder="password"
          valueState={[password, setPassword]}
          className="border-gray-300 py-1 px-2 rounded"
        />
        <Inputfield
          type="text"
          placeholder="phno"
          valueState={[ph, setPh]}
          className="border-gray-300 py-1 px-2 rounded"
        />
        <button style={{backgroundColor:"red"}} onClick={signup}>Signup</button>
      </div>
      </div>
    
    
    </>
  )
}
