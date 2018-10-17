const router = require("express").Router();
const locRoutes = require('./loc');
const jobRoutes = require("./jobs");

// Jobs routes
router.use('/loc', locRoutes);
router.use("/jobs", jobRoutes);

// location selector routes

module.exports = router;
