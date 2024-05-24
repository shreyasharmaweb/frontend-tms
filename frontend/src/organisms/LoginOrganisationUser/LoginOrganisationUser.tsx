
import { Input } from "rsuite";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { ToastContainer, toast } from 'react-toastify';

export default function LoginOrganisationUser() {
  const cookies = new Cookies();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [org, Setorg] = useState("");
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (cookies.get("token")) {
      navigate("/dashboard");
    }
  });

  const navigate = useNavigate();

  const sentUserOtp = async () => {
    if(!email){
      toast("Enter valid email")
      return;
    }

    const dataSend = {
      email_id: email,
    };
    try {
      const res = await fetch("http://localhost:8001/orguser/otpsend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSend),
      });
     
      if(res.ok){
        setCheck(true);
        toast.success("OTP SEND");
        }else{
            toast.error("User Invalid")
        }
    } catch (err) {
      console.log("not send");
    }
  };

  const handleOtpChange = (val: any) => {
    if (val.length <= 6) {
      setOtp(val);
    }
  };

  const validateUser = ()=>{
    if(!email || !otp || !org){
      toast.error("Enter all details");
      return false;
    }
    return true;
  }

  const SubmitCheck = async () => {

    if(!validateUser()){
      return;
    }

    const data = {
      email_id: email,
      otp: otp,
      organisation: org,
    };
    try {
      const res = await axios.post(
        "http://localhost:8001/orguser/loginuser",
        data
      );
      console.log(res.data.message , '************');
      if (res.data.success) {
        cookies.set("token", res.data.token);
        navigate("/dashboard", { state: { name: email } });
      } else {
          toast.error(res.data.message);
      }
    } catch (error : any) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
      console.error("Error:", error);
     
    }
  };

  return (
    <>
      <div className="sys flex justify-center items-center h-screen bg-gray-200">
        <div className="mm">
          <h1 className="head mb-8 text-3xl text-center text-gray-800">
            Organisation User
          </h1>
          <div className="otpp bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
            <Input
              className="email_input"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(val) => setEmail(val)}
            />
            {!check &&
              <button
                className="otpbtn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={sentUserOtp}
              >
                Get OTP
              </button>
            }
            {check && (
              <>
                <Input
                  className="email_input"
                  type="text"
                  placeholder="Enter your Organisation"
                  value={org}
                  onChange={(val) => Setorg(val)}
                />
                <Input
                  className="email_input"
                  type="number"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange} 
                />
                <div className="w-full">
                  <button
                    className="insidee bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
                    onClick={SubmitCheck}
                  >
                    Submit
                  </button>
                  <div className="name flex flex-col items-center"></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}

