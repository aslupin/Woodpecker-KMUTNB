const express = require("express");

const PMsController = require("../controller/PMs");

const router = express.Router();

router.get("", PMsController.getPMs );
router.get("/AC",PMsController.getACs);
router.post("", PMsController.createPost );

module.exports = router;
