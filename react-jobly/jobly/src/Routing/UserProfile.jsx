import React, { useState, useContext } from "react";
import JoblyApi from "../api";
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

  const [saveConfirmed, setSaveConfirmed] = useState(false);  // Success message state

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    
    const { firstName, lastName, email, password } = formData;
    const profileData = { firstName, lastName, email, password };
    let updatedUser;

    try {
      // Save updated profile data via API
      updatedUser = await JoblyApi.saveProfile(formData.username, profileData);
      setFormData(f => ({ ...f, password: "" }));  // Clear password
      setSaveConfirmed(true);  // Show success message
      alert("successful update")
      // Update the user context with the new data
      setCurrentUser(updatedUser);
    } catch (errors) {
      alert("failed to update")  // Set errors if API call fails
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
      <h3>User Profile</h3>
      <div className="card">
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
        </div>
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
