import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import{ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SystemUserApi from '../../services/SystemUser';
import { Button ,Input} from 'rsuite';
import './systemUser.scss'
export default function System_User() {
    const [otp, setOtp] = useState("");
    const [email,setemail]=useState("");
    const[val,Setval]=useState(false);
    const oncheck=async ()=>{
        console.log(email)
      const res=  await SystemUserApi.otpCheck(email,otp);
    }
      const sendOtp=async ()=>{
        console.log(email)
        await SystemUserApi.otpSend(email)
        Setval(true);
       
    }
    return (
        <div className='m'>
            <h1 className='head'>System User</h1>
            <div className='otp'>
                <Input className='input' type='text' placeholder='Enter your email' value={email} onChange={(val)=>{setemail(val)}} required/>
                {/* <span hidden={handleVal}>Write the email</span> */}
                <Button  onClick={sendOtp}>OTP</Button>
            
             {val&&
                <div >
                <Input className='input' type='text' placeholder='Enter otp' value={otp} onChange={(val) => setOtp(val)} required/><br/>
                <Button className='inside' onClick={oncheck}>Check</Button>
                    <br/>
                <NavLink className='inside' to='/Orgs'>Organisations</NavLink>
                    <br/>
                <NavLink className='inside' to='/Allusers'>Users</NavLink>
                </div>  
                }   
            </div>
            <ToastContainer position="top-right" />
        </div>
    );
}