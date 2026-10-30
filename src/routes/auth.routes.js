const express = require("express");

const {
    cadastrarUsuario,
    fazerLogin,
    fazerLogout
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/cadastro", cadastrarUsuario);
router.post("/login", fazerLogin);
router.post("/logout", fazerLogout);

module.exports = router;

