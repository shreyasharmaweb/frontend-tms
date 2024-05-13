import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import allUserservice from '../../services/AllUserOrganisationApi'
import './FilterUser.style.scss'
export default function UserOrg() {
  const [dataf, setDataf] = useState<Users[]>([]);
  const {id} = useParams();
  console.log(id);
  useEffect(() => {
    allUserservice.allusers()
      .then(res => setDataf(res))
      .catch(err => console.log('error', err));
  }, []); 
  
  const filteredUsers = dataf.filter(user => user.organisation === id);
  console.log(filteredUsers);
  console.log(id);
  console.log('orgName prop:',id);
  const formatDate = (dateString:Date) => {
    return new Date(dateString).toLocaleDateString();
  };
  return (
    <>
    <h1>Users for Organization: {id}</h1>
    <div className='usermain' >
      
      <ul>
        {
          filteredUsers && filteredUsers.length > 0 ? (
            filteredUsers.map((user:Users, i) => (
              <div className='Orgee'>
              <h2 key={i}>{user.first_name}    {user.last_name}</h2>
              <div className='join'>
          <h2>DOB:</h2>
          <h2>{formatDate(user.dob)}</h2><br/>
             <h2>Joining date:</h2><h2>{formatDate(user. org_join_date)}</h2>
              
              </div>
              </div>
            ))
          ) : (
            <li>No users found</li>
          )
        }
      </ul>
    </div>
    </>
  );
}
