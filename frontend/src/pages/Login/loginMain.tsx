import Login from '../../molecules/LoginAll/loginAll'
import './loginMain.scss'
export default function Login_main() {
  return (
   
    <div className='mainn'>
      <Login user="System_User" tagline="Maintaining whole TMS"  color="white" fontColor="#9A639F" className='div'/>
      <Login user="Organitional_user" tagline="User of a organization" color="#9A639F" fontColor="white" className='div'/>
    </div>
    
  )
}
