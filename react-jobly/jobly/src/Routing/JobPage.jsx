import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import JoblyApi from "../ApiHelperClass/api";
import { useNavigate } from "react-router-dom";


const JobPage = () => {
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const { id } = useParams();
    
    useEffect(() => {
        const getJob = async () => {
            try {
                const job = await JoblyApi.fetchJob(id)
               
                setJob(job);
            } catch (error) {
                console.log(error)
            }
        }
        getJob();
    },[id])

    if (job === null) {
        return <p>Loading job details...</p>;
    }
    const handleClick = () => {
        navigate("/jobs")
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
            <div
                style={{
                    backgroundColor: "#FFFD",
                    border: "1px solid #ccc",   
                    padding: "20px",             
                    borderRadius: "8px",         
                    width: "400px",             
                    boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)", 
                    textAlign: "center",       
                }}
            >
                <h1>{job.title}</h1>
                <p>Company: {job.company.name}</p>
                <p>Salary: {job.salary}</p>
                <p>Equity: {job.equity === "0" || job.equity === null ? "none" : job.equity}</p>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                    }}
                >
                    <button onClick={handleClick} className="btn btn-primary btn-block mt-4">
                        Apply
                    </button>
                    <button onClick={handleClick} className="btn btn-primary btn-block mt-4">
                        Back to job listings
                    </button>
                </div>
            </div>
        </div>
    );
}

export default JobPage;