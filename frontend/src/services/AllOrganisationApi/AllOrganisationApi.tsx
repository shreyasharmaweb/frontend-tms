import axios from "axios";


export const allOrgs=async(token:any)=>{
  const config = { headers: { Authorization: `bearer ${token}` } };
  const res=await  axios.get('http://localhost:8001/org/Allorg',config)
    .then(res=> {return res.data})
    .catch(err=>{console.log(err)});
    return res;
}

export const allTickets=async(token:any)=>{
  const config = { headers: { Authorization: `bearer ${token}` } };
  const res =await axios.get('http://localhost:8001/sys/getAllTickets',config)
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

