import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SystemUserApi from '../../services/SystemUser';
import { Button, Input } from 'rsuite';
import './SystemUser.style.scss';

function validateEmail(email:string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export default function System_User() {
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [val, setVal] = useState(false);
    const [disable, setDisable] = useState(false);

    const onCheck = async () => {
        console.log(email);
        const res = await SystemUserApi.otpCheck(email, otp);
        console.log(res);
        
    }

    const sendOtp = useCallback(async () => {
        if (!validateEmail(email)) {
            alert("write valid email")
            console.log("Invalid email format");
            return;
        }
        await SystemUserApi.otpSend(email);
        setVal(true);
        setDisable(true);
    }, [email]);

    return (
        <div className='mm'>
            <h1 className='head'>System User</h1>
            <div className='otpp'>
                <Input className='input' type='text' placeholder='Enter your email' value={email} onChange={(val) => setEmail(val)} required disabled={disable} />
                <Button onClick={sendOtp}>OTP</Button>

                {val &&
                    <div >
                        <Input className='inputt' type='text' placeholder='Enter otp' value={otp} onChange={(val) => setOtp(val)} required /><br />
                        <Button className='inside' onClick={onCheck}>Check</Button>
                        <br />
                        <NavLink className='inside' to='/Orgs'>Organisations</NavLink>
                        <br />
                        <NavLink className='inside' to='/Allusers'>Users</NavLink>
                    </div>
                }
            </div>
            <ToastContainer position="top-right" />
        </div>
    );
}
