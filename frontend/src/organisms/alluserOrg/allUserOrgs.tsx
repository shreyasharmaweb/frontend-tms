import  { useEffect, useState } from 'react'
import allUserservice from '../../services/allUserSystem';
import './AllUserOrgs.scss'
export default function AllUsers() {
    interface alluser{
        email_id:string,
        first_name:string,
        last_name:string,
        organisation:string,
        dob:Date,
        org_join_date:Date   
    }
    //I-interface(Pascle)
    const[users,Setusers]=useState<alluser[]>([]);
    useEffect(()=>{
      allUserservice.allusers().then(res => Setusers(res))
      console.log(users)
    },[users]);

    const formatDate = (dateString: string | number | Date) => {
      return new Date(dateString).toLocaleDateString();
    };
  return (
    <>
    <h1 className='all_user'>Users</h1>
    <div className='mainAll'> 
       {users.map((e:Users,i:number)=>{    
        return (
            <div> 
                <div className='AllUserss' key={i}>
                <h2>{e.email_id}</h2>
                <h2>{e.first_name}</h2>
                <h2>{e.last_name}</h2>
                <h2>{formatDate(e.dob)}</h2>
                <h2>{formatDate(e.org_join_date)}</h2>
                </div>
            </div>
        )
       })}
     </div>
     </>
  )
}
