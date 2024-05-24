import axios from "axios";
import { Cookies } from 'react-cookie';
const cookies=new Cookies();
export  const allusers= async()=>{
  const token=cookies.get("token");
  const config = { headers: { Authorization: `bearer ${token}` } };
  const res= await axios.get("http://localhost:8001/orguser/Allusers",config)
    .then(res => {
      return res.data})
    .catch(error => {throw error})

  return res;
}
