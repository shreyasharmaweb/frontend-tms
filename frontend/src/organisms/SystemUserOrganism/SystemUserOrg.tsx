import { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SystemUserApi from '../../services/SystemUser';
import { Input } from 'rsuite';
import { Cookies } from "react-cookie";
import './SystemUser.style.scss'
import Navbar from '../../molecules/LoginAll/Navbar/Navbar'
export default function System_User() {
    const cookies = new Cookies();
    const navigate= useNavigate();
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [val, setVal] = useState(false);
    const [disable, setDisable] = useState(false);
    const [check ,Setcheck]=useState(false);
    const onCheck = async () => {
        console.log(email);
        const res = await SystemUserApi.otpCheck(email, otp);
        if(res){
            if(res.data.success){
                cookies.set("token", res.data.token);
                Setcheck(true);
            }
        }
        console.log(res);
    }
   useEffect(()=>{
    if(cookies.get("token")){
        navigate("/Orgs");
    }
   })
    const sendOtp = useCallback(async () => {
        if (!validateEmail(email)) {
            alert("write valid email")
            console.log("Invalid email format");
            return;
        }
      const res=  await SystemUserApi.otpSend(email);
      if(res?.ok){
          setVal(true);
          setDisable(true);
      }
    }, [email]);

    return (
        <>
     <Navbar/>
<div className='sys flex justify-center items-center h-screen bg-gray-200'>
    <div className='mm'>
        <h1 className='head mb-8 text-3xl text-center text-gray-800'>System User</h1>
        <div className='otpp bg-white p-8 rounded-lg shadow-md flex flex-col items-center'>
            <Input className='email_input' type='text' placeholder='Enter your email' value={email} onChange={(val) => setEmail(val)} required disabled={disable} />
            {!val &&
                <button className='otpbtn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded' onClick={sendOtp} >Get OTP</button>
            }
           
           {val&&
                <div className='w-full'>
                    <Input className='email_input' type='text' placeholder='Enter OTP' value={otp} disabled={!val} onChange={(val) => setOtp(val)} required />
                    <button className='insidee bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4' onClick={onCheck}>Check OTP</button>
                    <div className='name flex flex-col items-center'>
                        {check&&
                        
                        <><NavLink  className='inside mb-2 text-blue-500 hover:underline' to='/Orgs'>Organisations</NavLink>
                        <NavLink className='inside mb-2 text-blue-500 hover:underline' to='/Allusers'>Users</NavLink></>
                        
                        }
                    </div>
                </div>
}
        </div>
        <ToastContainer position="top-right" />
    </div>
</div>
</>
    );
}

function validateEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}



