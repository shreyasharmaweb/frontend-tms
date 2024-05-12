import axios from "axios";

export  const allusers= async()=>{
  const res= await axios.get("http://localhost:8001/orguser/Allusers")
    .then(res => {
      return res.data})
    .catch(error => {throw error})

  return res;
}