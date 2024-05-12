import axios from "axios";

export const add= async(neworg:EType)=>{
    const response = await axios.post("http://localhost:8001/org/signup", neworg);
    return response
}
