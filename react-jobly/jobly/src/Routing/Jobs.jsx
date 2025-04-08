import React, {useEffect, useState} from "react";
import JoblyApi from "../ApiHelperClass/api";
import { Link } from "react-router-dom";

const Jobs = () => {
    const [jobs, setJobs] = useState([])
// use effect here so that the jobs listings load only once when a user hits the route.
useEffect(() => {
    const getJobs = async () => {
        const jobs = await JoblyApi.fetchJobs();
        setJobs(jobs);
    }
    getJobs();
},[])

    return (
        <div>
            <h1>Job Listings</h1>
            <div style={{
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
                gap: "20px"
            }}>
                {jobs.length > 0 ? (jobs.map((jobs) => (
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
                    key={jobs.id}>
                    {/* //here i've added a link to a single job page based off of the id. */}
                        <Link to={`/jobs/${jobs.id}`} style={{textDecoration: "none"}}>{jobs.title}</Link>
                        <hr />
                        <p>Company: {jobs.companyName}</p>
                        <p>Salary: {jobs.salary=== "0" || jobs.salary === null ? "Not Listed" : jobs.salary}</p>
                        <p>Equity: {jobs.equity === "0" || jobs.equity === null ? "none" : jobs.equity}</p>
                    </div>
                ))
            ) : (
                <p></p>
            )}
            </div>
        </div>
    )
}

export default Jobs;