import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import{ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import filterorg from '../../services/Filter';
import './Tms.scss';
export default function TMS() {
  const [names, setNames] = useState<Users[]>([]);
  const { id } = useParams();
  const{name}=useParams();

  const[states,Setstates]=useState<Tms>({
      type:"",
      summary:"",
      description:"",
      assignee:"",  
      reporter:"",
      status:"",
      created_date:"",
      updated_date:"",
      due_date:""
  });
   
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    console.log(name, value);
    Setstates(prev=>({...prev, [name]: value }));
  };

  useEffect(() => {
     const res=filterorg.filter()
      .then(res => setNames(res))
     
  }, []);
  
  const filteredUsers = names.filter(user => user.organisation === id);
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); 
    try {
      const response = await axios.post("http://localhost:8001/tms/addticket", states);
      console.log("done", response);
      toast.success("Ticket Generated");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (<>
   <h1 className='tmsHeader'>Ticket Generate</h1>
    <div className='tmsForm'>
      <form onSubmit={handleSubmit}  >
     
      <div className='task'>
        <h1 className='ty'>Type</h1>
        <select className='tmsSelector' name='type' value={states.type}  onChange={handleChange} required>
          <option>Task</option>
          <option>Story</option>
          <option>Bug</option>
        </select>
      </div>
      <div className='tmstext'>
        <div>
        <h1>Description</h1>
        <input type="text" className='text' name='description' value={states.description}   onChange={ handleChange} required/>
        </div>
        <div>
        <h1>Summary</h1>
        <input type="text" className='text' name='summary' value={states.summary}  onChange={ handleChange} required />
        </div>
      </div>
      <div className='assign' >
        <h1>Assignee</h1>
        <select name='assignee' value={states.assignee} onChange={handleChange} required>
          {filteredUsers && filteredUsers.length > 0 ? (
            filteredUsers.map((user, i) => (
                
              <option key={i} >{user.first_name}</option>
            ))
          ) : (
            <option>No users found</option>
          )}
        </select>
      </div>
      <div className='reporter'>
        <h1>Reporter</h1>
        <select name='reporter' value={states.reporter} onChange={handleChange} required>
          <option>{name}</option>
        </select>
      </div>
      <div className='created'>  
             <label>Created Date  </label>
             <input type='date' name='created_date' value={states.created_date} onChange={ handleChange}  required/>
      </div>
      <div className='updated'>  
             <label>Updated Date  </label>
             <input type='date' name='updated_date' value={states.updated_date} onChange={ handleChange} required/>
      </div>
      <div className='due'>  
             <label>Due Date</label>
             <input type='date' name='due_date' value={states.due_date} onChange={ handleChange} required/>
      </div>
      <div className='status'>
        <h1>Status</h1>
        <select name='status' value={states.status} onChange={handleChange} required>
          <option >Completed</option>
          <option>Pending</option>
          <option>Incomplete</option>
        </select>
      </div>
      <div >
      <button className='btn' type="submit">Submit</button>
      </div>
      </form>
    </div>
    <ToastContainer position="top-right" />

    </>
  );
}