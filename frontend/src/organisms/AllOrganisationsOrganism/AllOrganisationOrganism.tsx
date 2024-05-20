import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Modal, Tooltip, Whisper } from "rsuite";
import "./AllOrganisation.style.scss";
import allOrg from "../../services/AllOrganisationApi";
import AddOrg from "../AddOrganisationOrganism/AddOrganisationOrganism";
import React from "react";
import CheckIcon from "@rsuite/icons/Check";
import CreativeIcon from "@rsuite/icons/Creative";
import GearIcon from "@rsuite/icons/Gear";
import { Cookies } from "react-cookie";
import { Table } from "rsuite";
import { Navbar, Nav } from 'rsuite';



const { Column, HeaderCell, Cell } = Table;
import allorg from "../../services/AddOrganisationApi";
interface Orgs {
  org_name: string;
  name: string;
}

export default function Orgs() {
  const cookies = new Cookies();
  const token=cookies.get("token");
  const [data, setData] = useState<Orgs[]>([]);
  const navigate = useNavigate();
  const [toggle, Settoggle] = useState(false);
  const [openmodal,SetopenModal]=useState(false);
  const [alltickets, setalltickets] = useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose =
    () => {
      setOpen(false);
      SetopenModal(false);
    }

 
  const fetchData = () => {
    allOrg
      .allOrgs(token)
      .then((res) => setData(res))
      .catch((err) => console.log("error", err));
  };

  const fetchTicktes = () => {
    allOrg
      .allTickets(token)
      .then((res) => {
        setalltickets(res);
      })
      .catch((err) => {
        console.log("errors", err);
      });
    console.log(alltickets);
  };
  useEffect(() => {
    if(!cookies.get("token")){
      navigate('/System_User');
   }
    fetchData();
    fetchTicktes();
  }, []);

  const Add = (name: string) => {
    navigate(`/UserOrg/${name}`);
  };

  const handleDeactivate = (orgName: string) => {
    allOrg.del(orgName).then(() => {
      fetchData();
    });
  };

  const onToggle = () => {
    fetchData();
    Settoggle(false);
  };

  const [neworg, setNeworg] = useState({
    org_name: "",
    name: "",
  });

  const [err, Seterr] = useState<{ [key: string]: string }>({});
  const form = () => {
    const error: { [key: string]: string } = {};

    if (!neworg.org_name.trim()) {
      error.orgname = "Please enter key";
    }

    if (!neworg.name.trim()) {
      error.nameOrg = "Please enter name";
    }
    Seterr(error);

    if (Object.keys(error).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setNeworg((prev) => ({ ...prev, [name]: value }));
  };

  const logout=()=>{
    cookies.remove("token");
    if(!cookies.get("token")){
       navigate('/System_User');
    }
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const flag = form();
    if (flag) {
      try {
        const response = await allorg.add(neworg,token);
        fetchData();
        console.log("done", response);
        handleClose();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return (
    <>
    <Navbar>
    <Navbar.Brand href="#"> Admin</Navbar.Brand>
    <Nav>
      <Button onClick={()=>{navigate("/Allusers")}} className="btnnavbar" appearance="primary">Users</Button>
        
    </Nav>
    <Nav pullRight>
     <Button className="btnnavbar" appearance="primary" onClick={()=>{SetopenModal(true)}}>Filter</Button> 
    <Button className="btnnavbar" appearance="primary" onClick={logout}>Logout</Button>
     
    </Nav>
  </Navbar>
      <h1 className="text-2xl font-bold mb-4">Organisations</h1>
      <div className="flex flex-wrap -mx-4">
        {data.map((e: Orgs, i: number) => (
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4 flex-grow" key={i}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg  mb-2">{e.name.toUpperCase()}</h2>
              <p className="text-gray-600">{e.org_name}</p>
              <p>{ }</p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    handleDeactivate(e.org_name);
                  }}
                >
                  Deactivate
                </button>
                <Modal keyboard={false} open={open} onClose={handleClose}>
                  <Modal.Header>
                    <Modal.Title>Add Organisation</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        className="orgnew"
                        placeholder="Enter your key name"
                        name="org_name"
                        value={neworg.org_name}
                        onChange={handleChange}
                      />
                      <br />
                      {err.orgname && (
                        <span style={{color:"red"}} className="span">{err.orgname}</span>
                      )}
                      <br />
                      <input
                        type="text"
                        className="orgnew"
                        placeholder="Enter name"
                        name="name"
                        value={neworg.name}
                        onChange={handleChange}
                      />
                      <br />
                      {err.nameOrg && (
                        <span style={{color:"red"}} className="span">{err.nameOrg}</span>
                      )}
                      <br />
                      <button className="subbtn" type="submit">
                        Submit
                      </button>
                    </form>
                  </Modal.Body>
                </Modal>

                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => Add(e.name)}
                >
                  Users
                </button>
              </div>
            </div>
          </div>
        ))}
        {toggle && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div>
              <AddOrg tog={onToggle} />
            </div>
          </div>
        )}
      </div>

      <h1 className="alltickets">Tickets</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          // marginTop: "200px",
        }}
      >
        <Table virtualized height={800}  width={1000} data={alltickets}>
          <Column width={70} align="center" fixed>
            <HeaderCell>Organisation</HeaderCell>
            <Cell dataKey="organisation" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Type</HeaderCell>
            <Cell>
              {(rowData) => {
                let icon = null;
                switch (rowData.type) {
                  case "Story":
                    icon = <CreativeIcon />;
                    break;
                  case "Bug":
                    icon = <GearIcon />;
                    break;
                  case "Task":
                    icon = <CheckIcon />;
                    break;
                  default:
                    icon = null;
                    break;
                }
                return (
                  <div>
                    {icon} {rowData.type}
                  </div>
                );
              }}
            </Cell>
          </Column>

          <Column width={330}>
            <HeaderCell>Summary</HeaderCell>
            <Cell dataKey="summary" />
          </Column>
          <Column flexGrow={1}>
            <HeaderCell>Assignee</HeaderCell>
            <Cell>
              {(rowData) => (
                <Whisper
                  followCursor
                  speaker={
                    <Tooltip>{rowData.assignee.split("@")[0]}</Tooltip>
                  }
                >
                  <Avatar
                    className="avtarBox"
                    bordered
                    circle
                    src={rowData.reporter.avatar}
                  />
                </Whisper>
              )}
            </Cell>
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Reporter</HeaderCell>
            <Cell>
              {(rowData) => (
                <Whisper
                  followCursor
                  speaker={<Tooltip>{rowData.reporter.split("@")[0]}</Tooltip>}
                >
                  <Avatar
                    className="avtarBox"
                    bordered
                    circle
                    src={rowData.reporter.avatar}
                  />
                </Whisper>
              )}
            </Cell>
          </Column>


          <Column flexGrow={1}>
              <HeaderCell>Status</HeaderCell>
              <Cell>
                {(rowData) => {
                  let statusColor = "";
                  switch (rowData.status) {
                    case "COMPLETED":
                      statusColor = "blue";
                      break;
                    case "TOBEPICKED":
                      statusColor = "green";
                      break;
                    case "INPROGRESS":
                      statusColor = "red";
                      break;
                    default:
                      statusColor = "black";
                      break;
                  }
                  return (
                    <span style={{ color: statusColor }}>{rowData.status}</span>
                  );
                }}
              </Cell>
            </Column>
        </Table>
      </div>
  


      <Modal keyboard={false} open={openmodal} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
       
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>















      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => {
            handleOpen();
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold  py-10 px-4 rounded"
        >
          {" "}
          Add New Organization{" "}
        </button>
      </div>
    </>
  );
}
