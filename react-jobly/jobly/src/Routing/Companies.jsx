import React, {useEffect, useState} from "react";
import JoblyApi from "../ApiHelperClass/api";
import { Link } from "react-router-dom";

const Companies = () => {
    const [companies, setCompanies] = useState([])
// use effect here so that the jobs listings load only once when a user hits the route.
useEffect(() => {
    const getCompanies = async () => {
        const companies = await JoblyApi.fetchCompanies();
        setCompanies(companies);
    }
    getCompanies();
},[])

    return (
        <div>
            <h1>Companies</h1>
            <div style={{
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
                gap: "15px"
            }}>
                {companies.length > 0 ? (companies.map((c, idx) => (
                    <div 
                    style={{
                        textAlign: "center",
                        backgroundColor: "#FFFD",
                        border: "1px solid #ccc", 
                        padding: "15px", 
                        borderRadius: "8px", 
                        width: "275px", 
                        boxShadow: "1px 4px 8px rgba(0, 0, 0, 0.1)"
                    }}
                    key={idx}>
                    {/* //here i've added a link to a single job page based off of the company handle. */}
                        <Link to={`/companies/${c.handle}`} style={{textDecoration: "none"}}>{c.name}</Link>
                        <hr />
                        <p><b >Description:</b><br />{c.description}</p>
                        <p><b >Handle:</b><br />{c.handle}</p>
                    </div>
                ))
            ) : (
                <p>No companies found</p>
            )}
            </div>
        </div>
    )
}

export default Companies;