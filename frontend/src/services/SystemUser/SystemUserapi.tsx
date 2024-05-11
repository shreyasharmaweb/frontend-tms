
import {toast } from 'react-toastify';
export const otpSend = async (email: string) => {
    const dataSend = {
        email: email
    }
    // console.log(dataSend);
    try {
         await fetch("http://localhost:8001/sys/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                dataSend
            )
        })
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
        toast.success("User Created");
        //   setflag(true);
        return response;
        // console.log("send");
    } catch (err) {
        console.log("not send");
    }

}
