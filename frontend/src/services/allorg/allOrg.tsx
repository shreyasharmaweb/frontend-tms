import axios from "axios";

export const allOrgs=async()=>{
  const res=await  axios.get('http://localhost:8001/org/Allorg')
    .then(res=> {return res.data})
    .catch(err=>{console.log(err)});
    return res;
}
export const del=async (key:string)=>{
    
    try {
       await fetch(`http://127.0.0.1:8001/org/delete/${key}`, {
        method: "DELETE"
        
      })
    } catch (error) { /* empty */ } 
}

