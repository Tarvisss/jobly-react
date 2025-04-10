import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../Authorization/UserContext";

// Update ProtectedRoute to expect children instead of a prop like 'element'
const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(UserContext);

    // If there's no currentUser, redirect to the home page
    if (!currentUser) {
        return <Navigate to="/" />;
    }

    // Otherwise, render the children (which are the protected components)
    return children;
};

export default ProtectedRoute;
