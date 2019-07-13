const express = require("express");
const rentsControler = require("../controllers/rent");
const router = express.Router();

router.get("", rentsControler.getRents);
router.get("/:id", rentsControler.getRent);
router.post("", rentsControler.setRent);
router.delete("/:id", rentsControler.deleteRent);
router.put("/:id", rentsControler.updateRent);
