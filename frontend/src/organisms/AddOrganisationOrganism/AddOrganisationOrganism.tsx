import { useState  } from 'react';
// import { useNavigate } from 'react-router-dom';
import allorg from '../../services/AddOrganisationApi';

import CloseOutlineIcon from '@rsuite/icons/CloseOutline';
import './AddOrganiastion.scss'
interface Iprop{
  tog:()=>void
}
export default function  OrgNew(props:Iprop){
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

  // const navigate=useNavigate();
  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setNeworg(prev=>({...prev, [name]: value }));
  };
  const handleclose=()=>{
    props.tog();
  }
  const handleSubmit = async (e: { preventDefault: () => void; }) => {

    e.preventDefault(); 
    const flag=form();
    if(flag){
    try {
      const response=allorg.add(neworg);
      console.log("done", response);
      props.tog();
      
    } catch (error) {
      console.error("Error:", error);
    }
   }
  };
  
  return (
    <div className='bg'>
      <div className='m' style={{opacity:1,zIndex:3}}>
        <div className='otp'>
          <div className='boxh'>
            <CloseOutlineIcon className='rsuite' onClick={handleclose}></CloseOutlineIcon>
          <h1 className='neworg' style={{color:"black"}}>New Organisation</h1>
          </div>
          <form onSubmit={handleSubmit}> 
            <input type='text'  className='orgnew' placeholder='Enter your key name' name='org_name' value={neworg.org_name} onChange={handleChange} />
            <br/>
            {err.orgname && <span className='span'>{err.orgname}</span>}<br/>
            <input type='text' className='orgnew' placeholder='Enter name' name='name' value={neworg.name} onChange={handleChange} />
            <br/>
            {err.nameOrg && <span className='span'>{err.nameOrg}</span>}<br/>
            <button className='subbtn' type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

