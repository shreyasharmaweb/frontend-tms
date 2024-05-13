import  { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import Organisation from '../../services/OrganisationUserApi'
export default function OrganisationUser() {
  const [org, setOrg] = useState<EType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    Organisation.OrganisationUser()
      .then(res => setOrg(res))
      .catch(err => console.log(err));
  }, []);
  
  const handleUser = (key:string) => {
    navigate(`/userform/${key}`);
  }

  return (
    <div>
        <h1>Select Any Organisation</h1>
      {org.map((e:EType, i:number) => (
        <div className='Org' key={i}>
          <h2>{e.name}</h2>
          <button onClick={()=>handleUser(e.name)}>Select</button>
        </div>
      ))}
    </div>
  );
}
