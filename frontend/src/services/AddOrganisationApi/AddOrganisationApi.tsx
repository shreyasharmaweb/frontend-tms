import axios from "axios";

export const add= async(neworg:EType,token:any)=>{
    const config = { headers: { Authorization: `bearer ${token}` } };
    const response = await axios.post("http://localhost:8001/org/signup", neworg,config);
    console.log(response);
    
    return response
}
