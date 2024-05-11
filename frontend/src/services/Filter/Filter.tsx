import axios from "axios";

export const filter = async() => {
   const res= await axios.get("http://localhost:8001/orguser/Allusers")
    //   .then(res => res.data)
    //   .catch(err => console.log('error', err));
        console.log(res.data);
      return res.data;
  }
