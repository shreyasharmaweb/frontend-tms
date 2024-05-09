import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from './pages/Login/loginMain'
import System_User from './pages/SystemUserMain/systemUserPage'
import AllUsers from './pages/allUser/allUser'
import AllOrg from './pages/AllOrg/allOrg'
import Filter from './organisms/filterUser/filterUsers'
export default function routes() {
return (
    <div>
         <BrowserRouter>
              <Routes>
                  <Route path='/' element= {<Login/>} />
                  <Route path="/System_User" element={<System_User/>}/>
                  <Route path="Allusers" element={<AllUsers/>}/>
                  <Route path="/Orgs" element={<AllOrg/>} />
                  <Route path="/UserOrg/:id" element={<Filter/>} />
              </Routes>
         </BrowserRouter>
    </div>
  )
}

