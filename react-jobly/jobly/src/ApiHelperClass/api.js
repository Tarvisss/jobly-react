import axios from "axios";

// Use Vite's env variables
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3001";

// const apiKey = import.meta.env.VITE_API_KEY;

/**
 * API Class to interact with the Supabase API.
 */
export default class JoblyApi {
  static token;

  // Method to set the token (useful if token changes during the session)
  static setToken(newToken) {
    this.token = newToken;
  }

  // General API request handler
  // General API request handler
static async request(endpoint, data = {}, method = "get") {
  console.debug("API Call:", endpoint, data, method);

  const url = `${BASE_URL}/${endpoint}`; // <-- FIXED

  const headers = {
    'Authorization': `Bearer ${JoblyApi.token}`,
    'Content-Type': 'application/json',
  };

  const params = (method === "get") ? data : {};

  try {
    const response = await axios({
      url,
      method,
      data,
      params,
      headers,
    });
    return response.data;
  } catch (err) {
    console.error("API Error:", err.response);
    const message = err.response?.data?.error?.message || "Unknown error";
    throw Array.isArray(message) ? message : [message];
  }
}

  // Individual API routes
 
  
  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async fetchCompanies(name, minEmployees, maxEmployees) {
    const params = {};
  if (name) params.name = name;
  if (minEmployees !== undefined) params.minEmployees = minEmployees;
  if (maxEmployees !== undefined) params.maxEmployees = maxEmployees;

  try {
    let res = await this.request('companies', params); // Pass params as query string to backend
    return res.companies;
  } catch (error) {
    console.error('Error fetching companies:', error);
    return [];
  }
  
  }

static async applyForJob(jobId) {
  try {
    const currentUser = localStorage.getItem("currUser")
    const userObject = JSON.parse(currentUser);
    const { username } = userObject;
    let response = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    
    return response;
  } catch (error) {
    console.debug(error);
  }
  
}

static async getAppliedJobs(username){
  try {
    const response = await this.request(`users/${username}`, {}, "get")
    return response.user.applications
  } catch (error) {
    
  }
}
static async getUser(username) {
  try {
      // Use the request helper method to make a GET request with the Authorization header
      const response = await this.request(`users/${username}`, {}, "get");
      console.log(response)
      return response; 
  } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
  }
}



static async LoginUser(username, password) {
  try {
    // Make the API request to fetch the token
    let data = await this.request("auth/token", { username, password }, "post");
    
    // Debugging: Log the entire response data
    console.log("Login API Response:", data);

    // Ensure the token exists in the response
    if (data && data.token) {
      return data.token;  // Return the token if available
    } else {
      console.error("Token not found in response data");
      return null;
    }
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

  
  static async UpdateUser(username, password, email, firstName, lastName){
    try {
      const userData = {
        password,
        email,
        firstName,
        lastName
      }
      let user = await this.request(`users/${username}`, userData, "patch")
      return user.user;
    } catch (error) {
      console.error("failed to update user", error)
    }
    

  }
  static async SignUpUser(username, password, email, firstName, lastName) {
    try {
      // Ensure you're using the correct endpoint for registration
      let data = await this.request(
        "auth/register", // Correct endpoint for registration
        { username, password, email, firstName, lastName }, // Request body with all required fields
        "post"
      );
      
      // If the response contains a token, return it
      if (data && data.token) {
        return data.token;
      } else {
        console.error("No token found in response data:", data);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }
  
  static async fetchJobs(){
      try{
      let data = await this.request("jobs")
      return data.jobs
    }   catch (error) {
      console.log(error)
    }  
  }
  
  //finds a job based on id
  static async fetchJob(jobId) {
    try {
        let data = await this.request(`jobs/${jobId}`);
        return data.job;
    } catch (error) {
        console.log("Error fetching job:", error);
    }
}


  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
