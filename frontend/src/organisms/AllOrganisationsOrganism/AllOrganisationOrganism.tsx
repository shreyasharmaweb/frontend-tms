import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Modal, Tooltip, Whisper } from "rsuite";
import { ToastContainer, toast } from "react-toastify";
import "./AllOrganisation.style.scss";
import allOrg from "../../services/AllOrganisationApi";
import AddOrg from "../AddOrganisationOrganism/AddOrganisationOrganism";
import React from "react";
import CheckIcon from "@rsuite/icons/Check";
import CreativeIcon from "@rsuite/icons/Creative";
import GearIcon from "@rsuite/icons/Gear";
import { Cookies } from "react-cookie";
import { Table } from "rsuite";
import { Navbar, Nav } from "rsuite";

const { Column, HeaderCell, Cell } = Table;
import allorg from "../../services/AddOrganisationApi";
interface Orgs {
  org_name: string;
  name: string;
}
interface FilterOptions {
  type: string;
  status: string;
  due_date: string;
  created_date: string;
  updated_date: string;
  assignee: string;
}

// Add state variables for confirmation modal

export default function Orgs() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [data, setData] = useState<Orgs[]>([]);
  const navigate = useNavigate();
  const [toggle, Settoggle] = useState(false);
  const [openmodal, SetopenModal] = useState(false);
  const [filtered, Setfiltered] = useState<FilterOptions>({
    type: "",
    status: "",
    due_date: "",
    created_date: "",
    updated_date: "",
    assignee: "",
  });

  const [alltickets, setalltickets] = useState<any>([]);

  const [confirmDeleteOrg, setConfirmDeleteOrg] = useState(false);
  const [orgToDelete, setOrgToDelete] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    Seterr({ org_name: "", name: "" });
    setOpen(false);
    SetopenModal(false);
  };

  const fetchData = () => {
    allOrg
      .allOrgs(token)
      .then((res) => setData(res))
      .catch((err) => console.log("error", err));
  };

  const fetchTicktes = () => {
    allOrg
      .allTickets(token, filtered)
      .then((res) => {
        setalltickets(res);
      })
      .catch((err) => {
        console.log("errors", err);
      });
    
  };
  useEffect(() => {
    if (!cookies.get("token")) {
      navigate("/System_User");
    }
    fetchData();
    fetchTicktes();
  }, [filtered]);

  const Add = (name: string) => {
    navigate(`/UserOrg/${name}`);
  };

  // Function to open the confirmation modal
  const handleConfirmDelete = (orgName: string) => {
    setOrgToDelete(orgName);
    setConfirmDeleteOrg(true);
  };

  const handleDeactivate = (orgName: string) => {
    allOrg.del(orgName).then(() => {
      fetchData();
    });
  };
  // Function to handle actual deletion of organization
  const confirmDeactivateOrg = (orgName: string) => {
    handleDeactivate(orgName);
    setConfirmDeleteOrg(false);
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

  const logout = () => {
    cookies.remove("token");
  
      navigate("/");
    
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    //console.log("weaerfsgrdth");
    const flag = form();
    if (flag) {
      try {
        const response = await allorg.add(neworg, token);
        fetchData();
       // console.log("done", response);
        if (!response.data.success) {
          toast.error("Organisation Exist");
        }
        handleClose();
        toast("Organisation Added");
      } catch (error) {
       // console.error("Error:", error);
      }
    }
  };

  const handleBack = async () => {
    Setfiltered({
      type: "",
      status: "",
      due_date: "",
      created_date: "",
      updated_date: "",
      assignee: "",
    });
    //console.log(filtered);
    
    // fetchTicktes();
    handleClose();
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    Setfiltered({ ...filtered, [e.target.name]: e.target.value });
    
  };
 // console.log(filtered);
  return (
    <>
      <Navbar>
        <Navbar.Brand href="#"> Admin</Navbar.Brand>
        <Nav>
          <Button
            onClick={() => {
              navigate("/Allusers");
            }}
            className="btnnavbar"
            appearance="primary"
          >
            Users
          </Button>
        </Nav>
        <Nav pullRight>
          <Button
            className="btnnavbar"
            appearance="primary"
            onClick={() => {
              SetopenModal(true);
            }}
          >
            Filter
          </Button>
          <Button className="btnnavbar" appearance="primary" onClick={logout}>
            Logout
          </Button>
        </Nav>
      </Navbar>
      <h1 className="text-2xl font-bold mb-4">Organisations</h1>
      <div className="flex flex-wrap -mx-4">
        {data.map((e: Orgs, i: number) => (
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4 flex-grow" key={i}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg  mb-2">{e.name.toUpperCase()}</h2>
              <p className="text-gray-600">{e.org_name}</p>
              <p>{}</p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleConfirmDelete(e.org_name)}
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
                        <span style={{ color: "red" }} className="span">
                          {err.orgname}
                        </span>
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
                        <span style={{ color: "red" }} className="span">
                          {err.nameOrg}
                        </span>
                      )}
                      <br />
                      <button
                        className="subbtn"
                        type="submit"
                        onClick={() => {
                          Seterr({ org_name: "", name: "" });
                        }}
                      >
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
        }}
      >
      
        <Table virtualized height={800} width={1000} data={alltickets}>
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
                  speaker={<Tooltip>{rowData.assignee.split("@")[0]}</Tooltip>}
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
          <Modal.Title>Filter Tickets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="typefilter">
              <h1>Type</h1>
              <select
                name="type"
                className="typeselect"
                value={filtered.type}
                onChange={handleFilterChange}
              >
                <option value="">Select Type</option>
                <option value="Story">Story</option>
                <option value="Bug">Bug</option>
                <option value="Task">Task</option>
              </select>
            </div>
            <div className="Statusfilter">
              <h1>Status</h1>
              <select
                name="status"
                className="typeselect"
                value={filtered.status}
                onChange={handleFilterChange}
              >
                <option value="">Select Status</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="INTESTING">INTESTING</option>
                <option value="INPROGRESS">INPROGRESS</option>
                <option value="TOBEPICKED">TOBEPICKED</option>
              </select>
            </div>
            <div className="Duefilter">
              <h1>Due Date</h1>
              <input
                className="typeselect"
                name="due_date"
                value={filtered.due_date}
                onChange={handleFilterChange}
                type="date"
              ></input>
            </div>
            <div className="Createdfilter">
              <h1>Created Date</h1>
              <input
                className="typeselect"
                name="created_date"
                value={filtered.created_date}
                onChange={handleFilterChange}
                type="date"
              ></input>
            </div>
            <div className="Updatedfilter">
              <h1>Updated Date</h1>
              <input
                className="typeselect"
                name="updated_date"
                value={filtered.updated_date}
                onChange={handleFilterChange}
                type="date"
              ></input>
            </div>
            <div className="Assigneefilter">
              <h1>Assignee</h1>

              <select
                className="assinguser"
                name="assignee"
                value={filtered.assignee}
                onChange={handleFilterChange}
                required
              >
                <option value="">Select Email</option>
                {Array.from(
                  new Set(alltickets.map((user: any) => user.assignee))
                ).map((assignee: any, index: number) => (
                  <option key={index}>{assignee}</option>
                ))}
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleBack();
            }}
            appearance="subtle"
          >
            Clear
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        keyboard={false}
        open={confirmDeleteOrg}
        onClose={() => setConfirmDeleteOrg(false)}
      >
        <Modal.Header>
          <Modal.Title>Confirm Deactivation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to deactivate the organization{" "}
          <strong>{orgToDelete}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => confirmDeactivateOrg(orgToDelete)}
            appearance="primary"
          >
            Yes
          </Button>
          <Button
            onClick={() => setConfirmDeleteOrg(false)}
            appearance="subtle"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="fixed bottom-4 right-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold  py-10 px-4 rounded"
          onClick={() => {
            navigate("/Organitional_user");
          }}
        >
          Add User
        </button>
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
      <ToastContainer></ToastContainer>
    </>
  );
}
