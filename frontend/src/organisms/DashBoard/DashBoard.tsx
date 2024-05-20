import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Avatar, Table, Tooltip, Whisper } from "rsuite";
import "./DashBoard.style.scss";
import { AvatarGroup } from "rsuite";
import { Modal, Button } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";
import CheckIcon from "@rsuite/icons/Check";
import CreativeIcon from "@rsuite/icons/Creative";

import GearIcon from "@rsuite/icons/Gear";

import { Navbar, Nav } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

interface FilterOptions {
  type: string;
  status: string;
  due_date: string;
}
export default function Dashboard() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [tickets, setTickets] = useState<any>([]);

  const [orgtickets, Setorgtickets] = useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [opended, setOpened] = React.useState(false);
  const [allticketModal, setallticketModal] = React.useState(false);
  const [orgusers, Setorganisationuser] = useState<any>([]);
  const [filter, Setfilter] = useState(false);
  const [id, Setid] = useState();

  const [filterdata, setFilterData] = useState<FilterOptions>({
    type:"",
    status:"",
    due_date:"",
  });



  const [data, setdata] = useState({
    type: "",
    summary: "",
    description: "",
    assignee: "",
    status: "",
    created_date: "",
    updated_date: "",
    due_date: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setallticketModal(false);
    setOpen(false);

  };
  const Open = () => setOpened(true);
  const close = () => setOpened(false);
  const [states, Setstates] = useState<Tms>({
    type: "",
    summary: "",
    description: "",
    assignee: "",
    status: "",
    created_date: "",
    updated_date: "",
    due_date: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    Setstates((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setdata((prev) => ({ ...prev, [name]: value }));
  };
  const senddata = {
    _id: id,
    type: data.type,
    status: data.status,
    due_date: data.due_date,
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const token = cookies.get("token");
    try {
      const response = await axios.post(
        "http://localhost:8001/tms/addticket",
        states,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("doneeqwfvdewdf", response);
      if (response.data.success) {
        toast.success("Ticket Generated");
        fetchAllTickets();
        handleClose();
      } else {
        toast.error("Not in same organisation");
      }
    } catch (error: any) {
      toast.error(error);
      console.error("Error:", error);
    }
  };

  const display = (id: any) => {
    Setid(id);
    const ticket = tickets.find((ticket: { _id: any }) => ticket._id === id);
    setdata(ticket);
    Open();
  };

  useEffect(() => {
    const token = cookies.get("token");
    if (!token) {
      navigate("/loginuser");
    } else {
      fetchTickets(token,filterdata);
      fetchAllTickets();
    }
  }, [filterdata]);

  const logout = () => {
    cookies.remove("token");
    navigate("/loginuser");
  };

  const fetchTickets = async (token: string,filterdata :FilterOptions ) => {
    try {
      const ticketsData = await fetchTicketsData(token,filterdata);
      setTickets(ticketsData);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast.error("Failed To Fetch Tickets");
    }
  };

  const editchanges = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const config = { headers: { Authorization: `bearer ${token}` } };
    await axios.put("http://localhost:8001/tms/update", senddata, config);
    fetchTickets(token,filterdata);
    close();
  };

  const fetchTicketsData = async (token: string , filterdata:FilterOptions) => {
    const queryParams = new URLSearchParams({
      type: filterdata?.type || '',
      status: filterdata?.status || '',
      due_date: filterdata?.due_date || '',
    });

    console.log(queryParams);
    console.log(`http://localhost:8001/tms/getticketUser?${queryParams.toString()}`);
    
    
    const response = await fetch(`http://localhost:8001/tms/getticketUser?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();

      Setorganisationuser(data.organisationOfUser);

      return data.tickets;
    } else {
      throw new Error("Failed to fetch tickets");
    }
  };
  const fetchAllTickets = async () => {
    const config = { headers: { Authorization: `bearer ${token}` } };
    await axios
      .get("http://localhost:8001/tms/alltickets", config)
      .then((res) => {
        Setorgtickets(res.data.tickets);
      })
      .catch((error) => {
        console.error("Error fetching all tickets:", error);
        toast.error("Failed To Fetch All Tickets");
      });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilterData({ ...filterdata, [e.target.name]: e.target.value });
  };


 const noFilter=async()=>{
  setFilterData({
    type:"",
    status:"",
    due_date:""
  })
  fetchTickets(token,filterdata);
  Setfilter(false);
 }
 
  

  return (
    <>
      <div>
        <Navbar className="navbarav">
          <Nav className="avtar">
            <AvatarGroup spacing={20}>
              <Avatar bordered circle src="https://i.pravatar.cc/150?u=2" />
            </AvatarGroup>
            <Button
              onClick={() => {
                setallticketModal(true);
              }}
              className="btnDash"
              appearance="primary"
            >
              Ticktes
            </Button>
          </Nav>
          <Nav>
            <h1 className="user">Welcome {tickets.assignee}</h1>
          </Nav>
          <Nav pullRight>
            <Button className="btnDash" appearance="primary" onClick={() => { Setfilter(true) }}>Filter</Button>
            <Button className="btnDash" appearance="primary" onClick={logout}>
              Logout
            </Button>
          </Nav>
        </Navbar>

        <div className="tab">
          <Table height={400} width={700} data={tickets}>
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

            <Column flexGrow={1}>
              <HeaderCell>Reporter</HeaderCell>
              <Cell>
                {(rowData) => (
                  <Whisper
                    followCursor
                    speaker={
                      <Tooltip>{rowData.reporter.split("@")[0]}</Tooltip>
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
            <Column width={310}>
              <HeaderCell>Summary</HeaderCell>
              <Cell dataKey="summary" />
            </Column>
            <Column width={80} fixed="right">
              <HeaderCell>Update</HeaderCell>
              <Cell style={{ padding: "6px" }}>
                {(_rowData) => (
                  <EditIcon
                    className="editPen"
                    onClick={() => display(_rowData._id)}
                  >
                    Edit
                  </EditIcon>
                )}
              </Cell>
            </Column>
          </Table>
        </div>
        <Modal className="modal" open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>New Ticket</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="mainForm">
                  <div className="types">
                    <div className="task due">
                      <h1 style={{ color: "black" }} className="ty">
                        Type
                      </h1>
                      <select
                        className="tmsSelector"
                        name="type"
                        value={states.type}
                        onChange={handleChange}
                        required
                      >
                        <option>Task</option>
                        <option>Story</option>
                        <option>Bug</option>
                      </select>
                    </div>
                    <div>
                      <h1 style={{ color: "black" }}>Description</h1>
                      <textarea
                        className="textarea"
                        name="description"
                        value={states.description}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <h1 style={{ color: "black" }}>Summary</h1>
                      <input
                        type="text"
                        className="text"
                        name="summary"
                        value={states.summary}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="ussers">
                    <div>
                      <h1 style={{ color: "black" }}>Assignee</h1>
                      <select

                        className="assinguser"
                        name="assignee"
                        value={states.assignee}
                        onChange={handleChange}
                        required
                      >
                        {orgusers.map(
                          (user: Users, i: React.Key | null | undefined) => (
                            <option key={i}>{user.email_id}</option>
                          )
                        )}
                      </select>
                    </div>
                    <div className="status">
                      <h1 style={{ color: "black" }}>Status</h1>
                      <select
                        className="stat"
                        name="status"
                        value={states.status}
                        onChange={handleChange}
                        required
                      >
                        <option>COMPLETED</option>
                        <option>TOBEPICKED</option>
                        <option>INPROGRESS</option>
                        <option>INTESTING</option>

                      </select>
                    </div>
                  </div>
                  <div className="dates">
                    <div className="due">
                      <label style={{ color: "black" }}>Due Date</label>
                      <input
                        type="date"
                        name="due_date"
                        value={states.due_date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="tmsbtn">
                    <Button appearance="primary" className="btn" type="submit">
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
        <Modal className="modal" open={opended} onClose={close}>
          <Modal.Header>
            <Modal.Title
              className="tickettitle"
              style={{ textAlign: "center" }}
            >
              Edit Your Ticket{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="types">
                <div className="task due">
                  <h1 style={{ color: "black" }} className="ty">
                    Type
                  </h1>
                  <select
                    className="tmsSelector"
                    name="type"
                    value={data.type}
                    onChange={handleEdit}
                    required
                  >
                    <option>Task</option>
                    <option>Story</option>
                    <option>Bug</option>
                  </select>
                </div>
                <div>
                  <h1 style={{ color: "black" }}>Description</h1>
                  <textarea
                    className="text"
                    name="description"
                    value={data.description}
                    disabled={true}
                    required
                  />
                </div>
                <div>
                  <h1 style={{ color: "black" }}>Summary</h1>
                  <input
                    type="text"
                    className="text"
                    name="summary"
                    value={data.summary}
                    disabled={true}
                    required
                  />
                </div>
              </div>
              <div className="ussers">
                <div className="assign">
                  <h1 style={{ color: "black" }}>Assignee</h1>
                  <input
                    type="email"
                    className="text"
                    name="assignee"
                    disabled={true}
                    value={data.assignee}
                    required
                  />
                </div>
                <div className="reporter"></div>
                <div className="status">
                  <h1 style={{ color: "black" }}>Status</h1>
                  <select
                    className="stat"
                    name="status"
                    value={data.status}
                    onChange={handleEdit}
                    required
                  >
                    <option>COMPLETED</option>
                    <option>INPROGRESS</option>
                    <option>TOBEPICKED</option>
                    <option>INTESTING</option>
                  </select>
                </div>
              </div>
              <div className="dates">
                <div className="created">
                  <label style={{ color: "black" }}>Created Date </label>
                  <input
                    type="text"
                    name="created_date"
                    value={new Date(data.created_date).toDateString()}
                    disabled={true}
                    required
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="updated">
                  <label style={{ color: "black" }}>Updated Date </label>
                  <input
                    type="text"
                    name="updated_date"
                    value={new Date(data.updated_date).toDateString()}
                    disabled={true}
                    required
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="due">
                  <label style={{ color: "black" }}>Due Date</label>
                  <input
                    type="date"
                    name="due_date"
                    value={data.due_date}
                    onChange={handleEdit}
                    required
                  />
                </div>
              </div>
              <div className="tmsbtn">
                <Button
                  appearance="primary"
                  className="btn"
                  onClick={editchanges}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Modal.Body>
          <ToastContainer position="top-right" />
        </Modal>

        <Modal
          className="ticketmodel"
          keyboard={false}
          open={allticketModal}
          onClose={handleClose}
        >
          <Modal.Header>
            <Modal.Title>Tickets {orgtickets.reporter}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Table
              bordered
              cellBordered
              height={400}
              width={800}
              data={orgtickets}
              onRowClick={(rowData) => {
                console.log(rowData);
              }}
            >
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
              <Column width={300}>
                <HeaderCell>Summary</HeaderCell>
                <Cell dataKey="summary" />
              </Column>
            </Table>
          </Modal.Body>
        </Modal>


        <Modal keyboard={false} open={filter} onClose={() => { Setfilter(false) }}>
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div>
                <h1>Type</h1>
                <select name="type" value={filterdata.type} onChange={handleFilterChange}>
                  <option value="Story">Story</option>
                  <option value="Bug">Bug</option>
                  <option value="Task">Task</option>
                </select>
              </div>

              <div>
                <h1>Status</h1>
                <select name="status" value={filterdata.status} onChange={handleFilterChange}>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="INTESTING">INTESTING</option>
                  <option value="INPROGRESS">INPROGRESS</option>
                  <option value="TOBEPICKED">TOBEPICKED</option>
                </select>
              </div>

              <div>
                <h1>Due Date</h1>
                <input name="due_date" value={filterdata.due_date} onChange={handleFilterChange} type="date"></input>
              </div>
              <Modal.Footer>
                <Button onClick={() => { Setfilter(false) }}>
                  Filter
                </Button>
                <Button onClick={noFilter} appearance="primary">
                  Clear
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>

        </Modal>
        <Button className="btnDashd" appearance="primary" onClick={handleOpen}>
          Create
        </Button>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}
