
// router imports
import { Link, Routes, Route, BrowserRouter} from "react-router-dom"
//additional components
import HomePage from './Routing/HomePage'
import Jobs from './Jobs'
import Login from './Authorization/Login'
import Signup from "./Authorization/SignUp"
import JobPage from './Routing/JobPage'
import Navigation from './Routing/NavbarComponent'
import Companies from "./Routing/Companies"
import UserProfile from "./Routing/UserProfile"
import 'bootstrap/dist/css/bootstrap.min.css';
import CompanyPage from "./Routing/CompanyPage"

function App() {
  

  return (
<div>
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/users/:username' element={<UserProfile/>}/>
        <Route path='/jobs' element={<Jobs/>}/>
        <Route path='/companies' element={<Companies/>}/>
        <Route path='/companies/:handle' element={<CompanyPage/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/jobs/:id' element={<JobPage/>}/>

      </Routes>
    </BrowserRouter>
</div>
  )
}

export default App
