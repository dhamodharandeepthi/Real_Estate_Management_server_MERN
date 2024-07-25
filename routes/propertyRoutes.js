const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddle");
const {
  createProperty,
  getProperties,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

router.post("/", auth, createProperty);
router.get("/", getProperties);
router.put("/:id", auth, updateProperty);
router.delete("/:id", auth, deleteProperty);

module.exports = router;
