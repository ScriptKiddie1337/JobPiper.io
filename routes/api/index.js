const router = require("express").Router();
const jobRoutes = require("./jobs");

// Jobs routes
router.use("/jobs", jobRoutes);

module.exports = router;
