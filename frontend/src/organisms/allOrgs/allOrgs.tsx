import {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';

import './allOrg.scss'

import allOrg from '../../services/allorg'

interface Orgs{
    org_name:string,
    name:string
}

export default function Orgs() {

  const[data,Setdata]=useState<Orgs[]>([]);
  const navigate=useNavigate();
  
  
  useEffect(()=>{
    allOrg.allOrgs()
    .then(res=>Setdata(res))
    .catch(err=>console.log('error',err));    
  },[])
  

  const Add = (name:string) => {
    navigate(`/UserOrg/${name}`);
  }
  
 
  return (
    <>
    <h1>Organisations</h1>
    <div className='main' >
      
        <div className='Orge'>
          <h2>Adding more Organisations </h2>
        <NavLink className='nav' to='/Orgnew'>ADD</NavLink>
        </div>
      {data.map((e:EType,i:number) => (
        <div className='Org'>
        <li key={i}>
          <h2>{e.name}</h2>
          <h2>{e.org_name}</h2>
          <ul>
          
          </ul>
          <button onClick={()=>{
            allOrg.del(e.org_name)
            navigate(0);
          }}>Deactivate</button>
          <br/>
          <button onClick={() => Add(e.name)}>Users</button>
        </li>
        </div>
      ))}
    </div>
    </>
  );
}
