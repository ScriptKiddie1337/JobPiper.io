const router = require("express").Router();
const jobRoutes = require("./jobs");
const userRoutes = require("./user")

// Jobs routes
router.use("/jobs", jobRoutes);
router.use("/user", userRoutes)

module.exports = router;
