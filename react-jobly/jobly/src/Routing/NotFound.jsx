import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const returnTimer = setTimeout(() => {
            navigate('/')
        }, 5000);

        return () => clearTimeout(returnTimer);
    }, [navigate]);
        
    return(
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <div className="text-center">
      <h1>Page Not Found</h1>
      <p>You will be redirected to the homepage shortly.</p>
    </div>
  </div>
    )
}

export default NotFound;