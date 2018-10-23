import axios from "axios";

export default {
  // get states by country ID
  getStates: function (id) {
    return axios.get('api/loc/state/' + id);
  },
  // Gets all jobs
  getJobListings: function () {
    return axios.get("/api/jobs");
  },
  // Gets the job with the given id
  getJob: function (id) {
    return axios.get("/api/jobs/" + id);
  },
  scrape: function (term, city, region) {
    return axios.get(`/api/jobs/scrape/${term}/${city}/${region}`)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error.response)
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

  // Saves a job for the current user
  userSaveJob: function (jobData, googleId) {
    return axios.post("api/user/jobs", { jobData, googleId })
  },
  getUserJob: function(jobId, googleId) {
    return axios.get(`api/user/jobs/saved/${googleId}/${jobId}`)
  },
  updateUserJob: function(jobId, googleId) {
    return axios.put(`api/user/jobs/saved/${googleId}/${jobId}`)
  },

  // Unsaves a job for the current user
  userUnsaveJob: function (jobId, googleId) {
    return axios.delete(`api/user/jobs/saved/${googleId}/${jobId}`)
  },

  getUserJobs: googleId => {
    return axios.get(`api/user/jobs/saved/${googleId}`)
  },

  createUser: user => {
    return axios.post("/api/user", user)
  }
};
