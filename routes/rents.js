const express = require("express");
const rentsController = require("../controllers/rent");
const router = express.Router();

router.get("", rentsController.getRents);
router.get("/:id", rentsController.getRent);
router.post("", rentsController.setRent);
router.delete("/:id", rentsController.deleteRent);
router.put("/:id", rentsController.updateRent);

module.exports = router;
