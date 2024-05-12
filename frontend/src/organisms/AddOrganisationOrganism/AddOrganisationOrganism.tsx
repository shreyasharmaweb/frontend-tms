import { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import allorg from '../../services/AddOrganisationApi';

export default function OrgNew() {
  const [neworg, setNeworg] = useState({
    org_name: "",
    name: ""
  });
  const [err,Seterr]=useState<{[key:string]:string}>({});
const form = () => {
  const error: { [key: string]: string } = {};

  if (!neworg.org_name.trim() ) {
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

  const navigate=useNavigate();
  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setNeworg(prev=>({...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {

    e.preventDefault(); 
    const flag=form();
    if(flag){
    try {
      const response=allorg.add(neworg);
      console.log("done", response);
      navigate('/Orgs');
    } catch (error) {
      console.error("Error:", error);
    }
   }
  };

  return (
    <div>
      <div className='m'>
        <div className='otp'>
          <h1>New Organisation</h1>
          <form onSubmit={handleSubmit}> 
            <input type='text' placeholder='Enter your key name' name='org_name' value={neworg.org_name} onChange={handleChange} />
            <br/>
            {err.orgname && <span>{err.orgname}</span>}
            <input type='text' placeholder='Enter name' name='name' value={neworg.name} onChange={handleChange} />
            <br/>
            {err.nameOrg && <span>{err.nameOrg}</span>}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
