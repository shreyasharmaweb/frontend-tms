import { Input } from "rsuite";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { ToastContainer,toast } from 'react-toastify';
export default function LoginOrganisationUser() {
  const cookies = new Cookies();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [org, Setorg] = useState("");
  const [check, setcheck] = useState(false);

  useEffect(() => {
    if (cookies.get("token")) {
      navigate("/dashboard");
    }
  });

  const navigate = useNavigate();

  const sentUserOtp = async () => {
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
        setcheck(true);
        toast.success("OTP SEND");
        }else{
            toast.error("User Invalid")
        }
    } catch (err) {
      console.log("not send");
    }
  };
  const SubmitCheck = async () => {
    const data = {
      email_id: email,
      otp: otp,
      organisation: org,
    };
    const res = await axios.post(
      "http://localhost:8001/orguser/loginuser",
      data
    );
    console.log(res.data);
    if (res.data.success) {
      cookies.set("token", res.data.token);
      navigate("/dashboard", { state: { name: email } });
    }
  };
  return (
    <>
    <div>
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
            {!check&&
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
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(val) => setOtp(val)}
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

    </div>
    <ToastContainer position="top-right" />
    </>
  );
}
