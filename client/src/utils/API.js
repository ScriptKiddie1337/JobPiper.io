import axios from "axios";

export default {
  // Gets all jobs
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
    return axios.post("/api/jobs", jobData);
  }
};
