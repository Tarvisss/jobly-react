import React, { useState, useContext, useEffect } from "react";
import JoblyApi from "../ApiHelperClass/api";
import UserContext from "../Authorization/UserContext";
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  // Initialize form state with current user data
  const [formData, setFormData] = useState({
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: "",  // Password input for changes
  });


  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    // Prevents the default form submission behavior, which causes a page reload
    evt.preventDefault();
    
    // Destructure the necessary values from formData
    const { firstName, lastName, email, password } = formData;
    
    // Initialize a variable to store the updated user data
    let updatedUser;

    try {
      // Attempt to update the user's profile using the UpdateUser API method
      // The formData contains the current user's data, including username, password, email, firstName, and lastName
      updatedUser = await JoblyApi.UpdateUser(formData.username, password, email, firstName, lastName);

      // Clear the password field in the form after a successful update to prevent it from being sent in the future
      setFormData(f => ({ ...f, password: "" })); 

      alert("Profile updated successfully!");

      // Merge the current user data with the updated data returned from the API
      // This ensures the context holds the most up-to-date user info
      const mergedUserData = { ...currentUser, ...updatedUser };

      // Update the global user context with the merged data to ensure the application reflects the latest profile information
      setCurrentUser(mergedUserData);
      navigate("/jobs")
    } catch (errors) {
      alert("Failed to update profile. Please try again.");
    
      return;
    }
};

  const handleLogout = (e) => {
    setCurrentUser(null)
    localStorage.removeItem('currUser')
    navigate('/')
  }

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h1 style={{textAlign: "center", margin: "1.5rem"}}>User Profile</h1>
      {/* <div className="card"> */}
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Username Display */}
            <div className="form-group">
              <label>Username</label>
              <p className="form-control-plaintext">{formData.username}</p>
            </div>

            {/* First Name */}
            <div className="form-group">
              <label>First Name</label>
              <input
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            {/* Last Name */}
            <div className="form-group">
              <label>Last Name</label>
              <input
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password (for confirming changes) */}
            <div className="form-group">
              <label>Confirm password to make changes:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            
            <button
              className="btn btn-primary btn-block mt-4"
              type="submit"
            >
              Save Changes
            </button>
          </form>
        {/* </div> */}
      </div>

      <div className="d-flex justify-content-center mt-4">
            <button
                  onClick={handleLogout}
                  className="btn btn-danger btn-block mt-4"
                  type="submit">
                logout
            </button>
        </div>
        
    </div>
  );
}

export default UserProfile;
