import { useCallback, useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SystemUserApi from "../../services/SystemUser";
import { Input } from "rsuite";
import { Cookies } from "react-cookie";
import "./SystemUser.style.scss";
import Navbar from "../../molecules/LoginAll/Navbar/Navbar";
export default function System_User() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [val, setVal] = useState(false);
  const [disable, setDisable] = useState(false);
  const [check, Setcheck] = useState(false);
  const [otpdisable,Setotpdisable]=useState(false);
  const onCheck = async () => {
      if(!otp){
          toast("Enter OTP First")
          return
      }
   // console.log(email);
    const res = await SystemUserApi.otpCheck(email, otp);
    if (res) {
      if (res.data.success) {
        cookies.set("token", res.data.token);
        Setcheck(true);
      }
    } else {
      toast.error("OTP not correct");
    }
   // console.log(res);
  };
  useEffect(() => {
    if (cookies.get("token")) {
      navigate("/Orgs");
    }
  });
  const sendOtp = useCallback(async () => {
      if (!validateEmail(email)) {
          toast("write valid email");
        //  console.log("Invalid email format");
          return;
        }
        const res = await SystemUserApi.otpSend(email);
        if (res?.ok) {
           Setotpdisable(true);
           setVal(true);
           setDisable(true);
        }
  }, [email]);

  

  return (
    <>
      <Navbar />
      <div className="sys flex justify-center items-center h-screen bg-gray-200">
        <div className="mm">
          <h1 className="head mb-8 text-3xl text-center text-gray-800">
            System User
          </h1>
          <div className="otpp bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
            <Input
              className="email_input"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(val) => setEmail(val)}
              required
              disabled={disable}
            />
            {!val && (
              <button
                className="otpbtn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={sendOtp}
                disabled={otpdisable}
              >
                Get OTP
              </button>
            )}

            {val && (
              <div className="w-full">
                <Input
                  className="email_input"
                  type="number"
                  placeholder="Enter OTP"
                  value={otp}
                  disabled={!val}
                  onChange={(val) => {
                    if (val.length <= 6) {
                      setOtp(val);
                    }
                  }}
                  required
                />
                <button
                  className="insidee bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
                  onClick={onCheck}
                >
                  Check OTP
                </button>
                <div className="name flex flex-col items-center"></div>
              </div>
            )}
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
