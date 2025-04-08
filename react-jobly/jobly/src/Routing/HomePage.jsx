import {useContext} from "react";
import UserContext from "../Authorization/UserContext";
import { Link } from "react-router-dom";
const HomePage = () => {
    const {currentUser} = useContext(UserContext);
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
            <h1 style={{ margin: "3rem" }}>Welcome to Jobly</h1>
            {currentUser ? 
                (<div style={{ gap: "5px" }}>
                    <h4>Use the Navbar or the links below to begin.</h4>
                    <Link to="/jobs" className="ms-3">Job Board</Link>
                    <Link to="/companies" className="ms-3">Companies</Link>
                </div>     
                ) : ( 
                    <div style={{ gap: "5px" }}>
                        <h4>Please login or join to explore.</h4>
                        <Link to="/login" className="ms-3">Login</Link>
                        <Link to="/signup" className="ms-3">Sign Up</Link>
                    </div>
                ) 
            }
        </div>
    </div>
    )
}

export default HomePage;