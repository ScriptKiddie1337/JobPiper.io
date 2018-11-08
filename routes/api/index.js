const router = require("express").Router();
const locRoutes = require('./loc');
const jobRoutes = require("./jobs");
const userRoutes = require("./user")
const eventRoutes = require("./event")

// Jobs routes
router.use('/loc', locRoutes);
router.use("/jobs", jobRoutes);
router.use("/user", userRoutes)
router.use("/event", eventRoutes)

// location selector routes

module.exports = router;
