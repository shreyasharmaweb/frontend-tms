import { toast } from "react-toastify";

// import {toast } from 'react-toastify';
export const otpSend = async (email: string) => {
    const dataSend = {
        email: email
    }
    // console.log(dataSend);
    try {
       const res= await fetch("http://localhost:8001/sys/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                dataSend
            )
        })
        console.log(res);
        toast.success("OTP SEND");
        console.log("send");
    } catch (err) {
        console.log("not send");
    }   
}

export const otpCheck = async (email: string, otp: string) => {

    const dataSend = {
        email: email,
        otp: otp
    }
    console.log(dataSend);
    try {
        const response = await fetch("http://localhost:8001/sys/otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                dataSend
            )
        })
        //   setflag(true);
        if(!response.ok){
            toast.error("Not Valid OTP");
        }else{
            
            toast.success("User Created");
        }
        console.log(response);
        return response;
    } catch (err) {
        console.log("not send");
    }

}
