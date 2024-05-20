import { useEffect, useState } from 'react';//
import axios from 'axios';
import { useParams } from 'react-router-dom';
import{ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import filterorg from '../../services/Filter';
import './Tms.scss';
import { Cookies } from 'react-cookie';
export default function TMS() {
  const cookies = new Cookies();
  const [names, setNames] = useState<Users[]>([]);
  const { id } = useParams();
  const {name}=useParams();
  const[states,Setstates]=useState<Tms>({
      type:"",
      summary:"",
      description:"",
      assignee:"",  
      status:"",
      created_date:"",
      updated_date:"",
      due_date:""
  });
   
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    Setstates(prev=>({...prev, [name]: value }));
  };

  useEffect(() => {
     filterorg.filter()
      .then(res => setNames(res))
      const token =cookies.get("token")
      console.log(token);
  }, []);
  
  
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); 
    const token =cookies.get("token")
    try {
      const response = await axios.post("http://localhost:8001/tms/addticket", states , {
        headers: {
          "Authorization" : `Bearer ${token}`
        }
    });
      console.log("doneeqwfvdewdf", response);
      if(response.data.success){
        toast.success("Ticket Generated");
      }else{
        toast.error("Not in same organisation");
      }
    } catch (error:any) {
      toast.error(error);
      console.error("Error:", error);
    }
  };

  return (<>
   <h2 className='tmsHeader'>Ticket Generate</h2>
    <div className='tmsForm'>
      <form onSubmit={handleSubmit}  >
     <div className='types'>
      <div className='task due'>
        <h1 className='ty'>Type</h1>
        <select className='tmsSelector' name='type' value={states.type}  onChange={handleChange} required>
          <option>Task</option>
          <option>Story</option>
          <option>Bug</option>
        </select>
      </div>
     
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
      <div className='ussers'>
      <div className='assign' >
        <h1>Assignee</h1>
        {/* <select className='assinguser' name='assignee' value={states.assignee} onChange={handleChange} required>
          {filteredUsers && filteredUsers.length > 0 ? (
            filteredUsers.map((user, i) => (
                
              <option key={i} >{user.first_name}</option>
            ))
          ) : (
            <option>No users found</option>
          )}
        </select> */}
          <input type="text" className='text' name='assignee' value={states.assignee}   onChange={ handleChange} required/>
      </div>
      <div className='reporter'>
        <h1>Reporter</h1>
        {/* <select className='repo' name='reporter' value={states.reporter} onChange={handleChange} required>
          <option>{name}</option>
        </select> */}
         {/* <select className='assinguser' name='reporter' value={states.reporter} onChange={handleChange} required>
          {filteredUsers && filteredUsers.length > 0 ? (
            filteredUsers.map((user, i) => (
                
              <option key={i} >{user.first_name}</option>
            ))
          ) : (
            <option>No users found</option>
          )}
        </select> */}
      
      </div>
      <div className='status'>
        <h1>Status</h1>
        <select className='stat' name='status' value={states.status} onChange={handleChange} required>
          <option >Completed</option>
          <option>Pending</option>
          <option>Incomplete</option>
        </select>
      </div>
      </div>
      <div className='dates'>
      <div className='created'>  
             <label>Created Date  </label>
             <input type='date' name='created_date' value={states.created_date} onChange={ handleChange}  required max={new Date().toISOString().split('T')[0]}/>
      </div>
      <div className='updated'>  
             <label>Updated Date  </label>
             <input type='date' name='updated_date' value={states.updated_date} onChange={ handleChange} required max={new Date().toISOString().split('T')[0]}/>
      </div>
      <div className='due'>  
             <label>Due Date</label>
             <input type='date' name='due_date' value={states.due_date} onChange={ handleChange} required/>
      </div>
      </div>
      <div className='tmsbtn' >
      <button className='btn' type="submit">Submit</button>
      </div>
      </form>
    </div>
    <ToastContainer position="top-right" />

    </>
  );
}