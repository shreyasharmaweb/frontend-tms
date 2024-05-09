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
    const[flag,setflag]=useState(false);
    
    const oncheck=async ()=>{
        console.log(email)
      const res=  await SystemUserApi.otpCheck(email,otp);
        if(res){
            
            setflag(true);
        }
    }
    return (
        <div className='m'>
            <h1 className='head'>System User</h1>
            <div className='otp'>
                <Input className='input' type='text' placeholder='Enter your email' value={email} onChange={(val)=>{setemail(val)}}/>
                <Button onClick={async ()=>{
                    console.log(email)
                    await SystemUserApi.otpSend(email)
                }} >OTP</Button>
                <Input className='input' type='text' placeholder='Enter otp' value={otp} onChange={(val) => setOtp(val)}/>
               
                <Button onClick={oncheck}>Check</Button>
                     {flag &&
                       <div>
                          <NavLink to='/Orgs'>View Organisations</NavLink>
                      </div>}
                <NavLink to='/Allusers'>View Users</NavLink>
            </div>
            <ToastContainer position="top-right" />
        </div>
    );
}
