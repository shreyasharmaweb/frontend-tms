import { NavLink } from 'react-router-dom';
import './loginAll.scss'

export default function Login(props: UserLogin) {
  const user = props.link;
  const userLink = `/${user}`;

  return (
    <div className="box bg-gray-100 rounded-lg shadow-md p-6">
      <div className="inner1">
        <h1 className="text-3xl font-bold">{props.user}</h1>
        <h4 className="text-gray-600">{props.tagline}</h4>
      </div>
      <div className="inner2 mt-4">
        <NavLink
          to={userLink}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          SingUp
        </NavLink>
       <h1 style={{color:"black"}}>Already having account?</h1>
        <NavLink to={"/loginuser"} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Login</NavLink>
      </div>
    </div>
  );
}
