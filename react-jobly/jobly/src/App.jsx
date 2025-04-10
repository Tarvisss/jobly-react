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
import JoblyApi from "./ApiHelperClass/api"

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  
  useEffect(() => {
    const savedUser = localStorage.getItem("currUser");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)

      setCurrentUser(parsedUser);

      const fetchAppliedJobs = async () => {
        try {
          const response = await JoblyApi.getAppliedJobs(parsedUser.username)
          setApplicationIds(new Set(response.applications));
        } catch (error) {
          console.error("Error Fetching Jobs")
        }
      }
      fetchAppliedJobs();
    }
  }, []);

  // Update the user info and applied jobs in localStorage whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currUser", JSON.stringify(currentUser));
    }

    if(applicationIds) {
      localStorage.setItem('applicationsIds', JSON.stringify([...applicationIds]));
    }
  }, [currentUser, applicationIds]);

  return (
<div>
    <BrowserRouter>
    <UserContext.Provider value={{ currentUser, setCurrentUser, applicationIds, setApplicationIds}}>
      <Navigation/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='*' element={<NotFound/>}/>
        //Protected routes
        <Route path='/users/:username' element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path='/jobs' element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
        <Route path='/companies' element={<ProtectedRoute><Companies /></ProtectedRoute>} />
        <Route path='/companies/:handle' element={<ProtectedRoute><CompanyPage /></ProtectedRoute>} />
        <Route path='/jobs/:id' element={<ProtectedRoute><JobPage /></ProtectedRoute>} />


      </Routes>
      </UserContext.Provider>
    </BrowserRouter>
</div>
  )
}

export default App
