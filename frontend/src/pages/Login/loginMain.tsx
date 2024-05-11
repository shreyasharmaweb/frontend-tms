import Login from '../../molecules/LoginAll/loginAll'
import './loginMain.scss'
// import { Table } from 'rsuite'
export default function Login_main() {
  return (
   
    <div className='mainn'>
      <Login user="System_User" tagline="Maintaining whole TMS" fontColor="#9A639F" className='div'  color="white" />
      <Login user="Organitional_user" tagline="User of a organization" fontColor="white" className='div' color="#9A639F"/>
      {/* <Table data={[]}></Table> */}
    </div>
    
  )
}
