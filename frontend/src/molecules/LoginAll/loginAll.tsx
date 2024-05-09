import {  NavLink } from 'react-router-dom';
import './loginAll.scss'
export default function Login(props:UserLogin) {
  const bg = props.color;
  const fontColor = props.fontColor;
  const user = props.user;
  const userLink = `/${user}`;
  return (
    <div className='box' style={{ backgroundColor: bg }}>
      <div className='inner1' style={{ color: fontColor }}>
        <h1>{props.user}</h1>
        <h4>{props.tagline}</h4>
      </div>
      <div className='inner2'>
         <NavLink to={userLink}>Login</NavLink>
      </div>
    </div>
  );
}
