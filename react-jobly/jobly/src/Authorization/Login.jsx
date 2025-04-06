import axios from "axios";
import React, { useState } from "react";
import JoblyApi from "../api";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
    const [formState, setFormState] = useState({ username: "", password: ""})

    const handlePassWordChange = (e) => {
        setFormState(state => ({ ...state, password: e.target.value}));
    }
    const handleUsernameChange = (e) => {
        setFormState(state => ({ ...state, username: e.target.value}));
    }
// Now the handleLogin function will use the custom method from the helper functions imported as api.js
//
    const handleLogin = async (e) => {
        e.preventDefault();
        const {username, password} = formState;
        const loggedIntoken = await JoblyApi.LoginUser(username,password);
//save token to local storage if recieved
        if (loggedIntoken) {
            localStorage.setItem("authToken", signupResponse.token);
        }
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
                    onChange={handleUsernameChange}/>
               
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password"
                    name="password" 
                    value={formState.password}
                    placeholder="Password"
                    onChange={handlePassWordChange} />
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