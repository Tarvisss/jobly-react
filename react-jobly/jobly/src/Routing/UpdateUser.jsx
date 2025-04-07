import { useState } from "react";
import { useParams } from "react-router-dom";

const UpdateUserPage = () => {

    const [formState, setFormState] = useState({
            username: "",
            password: "",
            email: "",
            firstName: "",
            lastName: "",
            authToken: ""
        });
    const[isLoading, setIsLoading] = useState(true)
        const {username} = useParams();
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
            const { username, password, email, firstName, lastName, authToken } = formState;
            const updatedUser = await JoblyApi.UpdateUser(username, password, email, firstName, lastName);

            if (updatedUser) {
                setFormState({
                    username: updatedUser.username,
                    password: "", 
                    email: updatedUser.email,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    authToken,
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
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formState.password}
                        placeholder="Enter New Password" 
                        onChange={handleChange}
                    />
                </Form.Group>

                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formState.email}
                        placeholder="Enter new Email"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        value={formState.firstName}
                        placeholder="Enter new first name"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={formState.lastName}
                        placeholder='Enter Last Name'
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit Changes
                </Button>
            </Form>
        </div>
    );
};

export default UpdateUserPage;