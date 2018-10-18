const router = require("express").Router();
const locRoutes = require('./loc');
const jobRoutes = require("./jobs");
const userRoutes = require("./user")

// Jobs routes
router.use('/loc', locRoutes);
router.use("/jobs", jobRoutes);
router.use("/user", userRoutes)

// location selector routes

module.exports = router;
