import { useEffect, useState } from "react";
import { Modal, Button, ButtonToolbar} from "rsuite";
import { useNavigate } from "react-router-dom";
import Organisation from "../../services/OrganisationUserApi";
import "./OrganisationsUser.style.scss";
import "../FormUser/Form.style.scss";
import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
export default function OrganisationUser() {
  const [org, setOrg] = useState<EType[]>([]);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [orgJoinDate, setOrgJoinDate] = useState("");

  const [modalDataId, setModalDataId] = useState("");

  useEffect(() => {
    Organisation.OrganisationUser()
      .then((res) => setOrg(res))
      .catch((err) => console.log(err));
  }, []);



  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log(org);
    try {
      const response = await axios.post(
        "http://localhost:8001/orguser/signup",
        {
          organisation: modalDataId,
          email_id: email,
          first_name: firstName,
          last_name: lastName,
          dob,
          org_join_date: orgJoinDate,
        }
      );

      console.log("done", response);
      if (response.status == 201) {
        navigate("/loginuser");
      }
    } catch (error) {
      toast.error("User Already Exist");
      console.error("Error:", error);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = (name: string) => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <h1 style={{ color: "black" }} className="selectorg">
        Select Any Organisation
      </h1>
      <div className="orgus">
        {org.map((e: EType, i: number) => (
          <div className="Org" key={i}>
            <h2 className="ho">{e.name.toUpperCase()}</h2>
            <ButtonToolbar>
              <Button
                onClick={() => {
                  setModalDataId(e.name);
                  handleOpen(e.name);
                }}
              >
                {" "}
                Open
              </Button>
            </ButtonToolbar>

            <Modal open={open} onClose={handleClose}>
              <Modal.Header>
                <Modal.Title>User Register Form</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="formval px-4 py-8">
                  <form
                    className="bg-white border rounded-lg shadow-md px-8 py-6 space-y-4"
                    onSubmit={handleSubmit}
                  >
                    <div className="required">
                      <label className="block" htmlFor="email">
                        Email: <span style={{ color: "red" }}>*</span>
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
                        First Name: <span style={{ color: "red" }}>*</span>
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
                        Last Name:<span style={{ color: "red" }}>*</span>
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
                        DOB:<span style={{ color: "red" }}>*</span>
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
                        Join Date:<span style={{ color: "red" }}>*</span>
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
               
              </Modal.Body>
            </Modal>
          </div>
        ))}
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
}
