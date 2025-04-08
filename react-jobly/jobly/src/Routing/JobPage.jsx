import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import JoblyApi from "../api";


const JobPage = () => {

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
    const handleApply = () => {
        
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
            <h1>{job.title}</h1> 
            <p>Company: {job.company.name} </p>
            <p>Salary: {job.salary}</p>
            <p>Equity: {job.equity === "0" || job.equity === null ? "none" : job.equity}</p>
            <div style={{ display: "flex",paddingLeft: "10px", justifyContent: "center", gap: "10px", borderRadius: "8px"}}>
                <button><Link to="/jobs" >Apply</Link></button>
                <button><Link to="/jobs" >Back to job listings</Link></button>
            </div>
        </div>
    );
}

export default JobPage;