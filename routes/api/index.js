const router = require("express").Router();
const jobRoutes = require("./jobs");

// Book routes
router.use("/jobs", jobRoutes);

module.exports = router;
