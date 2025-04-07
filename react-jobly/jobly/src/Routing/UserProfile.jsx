import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from "react";
import JoblyApi from "../api";
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const navigate = useNavigate();

    // Set initial state
    const [formState, setFormState] = useState({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
    });
// Loading state to control form rendering
    const [isLoading, setIsLoading] = useState(true);  

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userInfo = localStorage.getItem('currUser');
                const parsedUserInfo = JSON.parse(userInfo);

                if (!parsedUserInfo?.authToken) {
                    alert("You must log in first.");
                    navigate("/login");
                    return;
                }

                const currentUser = await JoblyApi.getUser(parsedUserInfo.username);
                console.log(currentUser)
                const user = currentUser.user;
// the empty strings are in case there isn't any info on on the form
                setFormState({
                    username: user.username || '',
                    password: "",
                    email: user.email || '',
                    firstName: user.firstName || '',
                    lastName: user.lastName || '',
                });

                setIsLoading(false);  // Done loading, update state
            } catch (error) {
                console.error("Failed to fetch user data", error);
                alert("Error fetching user data.");
                setIsLoading(false);  // Done loading, even if there is an error
            }
        };

        fetchUserData();
    }, [navigate]);

    // Dynamic handler to change the values in the form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(state => ({
            ...state,
            [name]: value
        }));
    };

    // Handle update user information
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { username, password, email, firstName, lastName } = formState;
            const updatedUser = await JoblyApi.UpdateUser(username, password, email, firstName, lastName);

            if (updatedUser) {
                setFormState({
                    username: updatedUser.username,
                    password: "", 
                    email: updatedUser.email,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                });

                alert("Update successful!");
                navigate("/user");
            } else {
                alert("Something went wrong while updating.");
            }
        } catch (error) {
            console.error("Error updating user", error);
            alert("Failed to update user.");
        }
    };

    // Check if loading, and render loading message
    if (isLoading) {
        return <div>Loading...</div>;  // Optionally show a loading indicator
    }

    return (
        <div>
            <h1>User Account</h1>
            <Form onSubmit={handleUpdate}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formState.username}
                        placeholder={formState.username || 'Enter Username'}
                        onChange={handleChange}
                        disabled // Username is not typically editable
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formState.password}
                        placeholder="Leave blank to keep current password"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formState.email}
                        placeholder={formState.email || 'Enter Email'}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        value={formState.firstName}
                        placeholder={formState.firstName || 'Enter First Name'}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={formState.lastName}
                        placeholder={formState.lastName || 'Enter Last Name'}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </div>
    );
};

export default UserProfile;
