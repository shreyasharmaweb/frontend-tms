import Login from '../../molecules/LoginAll/loginAll';
import './loginMain.scss';

export default function LoginMain() {
  return (
    <div className="main-container">
      <div className="flex flex-col justify-center items-center h-screen"> 
        <div className='mainnN flex justify-center items-center flex-wrap mt-8'> 
        <div className="login-box">
            <Login link="Organitional_user" user="Welcome! User" tagline="Welcome to our Task Management System! Log in to access your dashboard and start managing tasks with ease" fontColor="white" className='div' color="#9A639F"/>
          </div>
          <div className="login-box">
            <Login link="System_User" user="Welcome! Admin" tagline="Welcome to our Task Management System! Empower Your Operations: Mastering TMS at Your Fingertips" fontColor="#9A639F" className='div' color="white" />
          </div>
          
        </div>
      </div>
    </div>
  );
}
