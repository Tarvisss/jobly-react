
import React, { useContext, useState } from "react";
import JoblyApi from "../ApiHelperClass/api";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

const Login = () => {
    const navigate = useNavigate();
    const {setCurrentUser} = useContext(UserContext)
    const [formState, setFormState] = useState({ username: "", password: ""})

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormState(state => ({ ...state, [name]: value}));
    }
    
// Now the handleLogin function will use the custom method from the helper functions imported as api.js
//
    const handleLogin = async (e) => {
        e.preventDefault();
        const {username, password} = formState;
        const loggedInToken = await JoblyApi.LoginUser(username,password);

//save token to local storage if user successfully logs in
if (loggedInToken) {
    const userData = {
      authToken: loggedInToken,  // Store the token
      username: username,        // Store the username
    };
    setCurrentUser(userData);
  
    // Save the user data as a stringified JSON object
    localStorage.setItem("currUser", JSON.stringify(userData));
  
    // After saving, navigate to the jobs page
    navigate("/jobs");
  } else {
    alert("Incorrect Credentials");
  }
  
// send user to the jobs page after logging in.
        
}
    return (
        <div>
             <h1>Please Login</h1>
             <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control 
                    type="text"
                    name="username" 
                    value={formState.username}
                    placeholder="Enter Username" 
                    onChange={handleChange}/>
               
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password"
                    name="password" 
                    value={formState.password}
                    placeholder="Password"
                    onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Text className="text-muted">
                    We'll never share your personal data with anyone else.
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login
                </Button>
            </Form>
        </div>
    )
}

export default Login;