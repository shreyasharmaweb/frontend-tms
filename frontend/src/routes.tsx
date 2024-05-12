import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from './pages/Login/LoginMain'
import System_User from './pages/SystemUserMain/SystemUserPage'
import AllUsers from './pages/AllUsers/AllUser'
import AllOrg from './pages/AllOrganisations/AllOrganisations'
import Filter from './organisms/FilterUser/FilterUsers'
import AddOrg from './pages/AddOrganisationPage/AddOrganisation'
import Choice from './pages/OrganisationUser/OrganisationUser'
import Form from './organisms/FormUser/Form'
import Tms from './organisms/Tms/Tms'
export default function routes() {
return (
    <div>
         <BrowserRouter>
              <Routes>
                  <Route path='/' element= {<Login/>} />
                  <Route path="/System_User" element={<System_User/>}/>
                  <Route path="/Allusers" element={<AllUsers/>}/>
                  <Route path="/Orgs" element={<AllOrg/>} />
                  <Route path="/UserOrg/:id" element={<Filter />} />
                  <Route path='/Orgnew' element={<AddOrg/>} />
                  <Route path='Organitional_user' element={<Choice/>}/>
                  <Route path='userform/:key' element={<Form/>}/>
                  <Route path='/tms/:id/:name' element={<Tms/>}/>
              </Routes>
         </BrowserRouter>
    </div>
  )
}