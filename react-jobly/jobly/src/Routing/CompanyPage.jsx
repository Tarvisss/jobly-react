import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import JoblyApi from "../ApiHelperClass/api";


const CompanyPage = () => {
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const { handle } = useParams();
    
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const company = await JoblyApi.getCompany(handle)
               
                setCompany(company);
            } catch (error) {
                console.log(error)
            }
        }
        fetchCompany();
    },[handle])

    const handleClick = () => {
        navigate("/companies")
    }
    if (company === null) {
        return <p>Loading company details...</p>;
    }

    return (

        <div
        style={{
            display: "flex",        
            justifyContent: "center", 
            alignItems: "center",    
            height: "100vh",        
        }}
    >
             <div style={{
                backgroundColor: "#FFFD",
                margin: "3rem",
                border: "px solid #ccc", 
                padding: "20px", 
                borderRadius: "8px", 
                width: "400px", 
                boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)"
            }}>
                <h1>{company.name}</h1> 
                <p>Company: {company.name} </p>
                <p>Salary: {company.description}</p>
                <div style={{ display: "flex",paddingLeft: "10px", justifyContent: "center", gap: "10px", borderRadius: "8px"}}>
                <button onClick={handleClick} className="btn btn-primary btn-block mt-4">
                             Back to companies
                         </button>
                 </div>
             </div>
        </div>
    );
}

export default CompanyPage;