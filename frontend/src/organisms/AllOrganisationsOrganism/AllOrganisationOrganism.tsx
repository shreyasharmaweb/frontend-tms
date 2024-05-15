// import { useEffect, useState } from 'react';
// import {  useNavigate } from 'react-router-dom';
// import './AllOrganisation.style.scss';
// import allOrg from '../../services/AllOrganisationApi';
// import AddOrg from '../AddOrganisationOrganism/AddOrganisationOrganism'
// interface Orgs {
//   org_name: string;
//   name: string;
// }
// export default function Orgs() {
//   const [data, setData] = useState<Orgs[]>([]);
//   const navigate = useNavigate();
//   const [toggle,Settoggle]=useState(false);
//   const fetchData = () => {
//     allOrg
//       .allOrgs()
//       .then(res => setData(res))
//       .catch(err => console.log('error', err));
//   };
//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const Add = (name: string) => {
//     navigate(`/UserOrg/${name}`);
//   };

//   const handleDeactivate = (orgName: string) => {
//     allOrg.del(orgName).then(() => {
//       fetchData();
//     });
//   };
//   const addorg=()=>{
//     console.log("toggled");
//     Settoggle(true);
//   }
//   const onToggle=()=>{
//     fetchData()
//     Settoggle(false)
//   }
  
//   return (
//     <>
//       <h1 className="text-2xl font-bold mb-4">Organisations</h1>
//       <div className='flex flex-wrap -mx-4'>
//         {data.map((e: Orgs, i: number) => (
//           <div className='w-full md:w-1/2 lg:w-1/4 px-4 mb-4 flex-grow' key={i}>
//             <div className='bg-white rounded-lg shadow-md p-6'>
//               <h2 className='text-lg  mb-2'>{e.name.toUpperCase()}</h2>
//               <p className='text-gray-600'>{e.org_name}</p>
//               <p>{}</p>
//               <div className='flex justify-between mt-4'>
//                 <button
//                   className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
//                   onClick={() => {
//                     handleDeactivate(e.org_name);
//                   }}
//                 >
//                   Deactivate
//                 </button>
               
//                 <button
//                   className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
//                   onClick={() => Add(e.name)}
//                 >
//                   Users
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//         {toggle && (
//           <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
//             <div>
//               <AddOrg tog={onToggle} />
//             </div>
//           </div>)}
//       </div>
//       <div className='fixed bottom-4 right-4'>
//         <button
//           className='bg-blue-500 hover:bg-blue-600 text-white font-bold  py-10 px-4 rounded'
//           onClick={addorg} 
//         > Add New Organization </button>
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from 'react';

import {  useNavigate } from 'react-router-dom';
import { Modal, Button} from 'rsuite';
import './AllOrganisation.style.scss';
import allOrg from '../../services/AllOrganisationApi';
import AddOrg from '../AddOrganisationOrganism/AddOrganisationOrganism'
import React from 'react';
import allorg from '../../services/AddOrganisationApi';
interface Orgs {
  org_name: string;
  name: string;
}
export default function Orgs() {
  const [data, setData] = useState<Orgs[]>([]);
  const navigate = useNavigate();
  const [toggle,Settoggle]=useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fetchData = () => {
    allOrg
      .allOrgs()
      .then(res => setData(res))
      .catch(err => console.log('error', err));
  };
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const Add = (name: string) => {
    navigate(`/UserOrg/${name}`);
  };

  const handleDeactivate = (orgName: string) => {
    allOrg.del(orgName).then(() => {
      fetchData();
    });
  };
  
  const onToggle=()=>{
    fetchData()
    Settoggle(false)
  }
  
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

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setNeworg(prev=>({...prev, [name]: value }));
  };
  const handleSubmit = async (e: { preventDefault: () => void; }) => {

    e.preventDefault(); 
    const flag=form();
    if(flag){
    try {
      const response=await allorg.add(neworg);
      console.log("done", response); 
      handleClose()
    } catch (error) {
      console.error("Error:", error);
    }
   }
  };
  return (
    <>
     
      <h1 className="text-2xl font-bold mb-4">Organisations</h1>
      <div className='flex flex-wrap -mx-4'>
        {data.map((e: Orgs, i: number) => (
          <div className='w-full md:w-1/2 lg:w-1/4 px-4 mb-4 flex-grow' key={i}>
            <div className='bg-white rounded-lg shadow-md p-6'>
              <h2 className='text-lg  mb-2'>{e.name.toUpperCase()}</h2>
              <p className='text-gray-600'>{e.org_name}</p>
              <p>{}</p>
              <div className='flex justify-between mt-4'>
                <button
                  className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
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
            <input type='text'  className='orgnew' placeholder='Enter your key name' name='org_name' value={neworg.org_name} onChange={handleChange} />
            <br/>
            {err.orgname && <span className='span'>{err.orgname}</span>}<br/>
            <input type='text' className='orgnew' placeholder='Enter name' name='name' value={neworg.name} onChange={handleChange} />
            <br/>
            {err.nameOrg && <span className='span'>{err.nameOrg}</span>}<br/>
            <button className='subbtn' type="submit">Submit</button>
          </form>       
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

                <button
                  className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
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
          </div>)}
      </div>
      <div className='fixed bottom-4 right-4'>
        <button 
        onClick={()=>{
         
          handleOpen()}}
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold  py-10 px-4 rounded'
        > Add New Organization </button>
      </div>
    </>
  );
}

