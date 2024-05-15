import { Input } from 'rsuite'

import { useState } from 'react'

export default function LoginOrganisationUser() {
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [org,Setorg]=useState("")
    console.log(otp,org,email);
  return (
    <div>
     
<div className='sys flex justify-center items-center h-screen bg-gray-200'>
    <div className='mm'>
        <h1 className='head mb-8 text-3xl text-center text-gray-800'>Organisation User</h1>
        <div className='otpp bg-white p-8 rounded-lg shadow-md flex flex-col items-center'>
            <Input className='email_input' type='text' placeholder='Enter your email' value={email} onChange={(val) => setEmail(val)}  />
            <Input className='email_input' type='text' placeholder='Enter your Organisation' value={org} onChange={(val) => Setorg(val)}  />
                    <Input className='email_input' type='text' placeholder='Enter OTP' value={otp} onChange={(val) => setOtp(val)}/>
                <div className='w-full'>
                <button className='otpbtn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>Get OTP</button>
                    <button className='insidee bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4'>Submit</button>
                    <div className='name flex flex-col items-center'>
                    </div>
                </div>
        </div>
    </div>
</div>
    </div>
  )
}
