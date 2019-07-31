const express = require("express");
const rentsController = require("../controllers/rent");
const router = express.Router();

router.get("", rentsController.getRents);
router.get("/active", rentsController.getActiveRents);
router.post("/history", rentsController.history);
router.post("", rentsController.setRent);
router.patch("/returnBook", rentsController.returnBook);
router.get("/:id", rentsController.getRent);
router.delete("/:id", rentsController.deleteRent);
router.put("/:id", rentsController.updateRent);

module.exports = router;