import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from "react";
import JoblyApi from "../api";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    // set initial state 
    const [formState, setFormState] = useState({
        username: "",
        password: "",
        email:"",
        firstName: "",
        lastName: "",
    })
// dynamic handler to change the values in the form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(state => ({ 
            ...state,
             [name]: value
        }));
    }
// Now the handleLogin function will use the custom method from the helper functions imported as api.js
const handleSignup = async (e) => {
    e.preventDefault();
    // Destructure the required fields from formState
    const { username, password, email, firstName, lastName } = formState;
    // Call the SignUpUser function with the required arguments
    const signupResponse = await JoblyApi.SignUpUser(username, password, email, firstName, lastName);
    // if recieved store token in local storage
    if (signupResponse) {
        localStorage.setItem("authToken", signupResponse.token);
    }
    //send the new user to the jobs page
    navigate("/jobs");
}

    return (
        <div>
             <h1>Create Account</h1>
             <Form onSubmit={handleSignup}>
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

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control 
                    type="email"
                    name="email" 
                    value={formState.email}
                    placeholder="Enter Email"
                    onChange={handleChange} /> 
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control 
                    type="text"
                    name="firstName" 
                    value={formState.firstName}
                    placeholder="Enter First Name"
                    onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control 
                    type="text"
                    name="lastName" 
                    value={formState.lastName}
                    placeholder="Enter Last Name"
                    onChange={handleChange} />
                  <Button variant="primary" type="submit">Sign Up</Button> 
                </Form.Group>
            </Form>
            
        </div>
    )
}

export default Signup;