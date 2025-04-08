import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../Authorization/UserContext";

const ProtectedRoute = ( {elememt}) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    if(!currentUser) {
        return <Navigate to="/"/> 
    }

    return elememt;
}

export default ProtectedRoute;