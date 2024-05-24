import axios from "axios";


export const allOrgs=async(token:any)=>{
  const config = { headers: { Authorization: `bearer ${token}` } };
  const res=await  axios.get('http://localhost:8001/org/Allorg',config)
    .then(res=> {return res.data})
    .catch(err=>{console.log(err)});
    return res;
}

export const allTickets=async(token:any,filtered:any)=>{
  
  const queryParams = new URLSearchParams({
    type: filtered?.type || '',
    status: filtered?.status || '',
    due_date: filtered?.due_date || '',
    created_date: filtered?.created_date || '',
    updated_date: filtered?.updated_date || '',
    assignee:filtered?.assignee || ''
  });

  console.log(`http://localhost:8001/sys/getAllTickets?${queryParams.toString()}`);
  const config = { headers: { Authorization: `bearer ${token}` } };
  const res =await axios.get(`http://localhost:8001/sys/getAllTickets?${queryParams.toString()}`,config)
  .then(res=>{return res.data.users})
  .catch(err=>{console.log(err)})
  
  return res;
}
export const del=async (key:string)=>{
    try {
       await fetch(`http://127.0.0.1:8001/org/delete/${key}`, {
        method: "DELETE"
      })
    } catch (error) {} 
}

