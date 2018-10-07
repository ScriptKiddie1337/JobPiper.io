import axios from "axios";

export default {
  // Gets all jobs
<<<<<<< HEAD
  getJobListings: function() {
    return axios.get("/api/jobs");
  },
  // Gets the job with the given id
  getJob: function(id) {
    return axios.get("/api/jobs/" + id);
  },
  // Deletes the job with the given id
  deleteJob: function(id) {
    return axios.delete("/api/jobs/" + id);
  },
  // Saves a job to the database
  saveJob: function(jobData) {
=======
  getJobListing: function() {
    return axios.get("/api/jobs");
  },
  // Gets the job with the given id
  getBook: function(id) {
    return axios.get("/api/jobs/" + id);
  },
  // Deletes the job with the given id
  deleteBook: function(id) {
    return axios.delete("/api/jobs/" + id);
  },
  // Saves a job to the database
  saveBook: function(jobData) {
>>>>>>> 3d6b98847fb56d3aeb0e7896eaefe45ab0605340
    return axios.post("/api/jobs", jobData);
  }
};
