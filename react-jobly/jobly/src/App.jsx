import { useState, useEffect } from "react"
// router imports
import { Link, Routes, Route, BrowserRouter} from "react-router-dom"
//additional components
import HomePage from './Routing/HomePage'
import Jobs from './Routing/Jobs'
import Login from './Authorization/Login'
import Signup from "./Authorization/SignUp"
import JobPage from './Routing/JobPage'
import Navigation from './Routing/NavbarComponent'
import Companies from "./Routing/Companies"
import UserProfile from "./Routing/UserProfile"
import 'bootstrap/dist/css/bootstrap.min.css';
import CompanyPage from "./Routing/CompanyPage"
import UserContext from './Authorization/UserContext';
import ProtectedRoute from "./Routing/ProtectedRoute"
import NotFound from "./Routing/NotFound"
//Styles
import "./App.css"

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  // const [applicationIds, setApplicationIds] = useState(new Set([]));
  useEffect(() => {
    const savedUser = localStorage.getItem("currUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Update the user in localStorage whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
<div>
    <BrowserRouter>
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Navigation/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='*' element={<NotFound/>}/>
        //Protected routes
        <Route path='/users/:username' element={<ProtectedRoute elememt={<UserProfile/>}/>}/>
        <Route path='/jobs' element={<ProtectedRoute elememt={<Jobs/>}/>}/>
        <Route path='/companies' element={<ProtectedRoute elememt={<Companies/>}/>}/>
        <Route path='/companies/:handle' element={<ProtectedRoute elememt={<CompanyPage/>}/>}/>
        <Route path='/jobs/:id' element={<ProtectedRoute elememt={<JobPage/>}/>}/>
      </Routes>
      </UserContext.Provider>
    </BrowserRouter>
</div>
  )
}

export default App
