import axios from "axios";

export default {
  // Gets all jobs
  getJobListings: function () {
    return axios.get("/api/jobs");
  },
  // Gets the job with the given id
  getJob: function (id) {
    return axios.get("/api/jobs/" + id);
  },
  getJobTerm: function (term) {
    return axios.get("/api/jobs/search", {
      params: {
        term: term
      }
    });
  },
  // Deletes the job with the given id
  deleteJob: function (id) {
    return axios.delete("/api/jobs/" + id);
  },
  // Saves a job to the database
  saveJob: function (jobData) {
    return axios.post("/api/jobs", jobData);
  },

  createUser: user => {
    return axios.post("/api/user", user)
  }
};
