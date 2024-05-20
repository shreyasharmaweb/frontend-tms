import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Form.style.scss";

const Userform = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [orgJoinDate, setOrgJoinDate] = useState("");

  useEffect(() => {
    console.log("Key:", key);
    if (key) setOrg(key);
  }, [key]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log(org);
    try {
      const response = await axios.post(
        "http://localhost:8001/orguser/signup",
        {
          key,
          organisation: org,
          email_id: email,
          first_name: firstName,
          last_name: lastName,
          dob,
          org_join_date: orgJoinDate,
        }
      );
      console.log("done", response);
      navigate("/loginuser");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="formval px-4 py-8">
      <h1 className=" text-2xl font-bold mb-8">User Form</h1>
      <div className="max-w-md mx-auto">
        <form
          className="bg-white border rounded-lg shadow-md px-8 py-6 space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block" htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="w-full border rounded px-4 py-2"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block" htmlFor="firstName">
              First Name:
            </label>
            <input
              id="firstName"
              type="text"
              className="w-full border rounded px-4 py-2"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block" htmlFor="lastName">
              Last Name:
            </label>
            <input
              id="lastName"
              type="text"
              className="w-full border rounded px-4 py-2"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label className="block" htmlFor="dob">
              DOB:
            </label>
            <input
              id="dob"
              type="date"
              className="w-full border rounded px-4 py-2"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label className="block" htmlFor="orgJoinDate">
              Join Date:
            </label>
            <input
              id="orgJoinDate"
              type="date"
              className="w-full border rounded px-4 py-2"
              value={orgJoinDate}
              onChange={(e) => setOrgJoinDate(e.target.value)}
              required
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Userform;
