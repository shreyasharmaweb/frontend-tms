import axios from "axios";

export const OrganisationUser=async() => {
    const res= axios.get('http://localhost:8001/org/Allorg')
      .then(res => res.data)
      .catch(err => console.log(err));
      return res;
}