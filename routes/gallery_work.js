const express = require('express');

const router = express.Router();

const {getTodos, getByID} = require("../controller/gallery_work")
const {validarJWT, validarRol} = require("../middlewares/validations")

router.get("/", getTodos)
router.get("/:id", getByID)

module.exports = router;
