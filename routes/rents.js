const express = require("express");
const rentsController = require("../controllers/rent");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.get("", checkAuth, rentsController.getRents);
router.get("/active", checkAuth, rentsController.getActiveRents);
router.post("/history", checkAuth, rentsController.history);
router.post("", checkAuth, rentsController.setRent);
router.patch("/returnBook", checkAuth, rentsController.returnBook);
router.get("/:id", checkAuth, rentsController.getRent);
router.delete("/:id", checkAuth, rentsController.deleteRent);
router.put("/:id", checkAuth, rentsController.updateRent);

module.exports = router;
