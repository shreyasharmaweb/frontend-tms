import axios from "axios";

export const OrganisationUser=async(token:string) => {
  const config = { headers: { Authorization: `bearer ${token}` } };
    const res= axios.get('http://localhost:8001/org/Allorg',config)
      .then(res => res.data)
      .catch(err => console.log(err));
      return res;
}