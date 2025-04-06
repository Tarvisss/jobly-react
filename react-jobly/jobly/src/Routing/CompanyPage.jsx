import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import JoblyApi from "../api";


const CompanyPage = () => {

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

    if (company === null) {
        return <p>Loading company details...</p>;
    }

    return (
        <div style={{
            
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
                <button><Link to="/companies" >Back to companies.</Link></button>
            </div>
        </div>
    );
}

export default CompanyPage;